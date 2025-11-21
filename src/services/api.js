const API_BASE_URL = 'http://127.0.0.1:8000';

export const getProdutos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/produtos/`, {
      method: 'GET',
      headers: {
        'accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Erro ao buscar produtos. Código: ' + response.status);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Falha na requisição de produtos:", error);
    return []; 
  }
};

export const postProduto = async (novoProduto) => {
  try {
    const response = await fetch(`${API_BASE_URL}/produtos/`, {
      method: 'POST',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(novoProduto), 
    });

    if (response.status === 201 || response.status === 200) {
      const data = await response.json();
      return data;
    } else {
      const errorText = await response.text();
      console.error(`Erro ao criar produto. Status: ${response.status}`, errorText);
      throw new Error(`Erro ao criar produto: ${response.status} - ${errorText}`);
    }  
  } catch (error) {
    console.error("Falha na requisição POST de produtos:", error);
    throw error;
  }
};

export const deleteProduto = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/produtos/${id}`, {
      method: 'DELETE',
      headers: {
        'accept': 'application/json',
      },
    });

    if (response.status === 204) {
      return true;
    }

    if (!response.ok) {
      throw new Error('Erro ao deletar produto. Código: ' + response.status);
    }

    return await response.json();
  } catch (error) {
    console.error("Falha na requisição DELETE:", error);
    throw error;
  }
};

export const updateProduto = async (id, produtoAtualizado) => {
  try {
    const response = await fetch(`${API_BASE_URL}/produtos/${id}`, {
      method: 'PUT',
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(produtoAtualizado),
    });

    if (response.ok) {
      return await response.json();
    } else {
      const errorText = await response.text();
      throw new Error(`Erro ao atualizar: ${response.status} - ${errorText}`);
    }
  } catch (error) {
    console.error("Falha na requisição PUT:", error);
    throw error;
  }
};