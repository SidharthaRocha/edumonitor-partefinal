import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { FaFilePdf, FaPlus, FaEdit, FaArrowLeft, FaUser } from "react-icons/fa";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import "chart.js/auto";
import 'animate.css';  // Importa o Animate.css

const alunosData = [
  { id: 1, nome: "João Silva", notas: [8, 7, 9, 6] },
  { id: 2, nome: "Maria Oliveira", notas: [9, 8, 10, 7] },
  // Outros alunos...
];

export default function Desempenho() {
  const [selectedAluno, setSelectedAluno] = useState(null);
  const [novaNota, setNovaNota] = useState("");
  const [notaEditada, setNotaEditada] = useState(null);
  const [alunos, setAlunos] = useState(alunosData);
  const navigate = useNavigate();

  const handleSelectAluno = (aluno) => {
    setSelectedAluno(aluno);
  };

  const handleAddNota = () => {
    if (!novaNota || isNaN(novaNota)) return;
    const updatedAlunos = alunos.map((aluno) =>
      aluno.id === selectedAluno.id
        ? { ...aluno, notas: [...aluno.notas, parseFloat(novaNota)] }
        : aluno
    );
    setAlunos(updatedAlunos);
    setNovaNota("");
  };

  const handleEditNota = (index) => {
    if (!notaEditada || isNaN(notaEditada)) return;
    const updatedAlunos = alunos.map((aluno) => {
      if (aluno.id === selectedAluno.id) {
        const updatedNotas = [...aluno.notas];
        updatedNotas[index] = parseFloat(notaEditada);
        return { ...aluno, notas: updatedNotas };
      }
      return aluno;
    });
    setAlunos(updatedAlunos);
    setNotaEditada("");
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`Relatório de Desempenho - ${selectedAluno.nome}`, 10, 10);
    doc.setFontSize(12);
    selectedAluno.notas.forEach((nota, index) => {
      doc.text(`Avaliação ${index + 1}: ${nota}`, 10, 20 + index * 10);
    });
    doc.save(`${selectedAluno.nome}-relatorio.pdf`);
  };

  const chartData = selectedAluno
    ? {
        labels: selectedAluno.notas.map((_, index) => `Avaliação ${index + 1}`),
        datasets: [
          {
            label: "Notas",
            data: selectedAluno.notas,
            backgroundColor: "rgba(75, 192, 192, 0.6)",
          },
        ],
      }
    : null;

  return (
    <div className="p-8 bg-gradient-to-r from-teal-50 to-teal-100 min-h-screen">
      <div className="flex items-center mb-6">
        <button
          onClick={() => navigate("/Dashboard-professor")}
          className="flex items-center bg-gradient-to-r from-indigo-500 to-indigo-600 text-white px-6 py-3 rounded-full shadow-xl hover:bg-indigo-700 transition-all duration-300 ease-in-out"
        >
          <FaArrowLeft className="mr-3" size={20} /> Voltar
        </button>
      </div>

      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center animate__animated animate__fadeIn">
        Desempenho dos Alunos
      </h1>

      <div className="mb-8 animate__animated animate__fadeIn">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Selecione um Aluno</h2>
        <div className="flex flex-wrap gap-6 justify-center">
          {alunos.map((aluno) => (
            <button
              key={aluno.id}
              onClick={() => handleSelectAluno(aluno)}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg text-white transition-all duration-300 ease-in-out transform ${
                selectedAluno?.id === aluno.id
                  ? "bg-indigo-600 hover:scale-105"
                  : "bg-indigo-400 hover:bg-indigo-500"
              }`}
            >
              <FaUser className="inline" size={18} />
              {aluno.nome}
            </button>
          ))}
        </div>
      </div>

      {selectedAluno && (
        <>
          <div className="mb-8 animate__animated animate__fadeIn">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Gráfico de Desempenho</h2>
            <div className="bg-white p-6 shadow-lg rounded-xl">
              <Bar data={chartData} />
            </div>
          </div>

          <div className="mb-8 animate__animated animate__fadeIn">
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">Adicionar Nova Nota</h2>
            <div className="flex items-center gap-6">
              <input
                type="number"
                value={novaNota}
                onChange={(e) => setNovaNota(e.target.value)}
                placeholder="Insira a nota"
                className="border-2 border-gray-300 rounded-lg p-3 w-40 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all"
              />
              <button
                onClick={handleAddNota}
                className="bg-green-500 text-white px-6 py-3 rounded-full hover:bg-green-600 transition-all duration-300 ease-in-out transform hover:scale-105"
              >
                <FaPlus className="inline mr-2" />
                Adicionar Nota
              </button>
            </div>
          </div>

          <div className="mb-8 animate__animated animate__fadeIn">
            <h2 className="text-2xl font-semibold text-gray-700 mb-6">Editar Notas</h2>
            <div className="overflow-x-auto bg-white p-6 shadow-lg rounded-xl">
              <table className="min-w-full table-auto border-collapse">
                <thead className="bg-indigo-600 text-white">
                  <tr>
                    <th className="px-6 py-4 text-left">Avaliação</th>
                    <th className="px-6 py-4 text-left">Nota</th>
                    <th className="px-6 py-4 text-center">Editar</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedAluno.notas.map((nota, index) => (
                    <tr key={index} className="border-b hover:bg-gray-50">
                      <td className="px-6 py-4">Avaliação {index + 1}</td>
                      <td className="px-6 py-4">{nota}</td>
                      <td className="px-6 py-4 text-center">
                        <input
                          type="number"
                          placeholder="Nova Nota"
                          onChange={(e) => setNotaEditada(e.target.value)}
                          className="border-2 border-gray-300 rounded-lg p-2 w-28 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                        />
                        <button
                          onClick={() => handleEditNota(index)}
                          className="text-indigo-500 hover:text-indigo-700 ml-3"
                        >
                          <FaEdit size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-8 animate__animated animate__fadeIn">
            <button
              onClick={generatePDF}
              className="bg-red-500 text-white px-6 py-3 rounded-full hover:bg-red-600 transition-all duration-300 ease-in-out transform hover:scale-105"
            >
              <FaFilePdf className="inline mr-2" />
              Download Relatório
            </button>
          </div>
        </>
      )}
    </div>
  );
}
