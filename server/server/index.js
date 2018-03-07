import http from 'http';

import logger from './logger';
import app from './server';

/* istanbul ignore next */
const port = process.env.SERVER_PORT || 3000;
const server = http.createServer(app);
const listen = server.listen(port);

logger.info(`Listening on port: ${port}`);

let currentApp = app;
/* istanbul ignore if */
if (module.hot) {
  module.hot.accept('./server', () => {
    server.removeListener('request', currentApp);
    server.on('request', app);
    currentApp = app;
  });
}

export default listen;
