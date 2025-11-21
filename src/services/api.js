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

