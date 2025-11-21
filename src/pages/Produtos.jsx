import React, { useState, useEffect } from 'react';
import { getProdutos, deleteProduto, updateProduto } from '../services/api'; 
import ProdutoForm from '../components/ProdutoForm';

export default function Produtos() {
  const [listaProdutos, setListaProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isCreating, setIsCreating] = useState(false); 
  const [editingProduto, setEditingProduto] = useState(null);

  async function carregarProdutos() {
    setLoading(true);
    setError(null);
    try {
      const produtos = await getProdutos(); 
      setListaProdutos(produtos);
    } catch (err) {
      setError("Não foi possível carregar os produtos. Verifique o servidor.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    carregarProdutos();
  }, []);

  const fecharModal = () => {
    setIsCreating(false);
    setEditingProduto(null);
  };

  const handleProdutoCreated = (novoProduto) => {
    setListaProdutos(prev => [...prev, novoProduto]);
    fecharModal(); 
  };

  const handleProdutoUpdated = (produtoAtualizado) => {
    setListaProdutos(prev => prev.map(produto => 
      produto.Id === produtoAtualizado.Id ? produtoAtualizado : produto
    ));
    fecharModal();
  };

  const deletarProduto = async (id) => {
    const confirmacao = window.confirm("Tem certeza que deseja excluir este produto?");
    
    if (!confirmacao) return;

    try {
      await deleteProduto(id);
      setListaProdutos(prevLista => prevLista.filter(produto => produto.Id !== id));
      setError(null);       
    } catch (err) {
      console.error(err);
      alert("Erro ao excluir o produto. Tente novamente.");
    }
  };

  const editarProduto = (produto) => {
    setEditingProduto(produto);
    setIsCreating(false);    
  };
  
  if (loading) {
    return <div className="p-8 text-center text-lg">Carregando produtos...</div>;
  }

  if (error) {
    return <div className="p-8 text-center text-red-600">Erro: {error}</div>;
  }

  return (
    <div className="pagina-produtos p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Lista de Produtos ({listaProdutos.length})</h1>
      
      <div className="mb-6">
        <button
          onClick={() => {
            setEditingProduto(null); 
            setIsCreating(true);
          }} 
          className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-200"
        >
          + Novo Produto
        </button>
      </div>

      {(isCreating || editingProduto) && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <ProdutoForm 
            produto={editingProduto}        
            onSuccess={editingProduto ? handleProdutoUpdated : handleProdutoCreated}         
            onCancel={fecharModal}
          />
        </div>
      )}

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Categoria</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Validade</th>
              <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {listaProdutos.map((produto) => (
              <tr key={produto.Id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{produto.Id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{produto.Nome}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{produto.Categoria}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{produto.DataValidade ? produto.DataValidade.substring(0, 10) : ''}</td>
                <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                  <button onClick={() => editarProduto(produto)} className="text-indigo-600 hover:text-indigo-900">Editar</button>
                  <button onClick={() => deletarProduto(produto.Id)} className="text-red-600 hover:text-red-900">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}