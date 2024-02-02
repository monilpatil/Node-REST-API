const crypto = require('crypto')
const fs = require ('fs')
const requestBodyParser = require('../util/body-parser')
const writeToFile = require('../util/write-to-file');
module.exports = async (req, resp) => {
  if (req.url === "/api/movies") {
    try {
      let body = await requestBodyParser(req);
      body.id = crypto.randomUUID();
      req.movies.push(body);
      writeToFile(req.movies);
      resp.writeHead(201, { "Content-Type": "application/json" });
      resp.end()
    } catch (err) {
      console.log(err);
      resp.writeHead(400, { "content-Type": "application/json" });
      resp.end(JSON.stringify({ title: "Validation Failed", msg: "Request Body is not valid" }));
    }
  }else {
    resp.writeHead(404, { "content-Type": "application/json" });
    resp.end(JSON.stringify({ title: "Not found", msg: "Route not found" }));

  }
};