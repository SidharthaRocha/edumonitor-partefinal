import React, { useState } from 'react';
import { FaPlus, FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion'; // Importando o motion

const AddEvent = () => {
  const [newEvent, setNewEvent] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [reminder, setReminder] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState(''); // Para exibir mensagens de sucesso ou erro

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (newEvent && eventDate) {
      setIsSubmitting(true);
      setMessage(''); // Limpa qualquer mensagem anterior

      // Criação do objeto de evento
      const eventData = {
        event_name: newEvent,
        event_date: eventDate,
        reminder: reminder,
      };

      try {
        // Enviar evento para o backend PHP
        const response = await fetch('https://c85b-177-10-253-248.ngrok-free.app/backend/calendario.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(eventData), // Envia os dados como JSON
        });

        const result = await response.json();
        console.log(result); // Exibe a resposta no console para depuração

        if (result.status === 'success') {
          setMessage('Evento adicionado com sucesso!');
        } else {
          setMessage(`Erro: ${result.message}`);
        }
      } catch (error) {
        console.error('Erro:', error);
        setMessage('Erro na conexão com o servidor');
      } finally {
        setIsSubmitting(false);
      }
    } else {
      setMessage('Por favor, preencha todos os campos!');
    }
  };

  // Função para redirecionar para a página anterior
  const handleBack = () => {
    window.history.back(); // Redireciona para a página anterior no histórico do navegador
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-r from-teal-400 to-blue-600 flex justify-center items-center p-8"
      initial={{ opacity: 0, y: 50 }} // Começa invisível e deslocado para baixo
      animate={{ opacity: 1, y: 0 }} // Fica visível e na posição normal
      transition={{ duration: 0.8 }} // A duração da animação
    >
      <div className="bg-white rounded-3xl shadow-2xl p-8 w-full sm:w-96 max-w-lg">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-6">Adicionar Evento</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Nome do Evento */}
          <input
            type="text"
            placeholder="Nome do Evento"
            value={newEvent}
            onChange={(e) => setNewEvent(e.target.value)}
            className="border-2 border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          {/* Data do Evento */}
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="border-2 border-gray-300 p-3 rounded-lg w-full mb-4 focus:outline-none focus:ring-2 focus:ring-teal-500"
          />

          {/* Lembrete */}
          <div className="flex items-center justify-center mb-4">
            <input
              type="checkbox"
              checked={reminder}
              onChange={() => setReminder(!reminder)}
              className="mr-2"
            />
            <span className="text-gray-800">Lembrete para este evento</span>
          </div>

          {/* Botão Enviar */}
          <button
            type="submit"
            className="flex items-center justify-center p-4 bg-gradient-to-r from-blue-600 to-teal-600 text-white rounded-lg shadow-md w-full mb-6 hover:shadow-lg transition-all duration-300"
            disabled={isSubmitting}
          >
            <FaPlus className="mr-2" />
            {isSubmitting ? 'Adicionando...' : 'Adicionar Evento'}
          </button>
        </form>

        {/* Mensagem de sucesso ou erro */}
        {message && (
          <div className="text-center text-red-500 mt-4">
            <strong>{message}</strong>
          </div>
        )}
      </div>

      {/* Botão de Voltar - Posicionado no canto superior esquerdo */}
      <button
        onClick={handleBack}
        className="absolute top-4 left-4 inline-flex items-center text-indigo-700 font-semibold text-lg bg-white px-6 py-2 rounded-full shadow-md hover:bg-indigo-700 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
      >
        <FaArrowLeft className="mr-2" />
        Voltar
      </button>
    </motion.div>
  );
};

export default AddEvent;
