const path = require('path');

module.exports = {
  webpack: {
    /* module aliases - import rewriting/resolving, keep this in sync with jsconfig.json */
    alias: {
      '@actions': path.resolve(__dirname, 'src/actions/'),
      '@components': path.resolve(__dirname, 'src/components/'),
      '@containers': path.resolve(__dirname, 'src/containers/'),
      '@reducers': path.resolve(__dirname, 'src/reducers/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
    },
  },
};
