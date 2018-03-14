module.exports = {
  staticFileGlobs: [
    'dist/index.html',
    'dist/**.js',
    'dist/**.css',
    'dist/assets/server/book.json',
    'dist/assets/server/**.svg',
    'dist/assets/server/**.jpeg',
    'dist/assets/server/**.png'
  ],
  root: 'dist/',
  stripPrefix: 'dist',
  navigateFallback: '/index.html',
  navigateFallbackWhitelist: [ /^\/home\//, /^\/other\// ], //needed for firebase auth
  runtimeCaching: [{
    urlPattern: /todo/,
    handler: 'networkFirst'
  }]

};
