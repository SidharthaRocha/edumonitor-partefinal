import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaStar } from "react-icons/fa"; // Ícones para melhorar o design

export default function AlunoNotas({ alunos }) {
  const { id } = useParams();
  const aluno = alunos.find((aluno) => aluno.id === parseInt(id));
  const navigate = useNavigate();

  if (!aluno) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-500 to-indigo-600 text-white">
        <p className="text-xl font-semibold">Aluno não encontrado!</p>
      </div>
    );
  }

  // Notas simuladas
  const notasSimuladas = [8, 9, 7, 10, 6]; // Exemplo de notas fixas

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-700 via-indigo-700 to-blue-700 flex flex-col items-center p-8">
      {/* Botão Voltar */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center bg-white text-purple-700 px-6 py-3 rounded-full shadow-lg hover:bg-purple-600 hover:text-white transition-all duration-300 mb-12"
      >
        <FaArrowLeft className="mr-2 text-lg" />
        Voltar
      </button>

      {/* Título */}
      <div className="mb-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">
          Desempenho de {aluno.nome}
        </h1>
      </div>

      {/* Grid de notas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full">
        {notasSimuladas.map((nota, index) => (
          <div
            key={index}
            className="bg-white p-8 rounded-2xl shadow-xl transform hover:scale-105 transition-transform duration-300"
          >
            <div className="flex flex-col items-center text-center">
              <FaStar className="text-yellow-400 text-4xl mb-4" />
              <h2 className="text-2xl font-bold text-purple-700">
                Avaliação {index + 1}
              </h2>
              <p className="text-gray-500 mt-2">Nota Recebida:</p>
              <div
                className={`text-6xl font-extrabold mt-4 ${
                  nota >= 8
                    ? "text-green-500"
                    : nota >= 6
                    ? "text-yellow-500"
                    : "text-red-500"
                }`}
              >
                {nota}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Rodapé */}
      <footer className="mt-20 text-center text-white">
        <p className="text-sm md:text-base">
          © 2025 Edumonitor. Todos os direitos reservados.
        </p>
      </footer>
    </div>
  );
}
