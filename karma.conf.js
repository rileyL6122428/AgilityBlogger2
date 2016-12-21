function KarmaConfig(config) {
  var configuration = {
    frameworks: ['browserify', 'jasmine'],
    files: [
      './node_modules/babel-polyfill/dist/polyfill.js',
      './node_modules/jquery/dist/jquery.js',
      './node_modules/jasmine-jquery/lib/jasmine-jquery.js',
      'frontend/test/**/*.spec.js',
    ],
    preprocessors: {
      './frontend/test/**/*.spec.js': ['browserify'],
    },
    browsers: ['PhantomJS'],
    // browsers: ['Chrome'],
    singleRun: false,
    // autoWatch: false,
    browserify: {
      debug: true,
      paths: ['./node_modules', './frontend/src'],
      transform: [['babelify', {presets: ['es2015']}], 'partialify'],
      extensions: ['.js', '.html'],
    },
  };

  config.set(configuration);
}

module.exports = KarmaConfig;
