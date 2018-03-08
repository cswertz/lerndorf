require('babel-register')({
  babelrc: false,
  presets: [
    ['env', {
      targets: {
        node: 'current',
      },
    }],
  ],
});

module.exports = require('./config');
