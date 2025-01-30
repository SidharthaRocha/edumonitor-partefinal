import React, { useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa'; // Ícone de setinha para o botão "Voltar"
import { motion } from 'framer-motion'; // Importando o motion do framer-motion

const Notificacoes = () => {
  const [titulo, setTitulo] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [destinatarios, setDestinatarios] = useState('');
  const [status, setStatus] = useState('');

  const enviarNotificacao = async () => {
    try {
      const response = await fetch('https://4e03-177-10-253-154.ngrok-free.app/backend/notificacoes.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          titulo: titulo,
          mensagem: mensagem,
          destinatarios: destinatarios.split(',').map((email) => email.trim()), // Lista de e-mails
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao enviar notificação');
      }

      const data = await response.json();
      setStatus(data.message); // Mensagem de sucesso

      // Reseta os campos do formulário
      setTitulo('');
      setMensagem('');
      setDestinatarios('');
    } catch (error) {
      console.error('Erro:', error.message);
      setStatus('Erro ao enviar notificação.');
    }
  };

  const handleEnviar = (e) => {
    e.preventDefault();
    if (!titulo || !mensagem || !destinatarios) {
      setStatus('Preencha todos os campos.');
      return;
    }
    enviarNotificacao();
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-purple-800 to-indigo-700 font-poppins p-6"
      initial={{ opacity: 0, y: 50 }} // Animação inicial (invisível e deslocado para baixo)
      animate={{ opacity: 1, y: 0 }} // Animação final (totalmente visível e na posição original)
      transition={{ duration: 0.8 }} // Duração de 0.8s para a animação
    >
      {/* Botão de Voltar no canto superior esquerdo */}
      <button
        onClick={() => window.history.back()} // Volta para a página anterior
        className="absolute top-4 left-4 flex items-center text-white text-lg px-4 py-2 border-2 border-transparent rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:bg-gradient-to-r hover:from-purple-600 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition-all duration-300 shadow-lg hover:shadow-xl"
      >
        <FaArrowLeft size={20} className="mr-2" />
        Voltar
      </button>

      <h1 className="text-4xl font-extrabold text-white mb-8">Enviar Notificação</h1>

      <form
        className="bg-white rounded-lg shadow-xl p-8 w-full max-w-lg"
        onSubmit={handleEnviar}
      >
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Título:</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Digite o título da notificação"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Mensagem:</label>
          <textarea
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            rows="4"
            placeholder="Digite a mensagem"
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">Destinatários:</label>
          <input
            type="text"
            value={destinatarios}
            onChange={(e) => setDestinatarios(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
            placeholder="Digite os e-mails separados por vírgula"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-2 rounded-lg shadow-md hover:opacity-90 transition-opacity"
        >
          Enviar Notificação
        </button>

        {status && (
          <p className={`mt-4 text-center ${status.includes('Erro') ? 'text-red-500' : 'text-green-500'}`}>
            {status}
          </p>
        )}
      </form>
    </motion.div>
  );
};

export default Notificacoes;
