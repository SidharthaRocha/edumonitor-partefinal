import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FaUser, FaChartLine, FaBell, FaCalendarAlt } from 'react-icons/fa';
import { motion } from 'framer-motion';

function DashboardAluno({ theme }) {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const storedUserName = localStorage.getItem('userName');
    if (storedUserName) {
      setUserName(storedUserName);
    }
  }, []);

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-blue-50 text-black'} min-h-screen`}>
      <motion.header
        className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 p-4 sm:p-6 fixed w-full top-0 left-0 z-10 shadow-xl backdrop-blur-md"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-white font-poppins text-center sm:text-left">
            Portal do Aluno
          </h1>
          <NavLink
            to="/"
            className="mt-3 sm:mt-0 bg-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-lg hover:bg-indigo-700 hover:shadow-2xl transition duration-300"
          >
            Logout
          </NavLink>
        </div>
      </motion.header>

      <motion.main className="pt-28 sm:pt-24 px-4 sm:px-8" variants={fadeInUp} initial="hidden" animate="visible">
        <header className="flex justify-between items-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-4xl font-semibold text-indigo-800 font-poppins tracking-tight">
            Olá, {userName || 'Aluno'}!
          </h2>
        </header>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-10">
          <ResponsiveCard
            title="Meu Desempenho"
            description="Acompanhe seu progresso."
            icon={<FaUser />}
            link="/meudesempenho-aluno"
            colors="bg-blue-500"
            buttonColor="bg-blue-600 hover:bg-blue-700"
          />
          <ResponsiveCard
            title="Comportamento"
            description="Acompanhe sua participação."
            icon={<FaChartLine />}
            link="/meucomportamento-aluno"
            colors="bg-green-500"
            buttonColor="bg-green-600 hover:bg-green-700"
          />
          <ResponsiveCard
            title="Notificações"
            description="Fique atualizado sobre novidades."
            icon={<FaBell />}
            link="/notificacoes-aluno"
            colors="bg-yellow-500"
            buttonColor="bg-yellow-600 hover:bg-yellow-700"
          />
          <ResponsiveCard
            title="Calendário"
            description="Organize suas atividades."
            icon={<FaCalendarAlt />}
            link="/calendario-aluno"
            colors="bg-teal-500"
            buttonColor="bg-teal-600 hover:bg-teal-700"
          />
        </motion.div>
      </motion.main>
    </div>
  );
}

function ResponsiveCard({ title, description, icon, link, colors, buttonColor }) {
  return (
    <motion.div
      className={`${colors} text-white rounded-2xl p-6 sm:p-8 shadow-lg transform hover:scale-105 transition-all duration-300`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <div className="flex flex-col items-center space-y-4 sm:space-y-6">
        <div className="text-5xl sm:text-6xl transform transition duration-300 hover:scale-110">{icon}</div>
        <h3 className="text-xl sm:text-2xl font-semibold font-poppins text-white">{title}</h3>
        <p className="text-sm sm:text-base text-white text-center mb-3 sm:mb-4 font-poppins">{description}</p>
        <NavLink
          to={link}
          className={`${buttonColor} text-white px-5 sm:px-6 py-2 sm:py-3 rounded-full shadow-lg transition duration-300`}
        >
          Acessar
        </NavLink>
      </div>
    </motion.div>
  );
}

export default DashboardAluno;
