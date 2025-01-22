import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Seufilho from '../assets/filho.jpg'

const MonitoringPage = () => {
  useEffect(() => {
    const pageContent = document.getElementById("pageContent");
    pageContent.classList.add("animate__animated", "animate__fadeIn");
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-indigo-600 to-purple-500 text-white">
      {/* Cabeçalho */}
      <header className="text-center py-16 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
          Acompanhe o Desenvolvimento do Seu Filho
        </h1>
        <p className="mt-6 text-lg md:text-xl text-gray-100 max-w-3xl mx-auto">
          Uma plataforma moderna para que os pais possam acompanhar o progresso escolar dos alunos em tempo real. Simples, prático e eficiente.
        </p>
      </header>

      {/* Conteúdo principal */}
      <main
        id="pageContent"
        className="bg-white text-gray-800 rounded-t-3xl shadow-2xl p-8 md:p-12 mx-4 lg:mx-auto max-w-5xl space-y-12"
      >
        {/* Seção de Imagem e Benefícios */}
        <div className="space-y-8">
          {/* Imagem destacada */}
          <div className="relative w-full rounded-3xl overflow-hidden shadow-lg">
            <img
              src={Seufilho}
              alt="Ilustração de educação"
              className="w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
          </div>

          {/* Benefícios */}
          <section className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-purple-800 mb-6">
              Benefícios Exclusivos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                {
                  icon: "🚀",
                  text: "Acompanhamento em tempo real do desempenho escolar."
                },
                {
                  icon: "🔔",
                  text: "Notificações instantâneas sobre tarefas e avaliações."
                },
                {
                  icon: "📊",
                  text: "Relatórios detalhados sobre o progresso de cada aluno."
                },
                {
                  icon: "💬",
                  text: "Comunicação direta com os professores."
                },
                {
                  icon: "👨‍👩‍👧‍👦",
                  text: "Facilita o acompanhamento diário pelos pais."
                },
                {
                  icon: "🌟",
                  text: "Metas claras para o sucesso escolar."
                }
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center bg-gray-100 text-gray-800 p-6 rounded-lg shadow-md"
                >
                  <div className="text-4xl mb-4">{benefit.icon}</div>
                  <p className="text-lg text-center">{benefit.text}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Seção de Texto */}
        <section className="space-y-6">
          <p className="text-lg leading-relaxed">
            Garantir o sucesso acadêmico das crianças é uma prioridade para os pais. Nossa plataforma fornece uma maneira intuitiva e moderna para acompanhar o desempenho escolar em tempo real, assegurando o apoio necessário em todas as etapas do aprendizado.
          </p>
          <p className="text-lg leading-relaxed">
            Com recursos como relatórios detalhados, notificações automáticas e comunicação direta com professores, os pais têm todas as ferramentas para ajudar os filhos a atingirem o máximo do seu potencial.
          </p>
        </section>

        {/* Botão Voltar */}
        <div className="flex justify-center">
          <Link
            to="/"
            className="px-6 py-3 bg-purple-700 text-white text-lg font-semibold rounded-lg shadow-md hover:bg-purple-600 transition duration-300"
          >
            Voltar
          </Link>
        </div>
      </main>
    </div>
  );
};

export default MonitoringPage;
