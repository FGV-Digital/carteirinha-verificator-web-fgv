
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Index = () => {
  const [securityCode, setSecurityCode] = useState("");

  const handleVerify = () => {
    console.log("Verificando código:", securityCode);
    // Aqui seria implementada a lógica de verificação
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-blue-200 flex flex-col">
      {/* Cabeçalho */}
      <div className="text-center pt-8 pb-12">
        <h1 className="text-2xl font-bold text-blue-900 mb-2">
          Verificador de autenticidade
        </h1>
        <h2 className="text-xl text-blue-900 mb-2">
          Carteirinha Virtual
        </h2>
        <p className="text-sm text-blue-900 mb-6">v.2.0.0</p>
        
        {/* Logo FGV simples */}
        <div className="mb-8">
          <div className="inline-block bg-blue-900 text-white px-6 py-2 rounded font-bold text-lg">
            FGV
          </div>
        </div>
      </div>

      {/* Container principal */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden max-w-4xl w-full">
          <div className="grid md:grid-cols-2 min-h-[400px]">
            {/* Lado Esquerdo - Branco */}
            <div className="bg-white p-8 flex flex-col justify-center">
              <h3 className="text-xl font-bold text-gray-800 text-center mb-6">
                Digite código segurança
              </h3>
              
              <div className="space-y-4">
                <Input
                  type="text"
                  placeholder="Digite"
                  value={securityCode}
                  onChange={(e) => setSecurityCode(e.target.value)}
                  className="w-full rounded-md border-gray-300 text-center text-lg py-3"
                  maxLength={6}
                />
                
                <p className="text-sm text-gray-600 text-center leading-relaxed">
                  Digite o código alfanumérico de 6 dígitos existente no verso da carteirinha virtual.
                </p>
                
                <Button
                  onClick={handleVerify}
                  className="w-full bg-blue-900 hover:bg-blue-800 text-white py-3 rounded-md font-medium"
                >
                  Verificar
                </Button>
              </div>
            </div>

            {/* Lado Direito - Azul escuro */}
            <div className="bg-blue-900 p-8 flex flex-col justify-end relative">
              <div className="absolute bottom-4 right-4">
                <a 
                  href="https://carteirinha.fgv.br" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-white text-sm hover:text-blue-200 transition-colors"
                >
                  https://carteirinha.fgv.br
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Rodapé */}
      <div className="text-center py-6">
        <p className="text-sm text-gray-600">
          © Copyright FGV 2023
        </p>
      </div>
    </div>
  );
};

export default Index;
