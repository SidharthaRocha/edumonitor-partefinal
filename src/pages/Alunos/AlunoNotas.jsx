import React from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function AlunoNotas({ alunos }) {
  const { id } = useParams();
  const aluno = alunos.find((aluno) => aluno.id === parseInt(id));
  const navigate = useNavigate();

  if (!aluno) {
    return <p>Aluno não encontrado!</p>;
  }

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <button onClick={() => navigate(-1)} className="bg-blue-500 text-white px-4 py-2 rounded">
        Voltar
      </button>
      <h1 className="text-2xl font-bold my-6">Notas de {aluno.nome}</h1>
      <ul className="list-disc ml-8">
        {aluno.notas.map((nota, index) => (
          <li key={index}>Avaliação {index + 1}: {nota}</li>
        ))}
      </ul>
    </div>
  );
}
