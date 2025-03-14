import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Logo from '../assets/Logo.png';

const CadastroProfessor = () => {
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [email, setEmail] = useState('');
  const [dataNascimento, setDataNascimento] = useState('');
  const [senha, setSenha] = useState('');
  const [disciplina, setDisciplina] = useState('');
  const [senhaConfirmacao, setSenhaConfirmacao] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleCadastro = async () => {
    setLoading(true);
    setErrorMessage('');

    // Validações
    if (senha !== senhaConfirmacao) {
      setErrorMessage('As senhas não coincidem.');
      setLoading(false);
      return;
    }
    if (!termsAccepted) {
      setErrorMessage('Você deve aceitar os termos e condições.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('https://a4e3-177-10-250-11.ngrok-free.app/backend/cadastro_professor.php', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome,
          usuario,
          email,
          data_nascimento: dataNascimento, 
          senha,
          disciplina,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setErrorMessage(result.message || 'Erro ao cadastrar. Tente novamente.');
      } else {
        // Armazenar o nome no localStorage
        localStorage.setItem('professorName', nome);
        setLoading(false);
        navigate('/professor'); // Redireciona para o Dashboard
      }
    } catch (error) {
      console.error('Erro ao cadastrar:', error);
      setErrorMessage('Erro ao conectar ao servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-900 font-poppins p-4 sm:p-8">
      <motion.div
        className="bg-white shadow-lg rounded-lg p-6 sm:p-8 w-full max-w-md text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <img src={Logo} alt="Logotipo do Site" className="mb-6 w-24 sm:w-32 mx-auto" />
        <h2 className="text-xl sm:text-2xl font-semibold mb-4 text-purple-900">Cadastro de Professor</h2>

        {/* Inputs */}
        <input 
          type="text" 
          placeholder="Nome" 
          value={nome} 
          onChange={(e) => setNome(e.target.value)} 
          className="border border-gray-300 p-2 rounded-lg w-full mb-3 sm:mb-4" 
        />
        <input 
          type="text" 
          placeholder="Usuário" 
          value={usuario} 
          onChange={(e) => setUsuario(e.target.value)} 
          className="border border-gray-300 p-2 rounded-lg w-full mb-3 sm:mb-4" 
        />
        <input 
          type="email" 
          placeholder="E-mail" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
          className="border border-gray-300 p-2 rounded-lg w-full mb-3 sm:mb-4" 
        />
        <input 
          type="date" 
          placeholder="Data de Nascimento" 
          value={dataNascimento} 
          onChange={(e) => setDataNascimento(e.target.value)} 
          className="border border-gray-300 p-2 rounded-lg w-full mb-3 sm:mb-4" 
        />
        <input 
          type="password" 
          placeholder="Senha" 
          value={senha} 
          onChange={(e) => setSenha(e.target.value)} 
          className="border border-gray-300 p-2 rounded-lg w-full mb-3 sm:mb-4" 
        />
        <input 
          type="password" 
          placeholder="Confirme a Senha" 
          value={senhaConfirmacao} 
          onChange={(e) => setSenhaConfirmacao(e.target.value)} 
          className="border border-gray-300 p-2 rounded-lg w-full mb-3 sm:mb-4" 
        />
        <input 
          type="text" 
          placeholder="Disciplina" 
          value={disciplina} 
          onChange={(e) => setDisciplina(e.target.value)} 
          className="border border-gray-300 p-2 rounded-lg w-full mb-3 sm:mb-4" 
        />

        <div className="flex items-center justify-start mb-3 sm:mb-4">
          <input 
            type="checkbox" 
            checked={termsAccepted} 
            onChange={() => setTermsAccepted(!termsAccepted)} 
            className="mr-2" 
          />
          <label className="text-sm sm:text-base">
            Aceito os <Link to="/termos" className="text-purple-600 underline">termos e condições</Link>
          </label>
        </div>

        {errorMessage && <p className="text-red-500 mb-2 text-sm sm:text-base">{errorMessage}</p>}

        <Link to="/professor" className="text-purple-600 mb-4 block text-sm sm:text-base hover:underline">
          Possui um cadastro? Faça Login
        </Link>

        <button 
          onClick={handleCadastro} 
          disabled={loading} 
          className={`flex items-center justify-center p-3 sm:p-4 ${loading ? 'bg-gray-400' : 'bg-purple-800'} text-white rounded-lg shadow-md transition hover:bg-purple-700 hover:shadow-lg w-full`}
        >
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </button>
      </motion.div>
    </div>
  );
};

export default CadastroProfessor;
