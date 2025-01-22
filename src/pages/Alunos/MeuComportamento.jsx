import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaRegComment } from 'react-icons/fa';
import { MdTipsAndUpdates } from 'react-icons/md';
import { FaArrowLeft } from 'react-icons/fa';

const Comportamento = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await fetch('http://localhost/backend/receberFeedback.php'); // Altere o endpoint conforme necessário
        if (!response.ok) {
          throw new Error('Erro ao buscar feedbacks.');
        }

        const data = await response.json();
        if (data.status === 'success') {
          setFeedbacks(data.data);
        } else {
          setStatus(data.message || 'Erro ao carregar os dados.');
        }
      } catch (error) {
        console.error('Erro ao buscar feedbacks:', error.message);
        setStatus('Erro ao carregar os dados.');
      }
    };

    fetchFeedbacks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-100 to-green-200 py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Botão de Voltar */}
        <div className="mb-6">
          <Link
            to="/Dashboard-aluno"
            className="inline-flex items-center text-[#2b7a76] font-semibold text-lg bg-white px-4 py-2 rounded-full shadow-md hover:bg-[#2b7a76] hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <FaArrowLeft className="mr-2" />
            Voltar
          </Link>
        </div>

        {/* Título da Página */}
        <h1 className="text-5xl font-extrabold text-[#2b7a76] text-center mb-12 animate__animated animate__fadeIn">
          Meu Comportamento
        </h1>

        {/* Cards de Funcionalidades */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {/* Visualizar Feedback */}
          <div className="bg-white rounded-xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:scale-105 ease-in-out duration-300">
            <h2 className="text-2xl font-semibold text-[#2b7a76] mb-4">Visualizar Feedback</h2>
            <p className="text-gray-700 mb-4">Confira os comentários e observações feitas pelos professores sobre seu comportamento.</p>
            <div className="mt-4">
              <FaRegComment className="text-[#2b7a76] text-6xl mx-auto" />
            </div>
          </div>

          {/* Sugestões de Melhoria */}
          <div className="bg-white rounded-xl shadow-xl p-8 hover:shadow-2xl transition-all transform hover:scale-105 ease-in-out duration-300">
            <h2 className="text-2xl font-semibold text-[#2b7a76] mb-4">Sugestões de Melhoria</h2>
            <p className="text-gray-700 mb-4">Veja dicas personalizadas para melhorar seu desempenho e comportamento.</p>
            <div className="mt-4">
              <MdTipsAndUpdates className="text-[#2b7a76] text-6xl mx-auto" />
            </div>
          </div>
        </div>

        {/* Feedbacks e Sugestões */}
        <div className="mt-12">
          {/* Feedbacks */}
          <div className="bg-white rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all ease-in-out duration-300">
            <h3 className="text-3xl font-semibold text-[#2b7a76] mb-6">Feedback dos Professores</h3>
            <div className="space-y-6">
              {feedbacks.length > 0 ? (
                feedbacks.map((item, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 shadow-md">
                    <p className="text-lg text-gray-800">
                      "{item.feedback}" <span className="text-sm text-gray-500">({item.data_envio})</span>
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-700">Nenhum feedback disponível.</p>
              )}
            </div>
          </div>

          {/* Sugestões de Melhoria */}
          <div className="mt-12 bg-white rounded-2xl p-10 shadow-xl hover:shadow-2xl transition-all ease-in-out duration-300">
            <h3 className="text-3xl font-semibold text-[#2b7a76] mb-6">Sugestões de Melhoria</h3>
            <ul className="list-disc pl-6 text-lg text-gray-800 space-y-4">
              {feedbacks.length > 0 ? (
                feedbacks.map((item, index) => (
                  <li key={index}>{item.sugestao}</li>
                ))
              ) : (
                <p className="text-center text-gray-700">Nenhuma sugestão disponível.</p>
              )}
            </ul>
          </div>
        </div>

        {/* Botões de Ação */}
        <div className="mt-12 text-center">
          <button className="bg-[#2b7a76] text-white px-6 py-3 rounded-full text-xl font-semibold transition-transform transform hover:scale-105 hover:bg-[#236c5c] duration-300">
            Gerar Relatório de Comportamento
          </button>
        </div>
      </div>
    </div>
  );
};

export default Comportamento;
