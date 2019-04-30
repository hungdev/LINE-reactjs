require('@babel/register')({
  ignore: ['node_modules/*', 'test/*'],
});
require('@babel/polyfill');
require('browser-env')({
  url: 'https://example.org/',
  referrer: 'https://example.com/',
  contentType: 'text/html',
  includeNodeLocations: true,
  storageQuota: 10000000,
});
