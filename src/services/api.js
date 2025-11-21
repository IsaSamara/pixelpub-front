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