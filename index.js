var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(80, 'i131.130.56.174');
console.log('Server running at http://gamestudies.univie.ac.at:80:wq/');
