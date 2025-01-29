import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaBell, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom'; // Importando o Link do React Router

const NotificacoesRecebidas = () => {
  const [notificacoes, setNotificacoes] = useState([]);
  const [status, setStatus] = useState('');

  // Simulação de notificações recebidas
  useEffect(() => {
    const notificacoesSimuladas = [
      { id: 1, titulo: 'Nova Tarefa Disponível', mensagem: 'Uma nova tarefa foi adicionada ao seu curso.', status: 'Não Lida' },
      { id: 2, titulo: 'Atualização de Horário', mensagem: 'O horário da aula de Matemática foi alterado.', status: 'Não Lida' },
      { id: 3, titulo: 'Parabéns!', mensagem: 'Você completou todas as suas tarefas da semana.', status: 'Lida' },
    ];
    setNotificacoes(notificacoesSimuladas);
  }, []);

  const handleMarcarComoLida = async (id) => {
    try {
      setNotificacoes((prev) =>
        prev.map((notificacao) =>
          notificacao.id === id ? { ...notificacao, status: 'Lida' } : notificacao
        )
      );
      setStatus('Notificação marcada como lida com sucesso!');
    } catch (error) {
      console.error('Erro:', error.message);
      setStatus('Erro ao marcar notificação como lida.');
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-teal-500 to-cyan-600 font-sans p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
    >
      {/* Botão Voltar como Link do React Router */}
      <motion.div
        className="absolute top-6 left-6"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          to="/dashboard-aluno" // Substitua o caminho conforme necessário
          className="inline-flex items-center text-[#2b7a76] font-semibold text-lg bg-white px-4 py-2 rounded-full shadow-md hover:bg-[#2b7a76] hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          <FaArrowLeft size={20} />
          Voltar
        </Link>
      </motion.div>

      {/* Título */}
      <motion.h1
        className="text-5xl font-extrabold text-white mb-12 text-center drop-shadow-lg font-poppins"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        Notificações Recebidas
      </motion.h1>

      {/* Status */}
      {status && (
        <p className={`text-sm mb-4 ${status.includes('Erro') ? 'text-red-300' : 'text-green-300'}`}>
          {status}
        </p>
      )}

      {/* Cartões de Notificação */}
      <motion.div
        className="grid gap-12 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 w-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {notificacoes.length > 0 ? (
          notificacoes.map((notificacao) => (
            <motion.div
              key={notificacao.id}
              className="relative bg-white rounded-xl shadow-xl p-6 w-full text-center transition-all duration-300 hover:scale-105 hover:shadow-2xl"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-indigo-500 to-purple-600 p-3 rounded-full shadow-lg">
                <FaBell size={28} className="text-white animate-pulse" />
              </div>

              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                <span className="text-teal-600">{notificacao.titulo}</span>
              </h2>

              {/* Mensagem com fonte maior */}
              <p className="text-lg text-gray-700 mb-6">{notificacao.mensagem}</p>

              <div className="flex flex-col gap-4 items-center">
                <span
                  className={`px-4 py-2 text-sm rounded-full font-medium shadow-md ${
                    notificacao.status === 'Lida'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-blue-100 text-blue-800'
                  }`}
                >
                  {notificacao.status}
                </span>

                {notificacao.status !== 'Lida' && (
                  <button
                    onClick={() => handleMarcarComoLida(notificacao.id)}
                    className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-2 rounded-full shadow-lg hover:opacity-90 transition-opacity flex items-center gap-2"
                  >
                    <FaCheckCircle />
                    Marcar como Lida
                  </button>
                )}
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-white text-lg">Não há notificações disponíveis no momento. 🎉</p>
        )}
      </motion.div>
    </motion.div>
  );
};

export default NotificacoesRecebidas;
