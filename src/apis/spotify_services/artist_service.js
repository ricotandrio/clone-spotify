export const getArtistService = async (token, id) => {
  try {
    const response = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if(response.status !== 200) {
      throw new Error(response.message);
    }

    return response.json();
  } catch(e) {
    console.error(e);
    return null;
  } 
}