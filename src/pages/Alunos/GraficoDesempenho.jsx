import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";

export default function AlunoNotas({ alunos }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aluno, setAluno] = useState(null);

  // Simular notas de avaliação, já que o gráfico é apenas para enfeite
  const mockNotas = [8, 7, 9, 6, 10];
  const mockAluno = { nome: "João Silva", notas: mockNotas };

  useEffect(() => {
    if (Array.isArray(alunos) && alunos.length > 0) {
      const foundAluno = alunos.find((aluno) => aluno.id === parseInt(id));
      setAluno(foundAluno || mockAluno);
    } else {
      setAluno(mockAluno);
    }
  }, [alunos, id]);

  if (!aluno) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-lg font-medium">Carregando informações do aluno...</p>
      </div>
    );
  }

  const chartData = {
    labels: aluno.notas.map((_, index) => `Avaliação ${index + 1}`),
    datasets: [
      {
        label: "Notas Recebidas",
        data: aluno.notas,
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        borderWidth: 1,
        hoverBackgroundColor: "rgba(54, 162, 235, 0.8)",
        hoverBorderColor: "rgba(54, 162, 235, 1)",
      },
    ],
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-blue-100 to-blue-50">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-2xl w-full">
        <button
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:text-blue-800 font-semibold mb-6"
        >
          &larr; Voltar
        </button>
        <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">
          Desempenho de {aluno.nome}
        </h1>

        <div className="mb-8">
          <Bar
            data={chartData}
            options={{
              responsive: true,
              plugins: {
                legend: { display: false },
                tooltip: { enabled: true },
              },
              scales: {
                x: {
                  title: {
                    display: true,
                    text: "Avaliações",
                    font: { size: 16 },
                  },
                },
                y: {
                  title: {
                    display: true,
                    text: "Nota",
                    font: { size: 16 },
                  },
                  min: 0,
                  max: 10,
                },
              },
            }}
          />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-inner">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Notas Detalhadas</h2>
          <ul className="space-y-3">
            {aluno.notas.map((nota, index) => (
              <li
                key={index}
                className="flex justify-between items-center p-3 bg-white rounded-lg shadow-sm"
              >
                <span className="text-gray-600">Avaliação {index + 1}</span>
                <span className="text-lg font-bold text-blue-600">{nota}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
