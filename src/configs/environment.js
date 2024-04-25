export const SpotifyEnv = {
  baseUrl: import.meta.env.VITE_SPOTIFY_API_BASE_URL,
  authUrl: import.meta.env.VITE_SPOTIFY_API_AUTH_URL,
  clientId: import.meta.env.VITE_SPOTIFY_API_CLIENT_ID,
  clientSecret: import.meta.env.VITE_SPOTIFY_API_CLIENT_SECRET,
}

export const FirebaseEnv = {
  apiKey: import.meta.env.VITE_FB_API_KEY,
  authDomain: import.meta.env.VITE_FB_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FB_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FB_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FB_MESSAGE_SENDER_ID,
  appId: import.meta.env.VITE_FB_APP_ID,
  measurementId: import.meta.env.VITE_FB_MEASUREMENT_ID
}

export const checkEnvironment = () => {
  const SpotifyEnvSchema = {
    baseUrl: 'string',
    authUrl: 'string',
    clientId: 'string',
    clientSecret: 'string',
  };

  const FirebaseEnvSchema = {
    apiKey: 'string',
    authDomain: 'string',
    projectId: 'string',
    storageBucket: 'string',
    messagingSenderId: 'string',
    appId: 'string',
    measurementId: 'string',
  };

  for (const key in SpotifyEnvSchema) {
    if (SpotifyEnv.hasOwnProperty(key) && !SpotifyEnv[key]) {
      throw new Error(`${key} is not defined for Spotify`);
    }
  }
  
  for (const key in FirebaseEnvSchema) {
    if (FirebaseEnv.hasOwnProperty(key) && !FirebaseEnv[key]) {
      throw new Error(`${key} is not defined for Firebase`);
    }
  }
}