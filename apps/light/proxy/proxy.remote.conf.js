const PROXY_CONFIG = [
  {
    context: (pathname, req) => /^\/Z/.test(pathname),
    target: {
      host: '192.168.31.64',
      protocol: 'http:',
      port: 8083,
    },
    withCredentials: true,
    headers: {
      Cookie:
        'ZBW_SESSID=013bd7e726d688a2572381bb31c841505c44422984;ZWAYSession=c1f15678-6789-be01-5505-6887658c770d',
    },
    secure: false,
    logLevel: 'debug',
    changeOrigin: true,
  },
  {
    context: (pathname, req) => /^\/ws/.test(pathname),
    target: {
      host: '192.168.31.64',
      protocol: 'ws:',
      port: 8083,
    },
    ws: true,
    withCredentials: true,
    headers: {
      Cookie:
        'ZBW_SESSID=013bd7e726d688a2572381bb31c841505c44422984;ZWAYSession=c1f15678-6789-be01-5505-6887658c770d',
    },
    pathRewrite: { '^/ws': '/' },
    secure: false,
    logLevel: 'debug',
    changeOrigin: true,
  },
];

module.exports = PROXY_CONFIG;
