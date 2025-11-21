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
    return <div className="produtos-container" style={{textAlign: 'center'}}>Carregando produtos...</div>;
  }

  if (error) {
    return <div className="produtos-container" style={{color: 'red', textAlign: 'center'}}>Erro: {error}</div>;
  }

  return (
    <div className="produtos-container">
      {/* Cabeçalho com Título e Botão alinhados */}
      <div className="produtos-header">
        <h1>Lista de Produtos ({listaProdutos.length})</h1>
        
        <button
          onClick={() => {
            setEditingProduto(null); 
            setIsCreating(true);
          }} 
          className="btn-novo-produto"
        >
          + Novo Produto
        </button>
      </div>

      {/* Modal / Overlay */}
      {(isCreating || editingProduto) && (
        <div className="modal-overlay">
          {/* Envolvemos o form no modal-card para pegar o estilo bege */}
          <div className="modal-card">
            <ProdutoForm 
              produto={editingProduto}        
              onSuccess={editingProduto ? handleProdutoUpdated : handleProdutoCreated}          
              onCancel={fecharModal}
            />
          </div>
        </div>
      )}

      {/* Tabela Estilizada */}
      <div className="produtos-table-wrapper">
        <table className="produtos-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Validade</th>
              <th style={{textAlign: 'center'}}>Ações</th>
            </tr>
          </thead>
          <tbody>
            {listaProdutos.map((produto) => (
              <tr key={produto.Id}>
                <td>{produto.Id}</td>
                <td>{produto.Nome}</td>
                <td>{produto.Categoria}</td>
                <td>{produto.DataValidade ? produto.DataValidade.substring(0, 10) : ''}</td>
                <td style={{textAlign: 'center'}}>
                  <button onClick={() => editarProduto(produto)} className="btn-acao btn-editar">Editar</button>
                  <button onClick={() => deletarProduto(produto.Id)} className="btn-acao btn-excluir">Excluir</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}