import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaStar } from "react-icons/fa"; // Usando ícones para melhorar o design

export default function AlunoNotas({ alunos }) {
  const { id } = useParams();
  const aluno = alunos.find((aluno) => aluno.id === parseInt(id));
  const navigate = useNavigate();

  if (!aluno) {
    return <p>Aluno não encontrado!</p>;
  }

  // Notas simuladas
  const notasSimuladas = [8, 9, 7, 10, 6];  // Exemplo de notas fixas

  return (
    <div className="p-8 bg-gradient-to-r from-teal-500 to-cyan-600 min-h-screen flex flex-col items-center">
      
      {/* Botão Voltar */}
      <button 
        onClick={() => navigate(-1)} 
        className="bg-blue-600 text-white px-6 py-3 rounded-full flex items-center mb-8 transform hover:scale-110 transition-transform duration-300"
      >
        <FaArrowLeft className="mr-2" />
        Voltar
      </button>
      
      {/* Título com imagem de fundo e sombra */}
      <div className="text-center mb-12">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-2xl">
          Notas de {aluno.nome}
        </h1>
      </div>

      {/* Cards de Notas com animação */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 w-full max-w-6xl">
        {notasSimuladas.map((nota, index) => (
          <div
            key={index}
            className="bg-white p-6 rounded-lg shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
          >
            <div className="flex flex-col items-center">
              {/* Ícone de Estrela para destacar */}
              <FaStar className="text-yellow-400 mb-4 text-4xl" />
              
              <h2 className="text-2xl font-semibold text-teal-700 mb-2">
                Avaliação {index + 1}
              </h2>
              <span className="text-gray-500 mb-3">Nota Recebida:</span>
              <div 
                className={`text-5xl font-bold ${
                  nota >= 8 ? "text-green-600" : nota >= 6 ? "text-yellow-600" : "text-red-600"
                }`}
              >
                {nota}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rodapé com animação suave */}
      <footer className="mt-16 text-white text-center font-medium animate__animated animate__fadeIn">
        <p>© 2025 Edumonitor. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
