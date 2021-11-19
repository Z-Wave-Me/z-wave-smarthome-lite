const PROXY_CONFIG = [
  {
    context: (pathname, req) => /^\/Z/.test(pathname),
    target: {
      host: '192.168.31.64',
      // host: 'find.z-wave.me',
      protocol: 'http:',
      port: 8083,
      // port: 443,
    },
    withCredentials: true,
    headers: {
      Cookie:
        'ZBW_SESSID=013bd7e726d688a2572381bb31c841505c44422984;ZWAYSession=595047be-0efd-d0b6-64cd-55eec96e6158',
      // 'ZBW_SESSID=05e2050356a9738dc4e36efa169f719171df1ddd89;ZWAYSession=ba5e3798-b375-dda2-d1d6-153f9050677f',
    },
    secure: true,
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
        // 'ZBW_SESSID=05e2050356a9738dc4e36efa169f719171df1ddd89;ZWAYSession=ba5e3798-b375-dda2-d1d6-153f9050677f',
        'ZBW_SESSID=013bd7e726d688a2572381bb31c841505c44422984;ZWAYSession=595047be-0efd-d0b6-64cd-55eec96e6158',
    },
    pathRewrite: { '^/ws': '/' },
    secure: true,
    logLevel: 'debug',
    changeOrigin: true,
  },
];

module.exports = PROXY_CONFIG;
