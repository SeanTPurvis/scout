const http = require('http');
const app = require('./app');

// Get port # from enviornment variable or use port 3001
const port = process.env.PORT || 3001;

const server = http.createServer(app);

server.listen(port);
console.log("server running at port: " + port);
