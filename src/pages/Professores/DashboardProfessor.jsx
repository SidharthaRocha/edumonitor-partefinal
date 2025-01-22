import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaChartLine, FaBell, FaCalendarAlt, FaCogs, FaCommentDots, FaFolderOpen } from 'react-icons/fa';
import { motion } from 'framer-motion';

function DashboardProfessor({ theme }) {
  const navigate = useNavigate();
  const userName = localStorage.getItem('userName') || 'Professor(a)';

  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };

  const handleLogout = () => {
    localStorage.removeItem('userName');
    localStorage.removeItem('userType');
    navigate('/login');
  };

  return (
    <div className={`${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-black'} min-h-screen`}>
      <motion.header
        className="bg-gradient-to-r from-indigo-600 via-indigo-500 to-indigo-400 p-4 sm:p-6 fixed w-full top-0 left-0 z-10 shadow-xl backdrop-blur-md"
        variants={fadeInUp}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-screen-xl mx-auto flex flex-col sm:flex-row justify-between items-center">
          <h1 className="text-2xl sm:text-4xl font-bold text-white font-poppins text-center sm:text-left">
            Painel do Professor(a)
          </h1>
          <button
            onClick={handleLogout}
            className="mt-3 sm:mt-0 bg-indigo-600 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-xl shadow-lg hover:bg-indigo-700 hover:shadow-2xl transition duration-300"
          >
            Logout
          </button>
        </div>
      </motion.header>

      <motion.main className="pt-28 sm:pt-24 px-4 sm:px-6 bg-gray-100" variants={fadeInUp} initial="hidden" animate="visible">
        <header className="flex justify-between items-center mb-6 sm:mb-8">
          <h2 className="text-2xl sm:text-4xl font-semibold text-indigo-800 font-poppins tracking-tight">
            Olá, {userName}!
          </h2>
        </header>

        <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          <Card link="/Meusalunos-professor" icon={<FaUser />} title="Meus Alunos" description="Gerencie os dados de seus alunos." color="bg-green-500" />
          <Card link="/desempenho-professor" icon={<FaChartLine />} title="Desempenho" description="Acompanhe o desempenho da turma." color="bg-blue-500" />
          <Card link="/notificacoes-professor" icon={<FaBell />} title="Notificações" description="Veja as notificações recentes." color="bg-yellow-500" />
          <Card link="/calendario-professor" icon={<FaCalendarAlt />} title="Calendário" description="Organize seus compromissos." color="bg-red-500" />
          <Card link="/configuracoes-professor" icon={<FaCogs />} title="Configurações" description="Personalize as configurações do sistema." color="bg-purple-500" />
          <Card link="/recursos-professor" icon={<FaFolderOpen />} title="Recursos" description="Envie ou acesse materiais de estudo." color="bg-indigo-500" />
          <Card link="/feedback-suggestion" icon={<FaCommentDots />} title="Feedback/Sugestão" description="Envie suas ideias e sugestões." color="bg-teal-500" />
        </motion.div>
      </motion.main>
    </div>
  );
}

function Card({ link, icon, title, description, color }) {
  const buttonColors = {
    "bg-green-500": "bg-green-600 hover:bg-green-700",
    "bg-blue-500": "bg-blue-600 hover:bg-blue-700",
    "bg-yellow-500": "bg-yellow-600 hover:bg-yellow-700",
    "bg-red-500": "bg-red-600 hover:bg-red-700",
    "bg-purple-500": "bg-purple-600 hover:bg-purple-700",
    "bg-indigo-500": "bg-indigo-600 hover:bg-indigo-700",
    "bg-teal-500": "bg-teal-600 hover:bg-teal-700",
  };

  return (
    <motion.div
      className={`${color} text-white shadow-lg rounded-lg p-5 sm:p-6 hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex flex-col items-center justify-between h-full`}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.95 }}
    >
      <NavLink to={link} className="block text-center w-full">
        <div className="flex justify-center items-center text-5xl sm:text-6xl mb-4">{icon}</div>
        <h3 className="text-lg sm:text-2xl font-bold mb-3">{title}</h3>
        <p className="text-sm sm:text-base mb-4 font-poppins">{description}</p>
        <button
          className={`${buttonColors[color]} px-5 sm:px-6 py-2 sm:py-3 rounded-full font-semibold transition-all duration-300 shadow-lg`}
        >
          Acessar
        </button>
      </NavLink>
    </motion.div>
  );
}

export default DashboardProfessor;
