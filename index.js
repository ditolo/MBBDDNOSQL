const express = require('express');
const { connect } = require('./utils/db');
const moviesRoutes = require('./routes/movies.routes');

connect();

const PORT = 3000;
const server = express();

server.use(express.json());
server.use('/', moviesRoutes);
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
