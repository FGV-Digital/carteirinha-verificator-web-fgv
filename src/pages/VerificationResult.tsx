
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const VerificationResult = () => {
  const navigate = useNavigate();

  // Dados de exemplo do aluno (em uma aplicação real, viria da verificação do código)
  const studentData = {
    name: "Maria Silva Santos",
    age: 22,
    gender: "Feminino",
    courseCity: "São Paulo",
    startYear: 2021,
    course: "Administração de Empresas",
    photo: "/placeholder.svg" // Placeholder para a foto
  };

  const handleBackToVerification = () => {
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      {/* Container principal */}
      <div className="w-full max-w-2xl bg-white border border-gray-200 rounded-lg shadow-lg p-8">
        {/* Mensagem de validação */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-2 text-green-600">
            <CheckCircle className="h-6 w-6" />
            <span className="text-xl font-bold">Carteirinha válida ✅</span>
          </div>
        </div>

        {/* Container dos dados do aluno */}
        <div className="grid md:grid-cols-3 gap-6">
          {/* Foto do aluno */}
          <div className="md:col-span-1">
            <div className="w-32 h-40 mx-auto md:mx-0 bg-gray-200 rounded border overflow-hidden">
              <img
                src={studentData.photo}
                alt="Foto do aluno"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Dados do aluno */}
          <div className="md:col-span-2">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Dados do Aluno</h3>
            
            <div className="space-y-3">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-600">Nome completo</span>
                <span className="text-base text-gray-800">{studentData.name}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-600">Idade</span>
                <span className="text-base text-gray-800">{studentData.age} anos</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-600">Sexo</span>
                <span className="text-base text-gray-800">{studentData.gender}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-600">Cidade do curso</span>
                <span className="text-base text-gray-800">{studentData.courseCity}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-600">Ano de início do curso</span>
                <span className="text-base text-gray-800">{studentData.startYear}</span>
              </div>
              
              <div className="flex flex-col">
                <span className="text-sm font-medium text-gray-600">Curso</span>
                <span className="text-base text-gray-800">{studentData.course}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Botão para voltar */}
        <div className="mt-8 text-center">
          <Button
            onClick={handleBackToVerification}
            className="bg-blue-900 hover:bg-blue-800 text-white px-8 py-2"
          >
            Nova Verificação
          </Button>
        </div>
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

export default VerificationResult;
