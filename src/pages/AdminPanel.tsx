
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Upload } from "lucide-react";

const AdminPanel = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    city: "",
    courseStartYear: "",
    course: ""
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const validateForm = () => {
    const { fullName, age, gender, city, courseStartYear, course } = formData;

    if (!fullName || !age || !gender || !city || !courseStartYear || !course) {
      toast({
        title: "Erro",
        description: "Todos os campos são obrigatórios.",
        variant: "destructive"
      });
      return false;
    }

    if (isNaN(Number(age)) || Number(age) < 1) {
      toast({
        title: "Erro",
        description: "Idade deve ser um número válido.",
        variant: "destructive"
      });
      return false;
    }

    if (isNaN(Number(courseStartYear)) || Number(courseStartYear) < 1900) {
      toast({
        title: "Erro",
        description: "Ano de início deve ser um ano válido.",
        variant: "destructive"
      });
      return false;
    }

    return true;
  };

  const uploadPhoto = async (): Promise<string | null> => {
    if (!photoFile) return null;

    const fileExt = photoFile.name.split('.').pop();
    const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
    const filePath = `${fileName}`;

    const { error } = await supabase.storage
      .from('student-photos')
      .upload(filePath, photoFile);

    if (error) {
      console.error('Error uploading photo:', error);
      return null;
    }

    const { data } = supabase.storage
      .from('student-photos')
      .getPublicUrl(filePath);

    return data.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      // Generate verification code using database function
      const { data: codeData, error: codeError } = await supabase
        .rpc('generate_verification_code');

      if (codeError) {
        throw codeError;
      }

      const verificationCode = codeData;
      console.log('Generated verification code:', verificationCode);

      // Upload photo if provided
      const photoUrl = await uploadPhoto();

      // Insert student card data with generated code
      const { error } = await supabase
        .from('student_cards')
        .insert({
          verification_code: verificationCode,
          full_name: formData.fullName,
          age: parseInt(formData.age),
          gender: formData.gender,
          city: formData.city,
          course_start_year: parseInt(formData.courseStartYear),
          course: formData.course,
          photo_url: photoUrl
        });

      if (error) {
        throw error;
      }

      toast({
        title: "Sucesso!",
        description: `Carteirinha cadastrada com sucesso! Código: ${verificationCode}`,
      });

      // Reset form
      setFormData({
        fullName: "",
        age: "",
        gender: "",
        city: "",
        courseStartYear: "",
        course: ""
      });
      setPhotoFile(null);
      setPhotoPreview(null);

    } catch (error) {
      console.error('Error saving student card:', error);
      toast({
        title: "Erro",
        description: "Erro ao cadastrar carteirinha. Verifique os dados.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col items-center justify-center p-4">
      {/* Logo FGV */}
      <div className="mb-8">
        <div className="inline-block bg-blue-900 text-white px-6 py-2 rounded font-bold text-lg">
          FGV
        </div>
      </div>

      {/* Container principal */}
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-2xl">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-8">
          Cadastro de Carteirinha Estudantil
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Aviso sobre código automático */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <p className="text-sm text-blue-700">
              <strong>Nota:</strong> O código de verificação será gerado automaticamente no formato L#LLL# (ex: L3JVJ2)
            </p>
          </div>

          {/* Nome Completo */}
          <div>
            <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
              Nome Completo *
            </Label>
            <Input
              id="fullName"
              type="text"
              placeholder="Nome do aluno"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              className="mt-1"
              required
            />
          </div>

          {/* Idade */}
          <div>
            <Label htmlFor="age" className="text-sm font-medium text-gray-700">
              Idade *
            </Label>
            <Input
              id="age"
              type="number"
              placeholder="Ex: 20"
              value={formData.age}
              onChange={(e) => handleInputChange('age', e.target.value)}
              className="mt-1"
              min="1"
              required
            />
          </div>

          {/* Sexo */}
          <div>
            <Label htmlFor="gender" className="text-sm font-medium text-gray-700">
              Sexo *
            </Label>
            <Select onValueChange={(value) => handleInputChange('gender', value)} required>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Selecione o sexo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Masculino">Masculino</SelectItem>
                <SelectItem value="Feminino">Feminino</SelectItem>
                <SelectItem value="Outro">Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Cidade onde estuda */}
          <div>
            <Label htmlFor="city" className="text-sm font-medium text-gray-700">
              Cidade onde estuda *
            </Label>
            <Input
              id="city"
              type="text"
              placeholder="Ex: São Paulo - SP"
              value={formData.city}
              onChange={(e) => handleInputChange('city', e.target.value)}
              className="mt-1"
              required
            />
          </div>

          {/* Ano de Início do Curso */}
          <div>
            <Label htmlFor="courseStartYear" className="text-sm font-medium text-gray-700">
              Ano de Início do Curso *
            </Label>
            <Input
              id="courseStartYear"
              type="number"
              placeholder="Ex: 2023"
              value={formData.courseStartYear}
              onChange={(e) => handleInputChange('courseStartYear', e.target.value)}
              className="mt-1"
              min="1900"
              max="2030"
              required
            />
          </div>

          {/* Curso */}
          <div>
            <Label htmlFor="course" className="text-sm font-medium text-gray-700">
              Curso *
            </Label>
            <Input
              id="course"
              type="text"
              placeholder="Ex: Administração de Empresas"
              value={formData.course}
              onChange={(e) => handleInputChange('course', e.target.value)}
              className="mt-1"
              required
            />
          </div>

          {/* Upload de Foto */}
          <div>
            <Label htmlFor="photo" className="text-sm font-medium text-gray-700">
              Foto do Aluno
            </Label>
            <div className="mt-1">
              <input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              <label
                htmlFor="photo"
                className="flex items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition-colors"
              >
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Preview"
                    className="h-full w-auto object-cover rounded"
                  />
                ) : (
                  <div className="flex flex-col items-center">
                    <Upload className="w-8 h-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-500">Clique para fazer upload da foto</span>
                  </div>
                )}
              </label>
            </div>
          </div>

          {/* Botão Salvar */}
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-md font-medium"
          >
            {isLoading ? "Salvando..." : "Salvar Carteirinha"}
          </Button>
        </form>
      </div>

      {/* Rodapé */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          © Copyright FGV 2023
        </p>
      </div>
    </div>
  );
};

export default AdminPanel;
