import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa'; // Ícone para o botão Voltar
import { useNavigate } from 'react-router-dom'; // Importação do hook de navegação

const Relatorios = () => {
  const [selectedDateRange, setSelectedDateRange] = useState({
    startDate: '',
    endDate: '',
  });
  const [previousReports, setPreviousReports] = useState([
    { id: 1, name: 'Relatório - Janeiro 2024', date: '2024-01-31', url: '/reports/jan2024.pdf' },
    { id: 2, name: 'Relatório - Fevereiro 2024', date: '2024-02-28', url: '/reports/feb2024.pdf' },
  ]);

  const navigate = useNavigate(); // Inicializa o hook de navegação

  const handleGenerateReport = () => {
    if (!selectedDateRange.startDate || !selectedDateRange.endDate) {
      alert('Por favor, selecione um período válido!');
      return;
    }
    alert(
      `Relatório gerado para o período de ${selectedDateRange.startDate} a ${selectedDateRange.endDate}!`
    );
    // Lógica para gerar PDF e fazer download.
  };

  return (
    <div className="min-h-screen bg-gray-100 font-poppins p-6">
      {/* Botão de Voltar estilizado */}
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate("/Dashboard-professor")}
          className="flex items-center text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-lg shadow-md transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <FaArrowLeft className="mr-2" size={20} /> Voltar
        </button>
      </div>

      <h1 className="text-3xl font-bold text-indigo-800 mb-6">Relatórios</h1>

      {/* Seção para gerar relatório */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-xl font-semibold text-indigo-800 mb-4">Gerar Relatório</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700">Data de Início</label>
            <input
              type="date"
              value={selectedDateRange.startDate}
              onChange={(e) =>
                setSelectedDateRange((prev) => ({ ...prev, startDate: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <div>
            <label className="block text-gray-700">Data de Fim</label>
            <input
              type="date"
              value={selectedDateRange.endDate}
              onChange={(e) =>
                setSelectedDateRange((prev) => ({ ...prev, endDate: e.target.value }))
              }
              className="w-full border border-gray-300 rounded-lg p-2"
            />
          </div>
          <button
            onClick={handleGenerateReport}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            Gerar Relatório
          </button>
        </div>
      </div>

      {/* Seção para visualizar relatórios anteriores */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold text-indigo-800 mb-4">Relatórios Anteriores</h2>
        <ul className="space-y-4">
          {previousReports.map((report) => (
            <li key={report.id} className="flex justify-between items-center">
              <div>
                <h3 className="text-gray-800 font-semibold">{report.name}</h3>
                <p className="text-sm text-gray-600">Gerado em: {report.date}</p>
              </div>
              <a
                href={report.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:underline"
              >
                Baixar
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Relatorios;
