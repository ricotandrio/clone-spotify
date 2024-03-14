export const getTokenService = async () => { 
  const CLIENT_ID = import.meta.env.VITE_SP_CLIENT_ID,
        CLIENT_SECRET = import.meta.env.VITE_SP_CLIENT_SECRET,
        TOKEN_API_URL = import.meta.env.VITE_SP_TOKEN_SRC;

  try {
    const response = await fetch(TOKEN_API_URL, {
      method: 'POST',
      headers: {
        'Authorization': 'Basic ' + btoa(CLIENT_ID + ':' + CLIENT_SECRET),
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: 'grant_type=client_credentials',
    });
    
    if(response.status != 200){
      throw new Error(response.message);
    }

    return response.json();
  
  } catch (e) {

    console.error(e);
    return null;
  }
}

