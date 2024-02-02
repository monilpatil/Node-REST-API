const express = require('express');
const http = require('http');
const getReq = require('./methods/get-request');
const postReq = require('./methods/post-request');
const putReq = require('./methods/put-request');
const deleteReq = require('./methods/delete-request');
let movies = require('./data/movies.json')

const PORT = process.env.PORT || 5001;
// const app = express();

// app.use(express.json())
const server = http.createServer((req, resp) => {
  req.movies = movies;

  switch (req.method) {
    case "GET":
      getReq(req, resp);
      break;
    case "POST":
      postReq(req, resp);
      break;
    case "PUT":
      putReq(req, resp);
      break;
    case "DELETE":
      deleteReq(req, resp);
      break;
    default:

      resp.statusCode = 404;
      resp.setHeader("Content-Type", "application/json");
      resp.write(JSON.stringify({title:"Not found", msg:"Route not found" }));
      resp.end()
  }

});

server.listen(PORT, () => {
  console.log(`Server started on port :${PORT}`)
})