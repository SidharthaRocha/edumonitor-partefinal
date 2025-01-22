import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Bar } from "react-chartjs-2";

export default function GraficoDesempenho({ alunos }) {
  const { id } = useParams();
  const navigate = useNavigate();

  // Verifica se 'alunos' está definido antes de tentar acessar
  if (!alunos) {
    return <p>Carregando alunos...</p>; // Exibe uma mensagem enquanto os dados não estão disponíveis
  }

  // Busca o aluno com o id correspondente
  const aluno = alunos.find((aluno) => aluno.id === parseInt(id));

  if (!aluno) {
    return <p>Aluno não encontrado!</p>;
  }

  // Dados do gráfico de desempenho
  const chartData = {
    labels: aluno.notas.map((_, index) => `Avaliação ${index + 1}`),
    datasets: [
      {
        label: "Notas",
        data: aluno.notas,
        backgroundColor: "rgba(75, 192, 192, 0.6)",
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
        <Bar data={chartData} />
      </div>
    </div>
  );
}
