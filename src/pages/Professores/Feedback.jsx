import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import 'animate.css'; // Certifique-se de que o pacote animate.css está instalado ou adicione o CDN no HTML principal

const EnviarFeedback = () => {
  const [feedback, setFeedback] = useState('');
  const [sugestao, setSugestao] = useState('');
  const [emailDestino, setEmailDestino] = useState('');
  const [status, setStatus] = useState('');

  const handleEnviar = async () => {
    if (!feedback || !sugestao || !emailDestino) {
      setStatus('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const response = await fetch('https://c85b-177-10-253-248.ngrok-free.app/backend/enviarFeedback.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ feedback, sugestao, emailDestino }),
      });

      const data = await response.json();

      if (data.status === 'success') {
        setStatus('Feedback e sugestão enviados com sucesso!');
        setFeedback('');
        setSugestao('');
        setEmailDestino('');
      } else {
        setStatus(data.message || 'Erro ao enviar os dados.');
      }
    } catch (error) {
      console.error('Erro ao enviar:', error.message);
      setStatus('Erro ao enviar os dados.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-teal-100 to-green-200 py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto">
        <div className="mb-6">
          <Link
            to="/Dashboard-professor"
            className="inline-flex items-center text-[#2b7a76] font-semibold text-lg bg-white px-4 py-2 rounded-full shadow-md hover:bg-[#2b7a76] hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <FaArrowLeft className="mr-2" />
            Voltar
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8 animate__animated animate__fadeIn">
          <h1 className="text-5xl font-extrabold text-[#2b7a76] text-center mb-12 animate__animated animate__fadeInDown">
            Enviar Feedback e Sugestão
          </h1>

          <div className="mb-6">
            <label htmlFor="feedback" className="block text-lg font-medium text-gray-700 mb-2">
              Feedback:
            </label>
            <textarea
              id="feedback"
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-[#2b7a76] focus:outline-none"
              placeholder="Descreva o feedback..."
            />
          </div>

          <div className="mb-6">
            <label htmlFor="sugestao" className="block text-lg font-medium text-gray-700 mb-2">
              Sugestão:
            </label>
            <textarea
              id="sugestao"
              value={sugestao}
              onChange={(e) => setSugestao(e.target.value)}
              rows={4}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-[#2b7a76] focus:outline-none"
              placeholder="Escreva sua sugestão de melhoria..."
            />
          </div>

          <div className="mb-6">
            <label htmlFor="emailDestino" className="block text-lg font-medium text-gray-700 mb-2">
              Enviar para (E-mail):
            </label>
            <input
              id="emailDestino"
              type="email"
              value={emailDestino}
              onChange={(e) => setEmailDestino(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-gray-800 focus:ring-2 focus:ring-[#2b7a76] focus:outline-none"
              placeholder="Digite o e-mail de destino..."
            />
          </div>

          {status && (
            <p
              className={`text-center text-lg mb-4 ${
                status.includes('sucesso') ? 'text-green-600' : 'text-red-600'
              }`}
            >
              {status}
            </p>
          )}

          <div className="text-center">
            <button
              onClick={handleEnviar}
              className="bg-[#2b7a76] text-white px-6 py-3 rounded-full text-xl font-semibold transition-transform transform hover:scale-105 hover:bg-[#236c5c] duration-300"
            >
              Enviar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnviarFeedback;
