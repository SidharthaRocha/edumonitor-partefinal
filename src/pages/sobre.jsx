import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Logo from '../assets/Logo.png';
import { FaBookOpen, FaComments, FaCalendarAlt, FaChartLine, FaUsers } from 'react-icons/fa';
import Login from './sistema-de-login';


const Sobre = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginModalOpen(false);
  };


  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Navbar */}
      <div className="fixed top-0 left-0 w-full flex justify-between items-center p-6 bg-white shadow-xl z-50 font-poppins font-semibold">
        <div className="flex items-center space-x-6">
          <img src={Logo} alt="Logo" className="h-10 w-auto" />
          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="text-purple-700 hover:bg-purple-800 hover:text-white px-4 py-2 rounded transition-colors duration-200"
            >
              Home
            </Link>
            <Link
              to="/blog"
              className="text-purple-700 hover:bg-purple-800 hover:text-white px-4 py-2 rounded transition-colors duration-200"
            >
              Blog
            </Link>
            <Link
              to="/sobre"
              className="text-purple-700 hover:bg-purple-800 hover:text-white px-4 py-2 rounded transition-colors duration-200"
            >
              Sobre
            </Link>
          </div>
        </div>
        <button
            onClick={openLoginModal}
            className="bg-purple-700 text-white rounded-full px-6 py-3 hover:bg-purple-800"
          >
            Login
          </button>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-purple-700"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        </div>
      </div>

  {/* Mobile Menu */}
{isMenuOpen && (
  <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center md:hidden">
    <button
      onClick={() => setIsMenuOpen(false)}
      className="absolute top-6 right-6 text-2xl text-purple-700 hover:text-purple-900 transition-colors duration-200"
    >
      &times;
    </button>

    <nav className="flex flex-col items-center space-y-8">
      <Link
        to="/"
        onClick={() => setIsMenuOpen(false)}
        className="text-purple-700 text-2xl font-poppins font-semibold hover:bg-purple-800 hover:text-white px-6 py-2 rounded"
      >
        Home
      </Link>
      <Link
        to="/blog"
        onClick={() => setIsMenuOpen(false)}
        className="text-purple-700 text-2xl font-poppins font-semibold hover:bg-purple-800 hover:text-white px-6 py-2 rounded"
      >
        Blog
      </Link>
      <Link
        to="/sobre"
        onClick={() => setIsMenuOpen(false)}
        className="text-purple-700 text-2xl font-poppins font-semibold hover:bg-purple-800 hover:text-white px-6 py-2 rounded"
      >
        Sobre
      </Link>
    </nav>
  </div>
)}

      {/* Main Content */}
      <main className="flex-1 p-4 pt-20 mt-6"> {/* Added pt-20 here to add padding on top */}
        <div className="max-w-4xl mx-auto">
          <section className="mb-8 animate__animated animate__fadeInLeft">
            <h2 className="text-3xl font-bold text-purple-800 mb-4">
              O Que é o Monitoramento Online?
            </h2>
            <p className="text-gray-700 mb-4">
              O Monitoramento Online é uma plataforma inovadora que oferece uma solução completa para acompanhar o desempenho escolar, conectando pais, professores e alunos em um único ambiente digital.
            </p>
            <p className="text-gray-700 mb-4">
              Nossa missão é facilitar o acesso à educação de qualidade e promover a transparência entre pais e instituições de ensino.
            </p>
          </section>

          <section className="mb-8 bg-white shadow-lg rounded-lg p-6 animate__animated animate__fadeInUp">
            <h2 className="text-3xl font-bold text-purple-800 mb-4">Funcionalidades</h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li className="flex items-center">
                <FaChartLine className="mr-2 text-purple-600" />
                Acompanhamento de Notas e Desempenho
              </li>
              <li className="flex items-center">
                <FaComments className="mr-2 text-purple-600" />
                Observações dos Professores em Tempo Real
              </li>
              <li className="flex items-center">
                <FaCalendarAlt className="mr-2 text-purple-600" />
                Calendário de Atividades e Avaliações
              </li>
              <li className="flex items-center">
                <FaBookOpen className="mr-2 text-purple-600" />
                Relatórios Detalhados sobre o Progresso do Aluno
              </li>
              <li className="flex items-center">
                <FaUsers className="mr-2 text-purple-600" />
                Comunicação Direta entre Pais e Professores
              </li>
            </ul>
          </section>

          <section className="mb-8 bg-white shadow-lg rounded-lg p-6 animate__animated animate__fadeInRight">
            <h2 className="text-3xl font-bold text-purple-800 mb-4">
              Benefícios do Uso
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2">
              <li>Melhoria na comunicação entre a escola e os responsáveis.</li>
              <li>Transparência sobre o progresso e desafios enfrentados pelos alunos.</li>
              <li>Acesso rápido e fácil a informações relevantes.</li>
              <li>Redução de reuniões presenciais desnecessárias.</li>
              <li>Mais tempo para os professores se concentrarem no ensino.</li>
            </ul>
          </section>

          <section className="mb-8 animate__animated animate__fadeInUp">
            <h2 className="text-3xl font-bold text-purple-800 mb-4">Por Que Escolher o Monitoramento Online?</h2>
            <p className="text-gray-700 mb-4">
              Escolher o Monitoramento Online é investir em uma educação mais conectada e eficiente. Nossa plataforma é segura, acessível e adaptável às necessidades de cada escola e família.
            </p>
            <p className="text-gray-700">
              Estamos comprometidos em promover o sucesso acadêmico de cada aluno, fornecendo ferramentas que realmente fazem a diferença no dia a dia escolar.
            </p>
          </section>
        </div>
        {isLoginModalOpen && <Login onClose={closeLoginModal} />}

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Sobre;
