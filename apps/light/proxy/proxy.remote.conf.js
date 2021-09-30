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
        'ZBW_SESSID=013bd7e726d688a2572381bb31c841505c44422984;ZWAYSession=804608f4-142b-78e2-8c32-1f26b30a99e9',
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
        'ZBW_SESSID=013bd7e726d688a2572381bb31c841505c44422984;ZWAYSession=804608f4-142b-78e2-8c32-1f26b30a99e9',
    },
    pathRewrite: { '^/ws': '/' },
    secure: false,
    logLevel: 'debug',
    changeOrigin: true,
  },
];

module.exports = PROXY_CONFIG;
