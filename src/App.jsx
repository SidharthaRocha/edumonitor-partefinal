import React, { useState, useEffect } from 'react';

import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import Blog from './pages/blogger';
import Sobre from './pages/sobre';
import AlunoProfessor from './pages/sistema-de-login';
import AlunoProfessor2 from './pages/sistema-de-login2';
import Informação from './pages/informação';
import Professor from './pages/Professor'
import Feedback from './pages/Professores/Feedback'
import CadastroProfessor from './pages/CadastroProfessor'
import Aluno from './pages/Aluno'
import Cadastro from './pages/CadastroAluno'
import Home from './index';
import Dashboardprofessor from './pages/Professores/DashboardProfessor';
import Dashboardaluno from './pages/Alunos/DashboardAluno';
import MeusAlunosProfessor  from './pages/Professores/MeusAlunos'
import DesempenhoProfessor from './pages/Professores/Desempenho';
import Enviarecursos from './pages/Professores/Recursos';
import NotificacoesProfessor from './pages/Professores/Notificações';
import CalendarioProfessor from './pages/Professores/Calendário';
import ConfiguracoesProfessor from './pages/Professores/Configurações';
import MeuDesempenhoAluno from './pages/Alunos/MeuDesempenho';
import MeuComportamentoAluno from './pages/Alunos/MeuComportamento';
import NotificacoesAluno from './pages/Alunos/Notificações';
import CalendarioAluno from './pages/Alunos/Calendário';
import RecursosAluno from './pages/Alunos/Recursos';
import Desenvolvimento from './components/Desenvolvimento_do_Seu_Filho';
import Graficoaluno from './pages/Alunos/GraficoDesempenho';
import Alunonotas from './pages/Alunos/AlunoNotas';
import Configuracaoaluno from './pages/Alunos/Configurações';


import 'animate.css';


const App = () => {
  const [theme, setTheme] = useState('light'); // Estado global para o tema

  // Carregar o tema do localStorage quando o componente for montado
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
      if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark'); // Ativa o modo escuro
      } else {
        document.documentElement.classList.remove('dark'); // Desativa o modo escuro
      }
    }
  }, []);

  // Função para alterar o tema globalmente
  const handleThemeChange = (newTheme) => {
    setTheme(newTheme); // Atualiza o estado do tema
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark'); // Ativa o modo escuro
    } else {
      document.documentElement.classList.remove('dark'); // Desativa o modo escuro
    }
    localStorage.setItem('theme', newTheme); // Salva a preferência no localStorage
  };

return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/aluno-professor" element={<AlunoProfessor />} />
        <Route path="/aluno-professor2" element={<AlunoProfessor2/>} />
        <Route path="/mais-informacoes" element={<Informação />} />
        <Route path="/professor" element={<Professor/>} />
        <Route path="/Cadastro-professor" element={<CadastroProfessor/>} />
        <Route path="/desenvolvimento" element={<Desenvolvimento/>} />
        <Route path="/aluno" element={<Aluno/>} />
        <Route path="/Cadastro-aluno" element={<Cadastro/>} />
        <Route path="/Dashboard-aluno" element={<Dashboardaluno/>} />
        <Route path="/Dashboard-professor" element={<Dashboardprofessor/>} />
        <Route path="/Meusalunos-professor" element={<MeusAlunosProfessor />} />
        <Route path="/desempenho-professor" element={<DesempenhoProfessor />} />
        <Route path="/notificacoes-professor" element={<NotificacoesProfessor />} />
        <Route path="/feedback-suggestion" element={<Feedback />} />
        <Route path="/calendario-professor" element={<CalendarioProfessor />} />
        <Route path="/configuracoes-professor" element={<ConfiguracoesProfessor />} />
        <Route path="/meudesempenho-aluno" element={<MeuDesempenhoAluno />} />
        <Route path="/meucomportamento-aluno" element={<MeuComportamentoAluno />} />
        <Route path="/notificacoes-aluno" element={<NotificacoesAluno />} />
        <Route path="/calendario-aluno" element={<CalendarioAluno />} />
        <Route path="/recursos-professor" element={<Enviarecursos />} />
        <Route path="/recursos-aluno" element={<RecursosAluno />} />
        <Route path="/configuracoes-aluno" element={<Configuracaoaluno />} />
        <Route path="/graficos-desempenho-aluno" element={<Graficoaluno/>} />
        <Route path="/notas-aluno" element={<Alunonotas/>} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
