import React, { useEffect, useState } from 'react';
import { FaArrowLeft, FaVideo, FaFilePdf, FaLink } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Recursos = () => {
  const [recursos, setRecursos] = useState([]);
  const [erro, setErro] = useState(null); // Adicionado para tratar erros de requisição

  // Simulação de recursos recebidos (materiais e vídeos com links)
  const recursosSimulados = [
    {
      id: 1,
      nome: 'Apostila de Matemática',
      tipo: 'PDF',
      link: 'https://www.exemplo.com/arquivo-matematica.pdf',
    },
    {
      id: 2,
      nome: 'Vídeo de Física - Lei de Newton',
      tipo: 'Vídeo',
      link: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', // Apenas um exemplo de vídeo
    },
    {
      id: 3,
      nome: 'Tutorial de Programação',
      tipo: 'Link',
      link: 'https://www.w3schools.com',
    },
    {
      id: 4,
      nome: 'Apostila de Química',
      tipo: 'PDF',
      link: 'https://www.exemplo.com/arquivo-quimica.pdf',
    },
    {
      id: 5,
      nome: 'Aula sobre Termodinâmica',
      tipo: 'Vídeo',
      link: 'https://www.youtube.com/watch?v=QdFy7D9g8J8',
    },
  ];

  useEffect(() => {
    // Simulando os recursos recebidos
    setRecursos(recursosSimulados); // Atualiza o estado com os recursos simulados
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-100 via-orange-100 to-orange-200 py-12 px-6 sm:px-8 lg:px-12">
      <div className="max-w-5xl mx-auto">
        {/* Botão de Voltar */}
        <div className="mb-6">
          <Link
            to="/Dashboard-aluno"
            className="inline-flex items-center text-orange-600 font-semibold text-lg bg-white px-4 py-2 rounded-full shadow-md hover:bg-orange-600 hover:text-white transition-all duration-300 ease-in-out transform hover:scale-105"
          >
            <FaArrowLeft className="mr-2" />
            Voltar
          </Link>
        </div>

        {/* Título */}
        <h1 className="text-5xl font-bold text-orange-600 text-center mb-12">
          Meus Recursos de Estudo
        </h1>

        {/* Exibição de Erro */}
        {erro && (
          <p className="text-center text-red-600 font-semibold mb-8">{erro}</p>
        )}

        {/* Exibição dos Recursos */}
        {recursos.length === 0 && !erro ? (
          <p className="text-center text-gray-600 font-semibold">Nenhum recurso encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8">
            {recursos.map((recurso) => (
              <div key={recurso.id} className="bg-white rounded-lg shadow-md p-6 hover:scale-105 hover:shadow-lg transition-all duration-300">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-2xl font-semibold text-orange-600">{recurso.nome}</h2>
                  <div className="text-orange-600 text-3xl">
                    {recurso.tipo === 'PDF' ? <FaFilePdf /> : recurso.tipo === 'Vídeo' ? <FaVideo /> : <FaLink />}
                  </div>
                </div>
                <p className="text-lg text-gray-600 mb-6">{recurso.tipo}</p>
                <a href={recurso.link} target="_blank" rel="noopener noreferrer" className="block">
                  <button className="w-full bg-orange-600 text-white px-4 py-3 rounded-lg text-lg font-semibold hover:bg-orange-700 transition-all duration-300">
                    {recurso.tipo === 'PDF' ? 'Baixar PDF' : recurso.tipo === 'Vídeo' ? 'Assistir Vídeo' : 'Acessar Site'}
                  </button>
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Recursos;
