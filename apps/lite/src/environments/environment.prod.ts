import packageJson from '../../../../package.json';

export const environment = {
  production: true,
  ws:
    location.protocol.replace('http', 'ws') +
    '//' +
    location.hostname +
    ':' +
    location.port,
  version: packageJson.version,
};
