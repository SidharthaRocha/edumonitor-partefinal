import React, { useState } from 'react';
import { FaArrowLeft, FaUpload } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion'; // Importando o motion

const UploadRecursos = () => {
  const [nome, setNome] = useState('');
  const [tipo, setTipo] = useState('PDF');
  const [link, setLink] = useState('');
  const [arquivo, setArquivo] = useState(null);
  const [mensagem, setMensagem] = useState('');
  const [mensagemErro, setMensagemErro] = useState('');

  const isValidURL = (string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagemErro('');  // Reset error message on each submit attempt

    if (!nome) {
      setMensagemErro('O nome do recurso é obrigatório.');
      return;
    }

    try {
      let response;

      if (tipo === 'Link' || tipo === 'Vídeo') {
        if (!link || !isValidURL(link)) {
          setMensagemErro('Por favor, insira um link válido.');
          return;
        }
        const jsonPayload = { nome, tipo, link };
        response = await fetch('http://localhost/backend/upload.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(jsonPayload),
          credentials: 'include',
        });
      } else {
        if (!arquivo) {
          setMensagemErro('Por favor, selecione um arquivo.');
          return;
        }
        const formData = new FormData();
        formData.append('nome', nome);
        formData.append('tipo', tipo);
        formData.append('arquivo', arquivo);

        response = await fetch('http://localhost/backend/upload.php', {
          method: 'POST',
          body: formData,
          credentials: 'include',
        });
      }

      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.message || 'Erro ao enviar o recurso.');
      }
      setMensagem(result.message || 'Recurso enviado com sucesso!');
      setNome('');
      setTipo('PDF');
      setLink('');
      setArquivo(null);
    } catch (error) {
      console.error('Erro:', error);
      setMensagemErro('Erro ao enviar o recurso. Tente novamente.');
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gradient-to-b from-green-100 via-blue-100 to-blue-200 py-12 px-6 sm:px-8 lg:px-12"
      initial={{ opacity: 0, y: 50 }} // Começa invisível e deslocado para baixo
      animate={{ opacity: 1, y: 0 }} // Fica visível e na posição normal
      transition={{ duration: 0.8 }} // A duração da animação
    >
      <div className="max-w-4xl mx-auto">
        <Link
          to="/Dashboard-professor"
          className="inline-flex items-center text-blue-600 font-semibold text-lg bg-white px-6 py-2 rounded-full shadow-md hover:bg-blue-600 hover:text-white transition-all duration-300"
        >
          <FaArrowLeft className="mr-2" />
          Voltar
        </Link>
        <h1 className="text-4xl font-extrabold text-center text-blue-800 mt-6 mb-12">Enviar Novo Recurso</h1>
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-xl space-y-6 max-w-2xl mx-auto mt-4">
          <div>
            <label htmlFor="nome" className="block text-lg font-medium text-gray-700">Nome do Recurso</label>
            <input
              type="text"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              placeholder="Ex.: Aula de Matemática"
            />
          </div>
          <div>
            <label htmlFor="tipo" className="block text-lg font-medium text-gray-700">Tipo de Recurso</label>
            <select
              id="tipo"
              value={tipo}
              onChange={(e) => setTipo(e.target.value)}
              className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
            >
              <option value="PDF">PDF</option>
              <option value="Vídeo">Vídeo</option>
              <option value="Link">Link</option>
            </select>
          </div>
          <div>
            {tipo === 'Link' || tipo === 'Vídeo' ? (
              <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Insira o URL"
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            ) : (
              <input
                type="file"
                onChange={(e) => setArquivo(e.target.files[0])}
                className="w-full p-4 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-full shadow-md hover:bg-blue-700 transition-all duration-300 flex items-center justify-center space-x-2"
          >
            <FaUpload />
            <span>Enviar</span>
          </button>
          {mensagem && (
            <p className="text-green-600 font-semibold text-center mt-4">{mensagem}</p>
          )}
          {mensagemErro && (
            <p className="text-red-600 font-semibold text-center mt-4">{mensagemErro}</p>
          )}
        </form>
      </div>
    </motion.div>
  );
};

export default UploadRecursos;
