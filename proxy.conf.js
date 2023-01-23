const { env } = require('process');

const target = env.ASPNETCORE_HTTPS_PORT ? `https://localhost:${env.ASPNETCORE_HTTPS_PORT}` :
  env.ASPNETCORE_URLS ? env.ASPNETCORE_URLS.split(';')[0] : 'http://localhost:40737';

const PROXY_CONFIG = [
  {
    context: [
      "/api/Bookings",
      "/api/Rooms",
      "/api/RoomTypes/list",
      "/api/RoomTypes",
      "/api/authorization/login",
      "/api/authorization",
      "/_configuration",
      "/.well-known",
      "/favicon.png",
      "/Identity",
      "/connect",
      "/ApplyDatabaseMigrations",
      "/_framework"
   ],
    target: target,
    secure: false,
    headers: {
      Connection: 'Keep-Alive'
    }
  }
]

module.exports = PROXY_CONFIG;
