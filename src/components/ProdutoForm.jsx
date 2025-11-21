import React, { useState } from 'react';
import { postProduto } from '../services/api'; 

export default function ProdutoForm({ onSuccess, onCancel }) {
  const [formData, setFormData] = useState({
    Nome: '',
    Categoria: '',
    DataValidade: '', 
  });
  const [statusMessage, setStatusMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage({ text: 'Salvando produto...', type: 'info' });

    const produtoParaEnviar = {
      Nome: formData.Nome,
      Categoria: formData.Categoria,
      DataValidade: formData.DataValidade, 
    };
    
    try {
      const produtoCriado = await postProduto(produtoParaEnviar);
      
      setStatusMessage({ text: `Produto "${produtoCriado.Nome}" criado com sucesso!`, type: 'success' });
      setFormData({ Nome: '', Categoria: '', DataValidade: '' });

      if (onSuccess) {
        onSuccess(produtoCriado); 
      }
      
      setTimeout(onCancel, 2000); 

    } catch (error) {
      console.error('Erro no formulário:', error);
      setStatusMessage({ text: `Erro ao criar: ${error.message}`, type: 'error' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">Cadastrar Novo Produto</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="Nome" className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            id="Nome"
            name="Nome"
            value={formData.Nome}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="Categoria" className="block text-sm font-medium text-gray-700">Categoria</label>
          <input
            type="text"
            id="Categoria"
            name="Categoria"
            value={formData.Categoria}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label htmlFor="DataValidade" className="block text-sm font-medium text-gray-700">Data Validade</label>
          <input
            type="date"
            id="DataValidade"
            name="DataValidade"
            value={formData.DataValidade}
            onChange={handleChange}
            required
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 transition duration-150"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className={`px-4 py-2 text-sm font-medium text-white rounded-md transition duration-150 ${
              isSubmitting 
                ? 'bg-gray-400 cursor-not-allowed' 
                : 'bg-green-600 hover:bg-green-700 shadow-md'
            }`}
          >
            {isSubmitting ? 'Salvando...' : 'Criar Produto'}
          </button>
        </div>
      </form>

      {statusMessage.text && (
        <div 
          className={`mt-4 p-3 rounded-md text-sm ${
            statusMessage.type === 'error' 
              ? 'bg-red-100 text-red-700' 
              : statusMessage.type === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-blue-100 text-blue-700'
          }`}
        >
          {statusMessage.text}
        </div>
      )}
    </div>
  );
}