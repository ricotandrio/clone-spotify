import { SpotifyService } from "@apis/services/spotify.service";

export class SpotifyController {
  static getSpotifyToken = async () => {
    try {
      const response = await SpotifyService.getSpotifyToken();

      console.log("controller, getSpotifyToken", response);
      return response;
  
    } catch (e) {

      return e.message;
    }
  }

  static getArtistById = async (token, id) => {
    try {
      const response = await SpotifyService.getArtistById(token, id);
      return response;
    } catch (e) {
      return e.message;
    }
  }

  static getAlbumByArtist = async (token, id) => {
    try {
      const response = await SpotifyService.getAlbumByArtist(token, id);
      return response;
    } catch (e) {
      return e.message;
    }
  }

  static getPlaylistById = async (token, id) => {
    try {
      const response = await SpotifyService.getPlaylistById(token, id);
      return response;
    } catch (e) {
      return e.message;
    }
  }

  static getFeaturedPlaylists = async (token, id) => {
    try {
      console.log("in");
      const response = await SpotifyService.getFeaturedPlaylists(token, id);
      console.log(response);
      return response;

    } catch (e) {
      return e.message;
    }
  }
  
  static search = async (token, query) => {
    try {
      const response = await SpotifyService.search(token, query);
      return response;
    } catch (e) {
      return e.message;
    }
  }

}