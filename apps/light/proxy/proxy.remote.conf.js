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
        'ZBW_SESSID=013bd7e726d688a2572381bb31c841505c44422984;ZWAYSession=8985f2a9-6ca3-f24a-951b-0f180525e0c0',
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
        'ZBW_SESSID=013bd7e726d688a2572381bb31c841505c44422984;ZWAYSession=8985f2a9-6ca3-f24a-951b-0f180525e0c0',
    },
    pathRewrite: { '^/ws': '/' },
    secure: false,
    logLevel: 'debug',
    changeOrigin: true,
  },
];

module.exports = PROXY_CONFIG;
