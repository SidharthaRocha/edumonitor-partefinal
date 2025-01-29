import React, { useState } from "react";
import { FaTrash, FaUserCheck, FaEdit, FaArrowLeft, FaTimes, FaCheck } from "react-icons/fa";
import { Link } from "react-router-dom";
import 'animate.css';  // Importando o Animate.css

const alunosData = [
  { id: 1, nome: "João Silva", email: "joao@gmail.com", dataNascimento: "1990-05-15", foto: "https://i.pravatar.cc/150?img=1", verificado: false },
  { id: 2, nome: "Maria Oliveira", email: "maria@gmail.com", dataNascimento: "1995-10-20", foto: "https://i.pravatar.cc/150?img=2", verificado: false },
];

export default function AlunosList() {
  const [alunos, setAlunos] = useState(alunosData);
  const [showForm, setShowForm] = useState(false);
  const [newAluno, setNewAluno] = useState({ nome: "", email: "", dataNascimento: "", foto: "", verificado: false });
  const [editingAluno, setEditingAluno] = useState(null);
  const [search, setSearch] = useState("");

  const handleDeleteAluno = (id) => {
    setAlunos(alunos.filter((aluno) => aluno.id !== id));
  };

  const handleAddAlunoClick = () => setShowForm(true);

  const handleAddAlunoSubmit = () => {
    setAlunos([...alunos, { ...newAluno, id: alunos.length + 1 }]);
    setNewAluno({ nome: "", email: "", dataNascimento: "", foto: "", verificado: false });
    setShowForm(false);
  };

  const handleEditAluno = (aluno) => {
    setEditingAluno(aluno);
    setNewAluno(aluno);
    setShowForm(true);
  };

  const handleUpdateAluno = () => {
    setAlunos(alunos.map((aluno) => (aluno.id === editingAluno.id ? newAluno : aluno)));
    setNewAluno({ nome: "", email: "", dataNascimento: "", foto: "", verificado: false });
    setEditingAluno(null);
    setShowForm(false);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "foto" && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        const fotoBase64 = reader.result;
        setNewAluno({ ...newAluno, foto: fotoBase64 });
      };
      reader.readAsDataURL(files[0]);
    } else {
      setNewAluno({ ...newAluno, [name]: value });
    }
  };

  // Função para marcar/desmarcar aluno como verificado
  const toggleVerificado = (id) => {
    setAlunos(alunos.map((aluno) =>
      aluno.id === id ? { ...aluno, verificado: !aluno.verificado } : aluno
    ));
  };

  const filteredAlunos = alunos.filter((aluno) =>
    aluno.nome.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-8 bg-gradient-to-br from-gray-100 via-gray-200 to-blue-300 min-h-screen flex flex-col items-center">
      <div className="w-full fixed top-0 left-0 z-10 bg-white shadow-lg px-8 py-4 rounded-b-lg animate__animated animate__fadeIn">
        <div className="flex justify-between items-center max-w-7xl mx-auto">
          <Link
            to="/Dashboard-professor"
            className="flex items-center text-white bg-teal-700 hover:bg-teal-800 px-6 py-3 rounded-full shadow-md transform hover:scale-105 transition-all"
          >
            <FaArrowLeft className="mr-2" />
            Voltar
          </Link>
          <h1 className="text-4xl font-bold text-gray-800 text-center flex-grow">
            Lista de Alunos
          </h1>
          <button
            onClick={handleAddAlunoClick}
            className="bg-teal-600 text-white px-6 py-3 rounded-full hover:bg-teal-700 transition-all transform hover:scale-105"
          >
            Adicionar Aluno
          </button>
        </div>
      </div>

      <div className="mt-24 w-full max-w-7xl mx-auto animate__animated animate__fadeIn">
        <div className="mb-6 flex justify-between items-center">
          <input
            type="text"
            placeholder="Buscar aluno"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-80 md:w-96 lg:w-full border-2 border-teal-400 rounded-lg p-4 mb-6 focus:ring-teal-500 focus:outline-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAlunos.map((aluno) => (
            <div
              key={aluno.id}
              className="bg-gradient-to-r from-white via-teal-50 to-blue-100 p-6 rounded-xl shadow-lg hover:shadow-2xl transform hover:-translate-y-2 hover:scale-105 transition-all duration-300 ease-in-out border border-teal-300 animate__animated animate__fadeIn"
            >
              <div className="flex items-center mb-4">
                <img
                  src={aluno.foto || "https://via.placeholder.com/150"}
                  alt={aluno.nome}
                  className="w-20 h-20 rounded-full object-cover border-4 border-teal-500 shadow-md"
                />
                <h3 className="ml-4 text-3xl font-bold text-teal-800">{aluno.nome}</h3>
              </div>
              <p className="text-gray-700 mb-1">
                <span className="font-semibold">E-mail:</span> {aluno.email}
              </p>
              <p className="text-gray-700 mb-4">
                <span className="font-semibold">Data de Nascimento:</span> {aluno.dataNascimento}
              </p>
              <div className="flex justify-around">
                <button
                  onClick={() => handleDeleteAluno(aluno.id)}
                  className="text-red-600 bg-red-100 hover:bg-red-200 px-4 py-2 rounded-full shadow-sm transform hover:scale-110 transition"
                >
                  <FaTrash size={18} />
                </button>
                <button
                  onClick={() => toggleVerificado(aluno.id)}
                  className={`${
                    aluno.verificado ? "text-green-600 bg-green-100" : "text-gray-600 bg-gray-100"
                  } hover:bg-green-200 px-4 py-2 rounded-full shadow-sm transform hover:scale-110 transition`}
                >
                  <FaUserCheck size={18} />
                </button>
                <button
                  onClick={() => handleEditAluno(aluno)}
                  className="text-blue-600 bg-blue-100 hover:bg-blue-200 px-4 py-2 rounded-full shadow-sm transform hover:scale-110 transition"
                >
                  <FaEdit size={18} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-75 flex items-center justify-center animate__animated animate__fadeIn">
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-sm w-full relative">
            <button
              onClick={() => {
                setShowForm(false);
                setEditingAluno(null);
                setNewAluno({ nome: "", email: "", dataNascimento: "", foto: "", verificado: false });
              }}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 text-xl"
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-semibold mb-6 text-teal-600 text-center">
              {editingAluno ? "Editar Aluno" : "Adicionar Novo Aluno"}
            </h2>
            <input
              type="text"
              name="nome"
              value={newAluno.nome}
              onChange={handleInputChange}
              placeholder="Nome"
              className="w-full border-2 rounded-lg p-4 mb-4 focus:ring-teal-500 focus:outline-none"
            />
            <input
              type="email"
              name="email"
              value={newAluno.email}
              onChange={handleInputChange}
              placeholder="E-mail"
              className="w-full border-2 rounded-lg p-4 mb-4 focus:ring-teal-500 focus:outline-none"
            />
            <input
              type="date"
              name="dataNascimento"
              value={newAluno.dataNascimento}
              onChange={handleInputChange}
              className="w-full border-2 rounded-lg p-4 mb-4 focus:ring-teal-500 focus:outline-none"
            />
            <input
              type="file"
              name="foto"
              onChange={handleInputChange}
              className="w-full mb-4"
            />
            <button
              onClick={editingAluno ? handleUpdateAluno : handleAddAlunoSubmit}
              className="w-full bg-teal-700 text-white px-4 py-3 rounded-lg hover:bg-teal-800 transition-all"
            >
              {editingAluno ? "Atualizar Aluno" : "Adicionar Aluno"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}