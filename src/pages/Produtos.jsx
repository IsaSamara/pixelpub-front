import React, { useState, useEffect } from 'react';
import { getProdutos } from '../services/api'; 

export default function Produtos() {
  const [listaProdutos, setListaProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
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
    carregarProdutos();
  }, []);

  if (loading) {
    return <div>Carregando produtos...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Erro: {error}</div>;
  }

  return (
    <div className="pagina-produtos">
      <h1>⭐ Lista de Produtos ({listaProdutos.length})</h1>
      <button>+ Novo Produto</button>
      
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Data Validade</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {listaProdutos.map((produto) => (
            <tr key={produto.Id}>
              <td>{produto.Id}</td>
              <td>{produto.Nome}</td>
              <td>{produto.Categoria}</td>
              <td>{produto.DataValidade.substring(0, 10)}</td> 
              <td>
                <button>Editar</button>
                <button>Excluir</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}