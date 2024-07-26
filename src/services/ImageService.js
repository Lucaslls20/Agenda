export const fetchCommercialImage = async () => {
  try {
    const response = await fetch('https://api.unsplash.com/photos/random?client_id=TUzNWzRQV9-8AKdFutigMBoB82cnH4KQcTWmib1n4wE', {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    if (!response.ok) {
      throw new Error(`Erro na resposta da API: ${response.statusText}`);
    }

    const responseText = await response.text();
    console.log('Resposta bruta da API:', responseText);
    
    try {
      const data = JSON.parse(responseText);
      return data.urls.regular || 'https://cdn.pixabay.com/photo/2017/03/20/10/50/books-2158737_1280.jpg';
    } catch (jsonError) {
      console.error('Erro ao converter resposta para JSON:', jsonError);
      return 'https://cdn.pixabay.com/photo/2017/03/20/10/50/books-2158737_1280.jpg';
    }
  } catch (error) {
    console.error('Erro ao buscar imagem comercial:', error);
    return 'https://cdn.pixabay.com/photo/2017/03/20/10/50/books-2158737_1280.jpg';
  }
};

