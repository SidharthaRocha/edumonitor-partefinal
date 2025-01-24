import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";

export default function AlunoNotas({ alunos }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aluno, setAluno] = useState(null);

  // Simular notas de avaliação, já que o gráfico é apenas para enfeite
  const mockNotas = [8, 7, 9, 6, 10];  // Dados de notas simuladas
  const mockAluno = { nome: "João Silva", notas: mockNotas };  // Dados mock do aluno

  // Verifica se 'alunos' está definido antes de tentar acessar
  useEffect(() => {
    if (Array.isArray(alunos) && alunos.length > 0) {
      const foundAluno = alunos.find((aluno) => aluno.id === parseInt(id));
      setAluno(foundAluno || mockAluno);  // Se não encontrar o aluno, usa os dados simulados
    } else {
      setAluno(mockAluno);  // Caso os dados de alunos ainda não tenham sido carregados
    }
  }, [alunos, id]);

  // Exibe mensagem enquanto os dados não estiverem carregados
  if (!aluno) {
    return <p>Aluno não encontrado ou dados ainda não carregados...</p>;
  }

  // Dados do gráfico de desempenho
  const chartData = {
    labels: aluno.notas.map((_, index) => `Avaliação ${index + 1}`),
    datasets: [
      {
        label: "Notas Recebidas",
        data: aluno.notas,
        backgroundColor: "rgba(75, 192, 192, 0.6)",  // Cor do gráfico
        borderColor: "rgba(75, 192, 192, 1)",  // Cor da borda
        borderWidth: 1,
        hoverBackgroundColor: "rgba(75, 192, 192, 0.8)",  // Cor quando passa o mouse
        hoverBorderColor: "rgba(75, 192, 192, 1)",  // Cor da borda ao passar o mouse
      },
    ],
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <button onClick={() => navigate(-1)} className="bg-blue-500 text-white px-4 py-2 rounded">
        Voltar
      </button>
      <h1 className="text-2xl font-bold my-6">Gráfico de Desempenho de {aluno.nome}</h1>
      
      <div className="bg-white p-6 rounded-lg shadow-md">
        {/* Exibição do gráfico de desempenho */}
        <div className="flex justify-center mb-4">
          <Bar data={chartData} options={{
            responsive: true,
            plugins: {
              legend: {
                position: 'top',
              },
              tooltip: {
                enabled: true,
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text: 'Avaliações',
                },
              },
              y: {
                title: {
                  display: true,
                  text: 'Nota',
                },
                min: 0,
                max: 10,  // Definindo o range de 0 a 10 para as notas
              },
            },
          }} />
        </div>
        
        {/* Exibição das notas de cada avaliação */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-indigo-800 mb-4">Notas Recebidas</h2>
          <ul className="list-none space-y-2">
            {aluno.notas.map((nota, index) => (
              <li key={index} className="flex justify-between text-lg">
                <span>Avaliação {index + 1}</span>
                <span className="font-semibold">{nota}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
