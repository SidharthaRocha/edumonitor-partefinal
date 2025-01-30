import React, { useState } from 'react';
import { FaPlus, FaArrowLeft, FaCalendarAlt } from 'react-icons/fa';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // Importe o useNavigate

const AddEvent = () => {
  const [newEvent, setNewEvent] = useState('');
  const [reminder, setReminder] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Instanciando o useNavigate
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newEvent) {
      setMessage('Por favor, preencha o nome do evento!');
      return;
    }

    setIsSubmitting(true);
    setMessage('');

    const eventData = {
      event_name: newEvent,
      event_date: selectedDate.toISOString().split('T')[0],
      reminder: reminder,
    };

    try {
      const response = await fetch('https://4e03-177-10-253-154.ngrok-free.app/backend/calendario.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });

      const result = await response.json();
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
      setNewEvent('');
      setReminder(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center p-12 bg-gradient-to-br from-blue-50 via-indigo-100 to-teal-100"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {/* Botão de Voltar usando o useNavigate */}
      <button
        onClick={() => navigate(-1)} // Usando navigate(-1) para voltar à página anterior
        className="absolute top-6 left-6 flex items-center text-gray-600 bg-white px-5 py-3 rounded-full shadow-lg hover:bg-gray-100 transition-all"
      >
        <FaArrowLeft className="mr-2" />
        Voltar
      </button>

      {/* Título */}
      <h2 className="text-5xl font-extrabold text-gray-700 mb-10 text-center">Adicionar Evento</h2>

      {/* Container principal ampliado */}
      <div className="w-full max-w-7xl flex flex-col md:flex-row items-start gap-12">
        
        {/* Calendário maior e mais integrado */}
        <motion.div
          className="bg-white bg-opacity-90 backdrop-blur-lg p-8 rounded-3xl shadow-xl w-full md:w-2/5 flex flex-col items-center border border-gray-200"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="text-4xl font-semibold mb-6 text-gray-600 flex items-center">
            <FaCalendarAlt className="mr-3 text-teal-400" />
            Escolha uma Data
          </h3>
          <Calendar
            onChange={setSelectedDate}
            value={selectedDate}
            className="border-none rounded-lg p-4 w-full shadow-lg text-lg"
            tileClassName={({ date, view }) =>
              view === 'month' && date.toDateString() === selectedDate.toDateString()
                ? 'bg-teal-300 text-white rounded-full'
                : 'text-gray-600'
            }
          />
          <p className="mt-6 text-gray-600 text-xl">
            Data Selecionada: <strong>{selectedDate.toLocaleDateString()}</strong>
          </p>
        </motion.div>

        {/* Formulário maior e mais espaçoso */}
        <motion.div
          className="bg-white bg-opacity-90 backdrop-blur-lg p-10 rounded-3xl shadow-xl w-full md:w-3/5 border border-gray-200"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Nome do Evento */}
            <div className="relative">
              <input
                type="text"
                placeholder="Nome do Evento"
                value={newEvent}
                onChange={(e) => setNewEvent(e.target.value)}
                className="border-2 border-gray-300 p-5 rounded-lg w-full focus:ring-2 focus:ring-teal-300 text-lg placeholder-gray-500 bg-transparent text-gray-700"
              />
            </div>

            {/* Lembrete */}
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={reminder}
                onChange={() => setReminder(!reminder)}
                className="w-7 h-7 text-teal-300"
              />
              <span className="text-gray-600 text-xl">Lembrete para este evento</span>
            </div>

            {/* Botão Enviar */}
            <button
              type="submit"
              className="flex items-center justify-center p-5 bg-gradient-to-r from-teal-400 to-teal-500 text-white rounded-lg shadow-lg w-full hover:shadow-xl transition-all duration-300 text-2xl font-semibold"
              disabled={isSubmitting}
            >
              <FaPlus className="mr-3" />
              {isSubmitting ? 'Adicionando...' : 'Adicionar Evento'}
            </button>
          </form>

          {/* Mensagem de sucesso ou erro */}
          {message && (
            <p className={`text-center mt-5 text-xl font-semibold ${message.includes('Erro') ? 'text-red-500' : 'text-green-500'}`}>
              {message}
            </p>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default AddEvent;
