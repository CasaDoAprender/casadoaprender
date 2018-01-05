module.exports = {
  staticFileGlobs: [
    'dist/index.html',
    'dist/**.js',
    'dist/**.css',
    'dist/assets/server/**.svg'
  ],
  root: 'dist/',
  stripPrefix: 'dist',
  navigateFallback: '/index.html',
  runtimeCaching: [{
    urlPattern: /casa-do-aprender-d7556\.firebaseapp\.com/,
    handler: 'networkFirst'
  }]

};
