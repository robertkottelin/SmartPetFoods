module.exports = {
    // ...
    resolve: {
      fallback: {
        fs: false,
        util: require.resolve('util/'),
        path: require.resolve('path-browserify'),
      },
    },
  };
  