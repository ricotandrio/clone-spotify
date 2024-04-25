import { ResponseError } from "@apis/errors/ResponseError";
import { SpotifyEnv } from "@configs/environment";

export class SpotifyService {

  static getSpotifyToken = async () => {
    try {
      const response = await fetch(SpotifyEnv.authUrl, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(SpotifyEnv.clientId + ':' + SpotifyEnv.clientSecret),
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: 'grant_type=client_credentials',
      });

      if(response.status != 200){
        throw new ResponseError(response.status, response.message);
      }
      
      return response.json();
    
    } catch (e) {
  
      console.error(`Error ${e.code}: ${e.message}`);
      return {
        code: e.code,
        message: e.message
      };
    }
  }

  static getArtistById = async (token, id) => {
  
    try {
      const response = await fetch(`${SpotifyEnv.baseUrl}/artists/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if(response.status !== 200) {
        throw new ResponseError(response.status, response.message);
      }
  
      return response.json();
    } catch(e) {
      console.error(`Error ${e.code}: ${e.message}`);
      return e.message;
    } 
  }

  static getAlbumByArtist = async (token, id) => {
  
    try {
      const response = await fetch(`${SpotifyEnv.baseUrl}/artists/${id}/albums`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if(response.status !== 200) {
        throw new ResponseError(response.status, response.message);
      }
  
      return response.json();
    } catch(e) {
  
      console.error(`Error ${e.code}: ${e.message}`);
      return {
        code: e.code,
        message: e.message
      };
    }
  }

  static getPlaylistById = async (stateLocation, playlistId, token) => {
  
    try {
      const response = await fetch(`${SpotifyEnv.baseUrl}/${stateLocation}/${playlistId}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if(response.status != 200){
        throw new ResponseError(response.status, response.message);
      }
  
      return response.json();
    } catch (e) {
  
      console.error(`Error ${e.code}: ${e.message}`);
      return {
        code: e.code,
        message: e.message
      };
    }
  }

  static getFeaturedPlaylists = async (token) => {

    try {
      const response = await fetch(`${SpotifyEnv.baseUrl}/browse/featured-playlists`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if(response.status != 200){
        throw new ResponseError(response.status, response.message);
      }

      return response.json();
    } catch (e) {
      console.error(`Error ${e.code}: ${e.message}`);
      return {
        code: e.code,
        message: e.message
      };
    }
  }

  static search = async (token, query) => {
    
    try {
      const response = await fetch(`${SpotifyEnv.baseUrl}/search?q=${encodeURIComponent(query)}&type=track&limit=20`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
  
      if(response.status !== 200) {
        throw new ResponseError(response.status, response.message);
      }
  
      return response.json();
    } catch(e) {
      console.error(`Error ${e.code}: ${e.message}`);
      return {
        code: e.code,
        message: e.message
      };
    }
  }
}