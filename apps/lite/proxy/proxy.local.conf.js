const PROXY_CONFIG = [
  {
    context: (pathname, req) => /^\/Z/.test(pathname),
    target: {
      host: 'localhost',
      protocol: 'http:',
      port: 8083,
    },
    withCredentials: true,
    secure: true,
    logLevel: 'debug',
    changeOrigin: true,
  },
];

module.exports = PROXY_CONFIG;
