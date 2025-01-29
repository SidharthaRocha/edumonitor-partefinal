import React, { useEffect, useState } from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import { Transition } from '@headlessui/react';

const Calendar = () => {
  const [events, setEvents] = useState([]); // Para armazenar os eventos
  const [selectedDate, setSelectedDate] = useState(dayjs()); // Data selecionada
  const [error, setError] = useState(null); // Estado para armazenar erros
  const [show, setShow] = useState(false); // Controla a visibilidade para animação
  const daysOfWeek = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  // Função para carregar eventos (simulada para testes)
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        // Simulando a resposta de eventos (remover quando a API real estiver funcionando)
        const simulatedEvents = [
          {
            id: '1',
            event_name: 'Reunião de Planejamento',
            event_date: '2025-01-15',
            reminder: 1,
            created_at: '2025-01-01',
          },
          {
            id: '2',
            event_name: 'Treinamento de Equipe',
            event_date: '2025-01-22',
            reminder: 0,
            created_at: '2025-01-10',
          },
          {
            id: '3',
            event_name: 'Reunião com Cliente',
            event_date: '2025-01-28',
            reminder: 1,
            created_at: '2025-01-15',
          },
        ];

        // Atribuindo eventos simulados ao estado
        setEvents(simulatedEvents);

        // Limpar qualquer erro anterior
        setError(null);
      } catch (error) {
        console.error('Erro:', error);
        setError('Houve um erro ao carregar os eventos. Tente novamente mais tarde.');
      }
    };

    fetchEvents();
    setShow(true); // Ativa a animação ao carregar a página
  }, []);

  // Função para gerar as semanas do mês
  const generateCalendar = (month) => {
    const startOfMonth = month.startOf('month');
    const endOfMonth = month.endOf('month');
    const startOfWeek = startOfMonth.startOf('week');
    const endOfWeek = endOfMonth.endOf('week');

    const daysInCalendar = [];
    let currentDay = startOfWeek;

    while (currentDay.isBefore(endOfWeek)) {
      daysInCalendar.push(currentDay);
      currentDay = currentDay.add(1, 'day');
    }

    return daysInCalendar;
  };

  // Filtra eventos para o mês atual
  const currentMonthEvents = events.filter((event) =>
    dayjs(event.event_date, 'YYYY-MM-DD').isSame(selectedDate, 'month')
  );

  const daysInCalendar = generateCalendar(selectedDate);

  return (
    <Transition
      show={show} // Controla a exibição para a animação
      enter="transition-opacity duration-500 ease-out"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300 ease-in"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div className="min-h-screen bg-gradient-to-r from-blue-100 to-indigo-200 flex flex-col items-center justify-center p-6">
        <div className="mb-6 w-full max-w-md">
          <Link
            to="/Dashboard-aluno"
            className="inline-flex items-center text-indigo-700 font-semibold text-lg bg-white px-4 py-2 rounded-full shadow-md hover:bg-indigo-700 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <FaArrowLeft className="mr-2" />
            Voltar
          </Link>
        </div>

        <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6">
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => setSelectedDate(selectedDate.subtract(1, 'month'))}
              className="text-lg text-gray-700 hover:text-indigo-700 transition-transform transform hover:scale-105"
            >
              ←
            </button>
            <h2 className="text-2xl font-bold text-indigo-800">
              {selectedDate.format('MMMM YYYY')}
            </h2>
            <button
              onClick={() => setSelectedDate(selectedDate.add(1, 'month'))}
              className="text-lg text-gray-700 hover:text-indigo-700 transition-transform transform hover:scale-105"
            >
              →
            </button>
          </div>

          <div className="grid grid-cols-7 gap-4 text-center text-indigo-600 font-medium">
            {daysOfWeek.map((day, index) => (
              <div key={index}>{day}</div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-2 mt-4">
            {daysInCalendar.map((day, index) => {
              const isToday = day.isSame(dayjs(), 'day');
              const isSelected = day.isSame(selectedDate, 'day');
              const eventForDay = currentMonthEvents.find((event) =>
                dayjs(event.event_date, 'YYYY-MM-DD').isSame(day, 'day')
              );

              return (
                <Transition
                  key={index}
                  show={true}
                  enter="transition-all duration-300 ease-in"
                  leave="transition-all duration-300 ease-out"
                >
                  <div
                    className={`relative p-4 rounded-lg text-center cursor-pointer text-sm font-medium transition-all duration-300 ${
                      isToday ? 'bg-indigo-300 text-white' : 'bg-gray-100'
                    } ${isSelected ? 'ring-2 ring-indigo-500' : ''} hover:bg-indigo-200`}
                    onClick={() => setSelectedDate(day)}
                  >
                    <span>{day.date()}</span>
                    {eventForDay && (
                      <div
                        className="absolute top-2 right-2 bg-indigo-500 text-white text-xs rounded-full px-2 py-1"
                        title={eventForDay.event_name}
                      >
                        Evento
                      </div>
                    )}
                  </div>
                </Transition>
              );
            })}
          </div>
        </div>

        <div className="w-full max-w-md bg-white rounded-lg shadow-xl p-6 mt-6">
          <h2 className="text-2xl font-bold text-indigo-800 mb-4">Eventos Programados</h2>

          {error && (
            <div className="text-red-500 mb-4">
              <strong>{error}</strong>
            </div>
          )}

          {currentMonthEvents.length > 0 ? (
            currentMonthEvents.map((event) => (
              <div key={event.id} className="bg-gray-100 p-4 mb-4 rounded-lg shadow-md">
                <h3 className="text-lg font-semibold">{event.event_name}</h3>
                <p>
                  <strong>Data:</strong>{' '}
                  {dayjs(event.event_date, 'YYYY-MM-DD').format('DD/MM/YYYY')}
                </p>
                {event.reminder === 1 && (
                  <p className="text-red-500">
                    <strong>Lembrete:</strong> Ativado
                  </p>
                )}
                <p>
                  <strong>Criado em:</strong>{' '}
                  {dayjs(event.created_at, 'YYYY-MM-DD').format('DD/MM/YYYY')}
                </p>
              </div>
            ))
          ) : (
            <p>Nenhum evento encontrado.</p>
          )}
        </div>
      </div>
    </Transition>
  );
};

export default Calendar;
