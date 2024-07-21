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
    // headers: {
    //   Cookie:
    //     'ZBW_SESSID=03b087b5fa4336f6869c915c528a77f15b712db47c;ZWAYSession=482d43b6-a19e-691b-0c7a-52a02c0dadbd',
    // },
    secure: true,
    logLevel: 'debug',
    changeOrigin: true,
  },
  {
    context: (pathname, req) => /^\/websocket/.test(pathname),
    target: {
      host: '192.168.31.64',
      // host: 'find.z-wave.me',
      protocol: 'ws:',
      //protocol: 'wss:',
      port: 8083,
      // port: 443,
    },
    ws: true,
    withCredentials: true,
    // headers: {
    //   Cookie:
    //     'ZBW_SESSID=05e205035643738dc4e36efa169f719171df1ddd89;ZWAYSession=482d43b6-a19e-691b-0c7a-52a02c0dadbd',
    // },
    pathRewrite: { '^/ws': '/' },
    secure: true,
    logLevel: 'debug',
    changeOrigin: true,
  },
];

module.exports = PROXY_CONFIG;
