const PROXY_CONFIG = [
  {
    context: (pathname, req) => /^\/Z/.test(pathname),
    target: {
      host: 'find.z-wave.me',
      protocol: 'https:',
      port: 443,
    },
    withCredentials: true,
    headers: { Cookie: 'ZBW_SESSID=013bd7e726d688a2572381bb31c841505c44422984;ZWAYSession=4c4fa363-038c-1004-5977-d8f498870d76' },
    secure: true,
    logLevel: 'debug',
    changeOrigin: true,
  },
  {
    context:  (pathname, req) => /^\/ws/.test(pathname),
    target: {
      host: 'find.z-wave.me',
      protocol: 'wss:',
      port: 443,
    },
    ws: true,
    withCredentials: true,
    headers: { Cookie: 'ZBW_SESSID=013bd7e726d688a2572381bb31c841505c44422984;ZWAYSession=4c4fa363-038c-1004-5977-d8f498870d76' },
    secure: true,
    logLevel: 'debug',
    changeOrigin: true,
  }
];

module.exports = PROXY_CONFIG;
