export const CONFIG = {
  API_URL: import.meta.env.VITE_API_BASE_URL,
  ENV: import.meta.env.VITE_ENVIRONMENT,

  ENDPOINTS: {
    USUARIOS: "/usuarios_chat.php",
    MENSAJES: "/mensajes.php",
    USUARIOS_GRUPOS: "/usuarios_grupo.php",
    GRUPOS: "/grupo_chat.php",
  },

  VERSION: "1.0.0",
};
