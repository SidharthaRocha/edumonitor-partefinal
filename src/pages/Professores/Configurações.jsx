import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import { motion } from 'framer-motion';

const ConfiguracoesProfessor = () => {
  const [activeTab, setActiveTab] = useState('perfil');
  const [userInfo, setUserInfo] = useState({
    nome: 'João Silva',
    email: 'joao.silva@example.com',
    senha: '',
  });
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    sms: false,
  });
  const [loading, setLoading] = useState(false); // Estado para controle de carregamento
  const navigate = useNavigate();

  const pageVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: 'easeOut' } },
  };

  const handleSaveProfile = async () => {
    if (!userInfo.nome || !userInfo.email || !userInfo.senha) {
      alert('Por favor, preencha todos os campos!');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userInfo.email)) {
      alert('Por favor, insira um email válido!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('http://localhost/backend/atualizar_perfil.php', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Informações atualizadas com sucesso!');
      } else {
        alert(result.message || 'Erro ao atualizar perfil.');
      }
    } catch (error) {
      alert('Erro na conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveNotifications = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://4e03-177-10-253-154.ngrok-free.app/backend/obter_perfil.php', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(notificationSettings),
      });

      const result = await response.json();
      if (response.ok) {
        alert('Configurações de notificações salvas!');
      } else {
        alert(result.message || 'Erro ao salvar configurações de notificações.');
      }
    } catch (error) {
      alert('Erro na conexão com o servidor.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="min-h-screen bg-gray-100 font-poppins p-6"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="mb-4">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center px-4 py-2 bg-gray-200 rounded-lg text-indigo-600 hover:bg-gray-300 hover:text-indigo-800 transition duration-200"
        >
          <FaArrowLeft className="mr-2" />
          Voltar
        </button>
      </div>

      <h1 className="text-3xl font-bold text-indigo-800 mb-6">Configurações</h1>

      <div className="flex space-x-6 border-b border-gray-300 pb-2">
        <button
          onClick={() => setActiveTab('perfil')}
          className={`text-lg font-semibold ${
            activeTab === 'perfil'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500 hover:text-indigo-600'
          }`}
        >
          Editar Perfil
        </button>
        <button
          onClick={() => setActiveTab('notificacoes')}
          className={`text-lg font-semibold ${
            activeTab === 'notificacoes'
              ? 'text-indigo-600 border-b-2 border-indigo-600'
              : 'text-gray-500 hover:text-indigo-600'
          }`}
        >
          Configurar Notificações
        </button>
      </div>

      <div className="mt-6">
        {activeTab === 'perfil' && (
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-xl font-semibold text-indigo-800 mb-4">Editar Perfil</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-gray-700">Nome</label>
                <input
                  type="text"
                  value={userInfo.nome}
                  onChange={(e) => setUserInfo({ ...userInfo, nome: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={userInfo.email}
                  onChange={(e) => setUserInfo({ ...userInfo, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <div>
                <label className="block text-gray-700">Senha</label>
                <input
                  type="password"
                  value={userInfo.senha}
                  onChange={(e) => setUserInfo({ ...userInfo, senha: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg p-2"
                />
              </div>
              <button
                onClick={handleSaveProfile}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                disabled={loading}
              >
                {loading ? 'Salvando...' : 'Salvar Alterações'}
              </button>
            </div>
          </motion.div>
        )}

        {activeTab === 'notificacoes' && (
          <motion.div
            className="bg-white p-6 rounded-lg shadow-md"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
          >
            <h2 className="text-xl font-semibold text-indigo-800 mb-4">Configurar Notificações</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={notificationSettings.email}
                  onChange={() =>
                    setNotificationSettings((prev) => ({ ...prev, email: !prev.email }))
                  }
                  className="w-4 h-4"
                />
                <label className="text-gray-700">Receber notificações por email</label>
              </div>
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={notificationSettings.sms}
                  onChange={() =>
                    setNotificationSettings((prev) => ({ ...prev, sms: !prev.sms }))
                  }
                  className="w-4 h-4"
                />
                <label className="text-gray-700">Receber notificações por SMS</label>
              </div>
              <button
                onClick={handleSaveNotifications}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700"
                disabled={loading}
              >
                {loading ? 'Salvando...' : 'Salvar Configurações'}
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ConfiguracoesProfessor;
