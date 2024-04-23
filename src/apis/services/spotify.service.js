import { ResponseError } from "@apis/errors/ResponseError";
import { SpotifyApi } from "@configs/api";

export class SpotifyService {

  static getSpotifyToken = async () => {
    try {
      const response = await fetch(SpotifyApi.authUrl, {
        method: 'POST',
        headers: {
          'Authorization': 'Basic ' + btoa(SpotifyApi.clientId + ':' + SpotifyApi.clientSecret),
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
      const response = await fetch(`${SpotifyApi.baseUrl}/artists/${id}`, {
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
      const response = await fetch(`${SpotifyApi.baseUrl}/artists/${id}/albums`, {
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
      const response = await fetch(`${SpotifyApi.baseUrl}/${stateLocation}/${playlistId}`, {
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
      const response = await fetch(`${SpotifyApi.baseUrl}/browse/featured-playlists`, {
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
      const response = await fetch(`${SpotifyApi.baseUrl}/search?q=${encodeURIComponent(query)}&type=track&limit=20`, {
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