import React, { useState, useEffect } from 'react';
import { postProduto, updateProduto } from '../services/api';

export default function ProdutoForm({ produto, onSuccess, onCancel }) {
  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [dataValidade, setDataValidade] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (produto) {
      setNome(produto.Nome || '');
      setCategoria(produto.Categoria || '');
      
      if (produto.DataValidade) {
        setDataValidade(produto.DataValidade.substring(0, 10));
      }
    } else {
      setNome('');
      setCategoria('');
      setDataValidade('');
    }
  }, [produto]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      Nome: nome,
      Categoria: categoria,
      DataValidade: new Date(dataValidade).toISOString() 
    };

    try {
      let resultado;

      if (produto && produto.Id) {
        resultado = await updateProduto(produto.Id, payload);
      } else {
        resultado = await postProduto(payload);
      }

      onSuccess(resultado);
      
    } catch (err) {
      console.error(err);
      setError("Erro ao salvar o produto. Verifique os dados.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        {produto ? 'Editar Produto' : 'Novo Produto'}
      </h2>

      {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            required
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Categoria</label>
          <input
            type="text"
            required
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Validade</label>
          <input
            type="date"
            required
            value={dataValidade}
            onChange={(e) => setDataValidade(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            disabled={loading}
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md disabled:bg-blue-300"
          >
            {loading ? 'Salvando...' : (produto ? 'Salvar Alterações' : 'Criar Produto')}
          </button>
        </div>
      </form>
    </div>
  );
}