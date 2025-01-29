import React from "react";
import { Link } from "react-router-dom";
import { FaArrowLeft, FaChartBar, FaEye } from "react-icons/fa";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Registrando os componentes do Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const App = () => {
  // Dados simulados para o gráfico
  const data = {
    labels: ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul"], // Meses simulados
    datasets: [
      {
        label: "Evolução das Notas",
        data: [7, 8, 6.5, 9, 8.5, 7.5, 9.5], // Notas simuladas
        borderColor: "#6a0dad",
        backgroundColor: "rgba(106, 13, 173, 0.2)",
        tension: 0.4,
        pointRadius: 5,
        pointBackgroundColor: "#6a0dad",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            return `Nota: ${context.raw}`;
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-indigo-200 to-blue-100 py-12 px-4 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Botão de Voltar */}
        <div className="mb-6">
          <Link
            to="/Dashboard-aluno"
            className="inline-flex items-center text-[#6a0dad] font-semibold text-lg bg-white px-4 py-2 rounded-full shadow-md hover:bg-[#6a0dad] hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <FaArrowLeft className="mr-2" />
            Voltar
          </Link>
        </div>

        {/* Título da Página */}
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#6a0dad] text-center mb-12 animate__animated animate__fadeIn">
          Meu Desempenho Acadêmico
        </h1>

        {/* Centralizando os Cards de Funcionalidades */}
        <div className="flex justify-center items-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-8">
            {/* Card Visualizar Notas */}
            <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-all transform hover:scale-105 ease-in-out duration-300">
              <div className="flex flex-col items-center">
                <FaEye className="text-[#6a0dad] text-5xl sm:text-6xl mb-4" />
                <h2 className="text-xl sm:text-2xl font-semibold text-[#6a0dad] mb-4 text-center">Visualizar Notas</h2>
                <p className="text-gray-700 text-center text-sm sm:text-base mb-4">
                  Veja todas as notas recebidas em provas e trabalhos com facilidade.
                </p>
                <Link
                  to="/notas-aluno" // Rota para visualizar as notas
                  className="bg-[#6a0dad] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-lg font-semibold transition-transform transform hover:scale-105 hover:bg-[#5a0ca3] duration-300"
                >
                  Acessar Notas
                </Link>
              </div>
            </div>

            {/* Card Gráficos de Desempenho */}
            <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8 hover:shadow-2xl transition-all transform hover:scale-105 ease-in-out duration-300">
              <div className="flex flex-col items-center">
                <FaChartBar className="text-[#6a0dad] text-5xl sm:text-6xl mb-4" />
                <h2 className="text-xl sm:text-2xl font-semibold text-[#6a0dad] mb-4 text-center">Gráficos de Desempenho</h2>
                <p className="text-gray-700 text-center text-sm sm:text-base mb-4">
                  Acompanhe a evolução das suas notas ao longo do tempo.
                </p>
                <Link
                  to="/graficos-desempenho-aluno" // Rota para visualizar gráficos de desempenho
                  className="bg-[#6a0dad] text-white px-4 sm:px-6 py-2 sm:py-3 rounded-full text-sm sm:text-lg font-semibold transition-transform transform hover:scale-105 hover:bg-[#5a0ca3] duration-300"
                >
                  Ver Gráficos
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Gráfico de Desempenho */}
        <div className="mt-12 bg-white rounded-2xl p-8 sm:p-10 shadow-xl hover:shadow-2xl transition-all ease-in-out duration-300">
          <h3 className="text-2xl sm:text-3xl font-semibold text-[#6a0dad] mb-6 text-center">
            Evolução das Notas
          </h3>
          <div className="">
            <Line data={data} options={options} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
