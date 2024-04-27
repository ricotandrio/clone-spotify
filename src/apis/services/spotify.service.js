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

  static getNextSong = async (token, id) => {
    const getTracks = await fetch(`${SpotifyEnv.baseUrl}/tracks/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const parsedGetTracks = await getTracks.json();
    // console.log(parsedGetTracks);
    if (getTracks.status !== 200) {
      throw new ResponseError(getTracks.status, getTracks.message);
    }

    const getAlbums = await fetch(parsedGetTracks.album.href, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const parsedGetAlbums = await getAlbums.json();
    // console.log(parsedGetAlbums);

    if (getAlbums.status !== 200) {
      throw new ResponseError(getAlbums.status, getAlbums.message);
    }

    const index =
      (parsedGetTracks.track_number + 1) % parsedGetAlbums.total_tracks;

    // console.log("before");
    // console.log(parsedGetAlbums.tracks.items[parsedGetTracks.track_number]);
    // console.log("after");
    // console.log(parsedGetAlbums.tracks.items[index]);

    return {
      ...parsedGetAlbums.tracks.items[index],
      images: [
        {
          url: parsedGetAlbums.images[0].url,
        },
      ],
    };
  };

  static getPrevSong = async (token, id) => {
    const getTracks = await fetch(`${SpotifyEnv.baseUrl}/tracks/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const parsedGetTracks = await getTracks.json();
    // console.log(parsedGetTracks);
    if (getTracks.status !== 200) {
      throw new ResponseError(getTracks.status, getTracks.message);
    }

    const getAlbums = await fetch(parsedGetTracks.album.href, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const parsedGetAlbums = await getAlbums.json();
    // console.log(parsedGetAlbums);

    if (getAlbums.status !== 200) {
      throw new ResponseError(getAlbums.status, getAlbums.message);
    }

    if (parsedGetTracks.track_number - 2 < 0) {
      // console.log(parsedGetAlbums.total_tracks - 1);
      return {
        ...parsedGetAlbums.tracks.items[parsedGetAlbums.total_tracks - 1],
        images: [
          {
            url: parsedGetAlbums.images[0].url,
          },
        ],
      };
    }

    // console.log("before");
    // console.log(parsedGetAlbums.tracks.items[(parsedGetTracks.track_number - 1)]);
    // console.log("after");
    // console.log(parsedGetAlbums.tracks.items[(parsedGetTracks.track_number - 2)]);

    return {
      ...parsedGetAlbums.tracks.items[parsedGetTracks.track_number - 2],
      images: [
        {
          url: parsedGetAlbums.images[0].url,
        },
      ],
    };
  };
}
