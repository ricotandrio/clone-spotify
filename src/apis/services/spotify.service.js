import { ResponseError } from "@src/apis/errors/ResponseError";
import { SpotifyEnv } from "@src/configs/environment";

export class SpotifyService {
  static getSpotifyToken = async () => {
    const response = await fetch(SpotifyEnv.authUrl, {
      method: "POST",
      headers: {
        Authorization:
          "Basic " + btoa(SpotifyEnv.clientId + ":" + SpotifyEnv.clientSecret),
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: "grant_type=client_credentials",
    });

    if (response.status != 200) {
      throw new ResponseError(response.status, response.message);
    }

    return response.json();
  };

  static getArtistById = async (token, id) => {
    const response = await fetch(`${SpotifyEnv.baseUrl}/artists/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new ResponseError(response.status, response.message);
    }

    return response.json();
  };

  static getAlbumByArtist = async (token, id) => {
    const response = await fetch(`${SpotifyEnv.baseUrl}/artists/${id}/albums`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status !== 200) {
      throw new ResponseError(response.status, response.message);
    }

    return response.json();
  };

  static getPlaylistById = async (stateLocation, playlistId, token) => {
    const response = await fetch(
      `${SpotifyEnv.baseUrl}/${stateLocation}/${playlistId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status != 200) {
      throw new ResponseError(response.status, response.message);
    }

    return response.json();
  };

  static getFeaturedPlaylists = async (token) => {
    const response = await fetch(
      `${SpotifyEnv.baseUrl}/browse/featured-playlists`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status != 200) {
      throw new ResponseError(response.status, response.message);
    }

    return response.json();
  };

  static search = async (token, query) => {
    const response = await fetch(
      `${SpotifyEnv.baseUrl}/search?q=${encodeURIComponent(query)}&type=track&limit=20`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    if (response.status !== 200) {
      throw new ResponseError(response.status, response.message);
    }

    return response.json();
  };
}
