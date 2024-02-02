
const requestBodyParser = require('../util/body-parser')
const writeToFile = require('../util/write-to-file');
module.exports=async (req,resp)=>{
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/")[3];
  const regexV4 = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);

  if (!regexV4.test(id)) {
    resp.writeHead(400, { "content-Type": "application/json" });
    resp.end(JSON.stringify({ title: "Validation Failed", msg: "UUID is not valid" }));

  }else if (baseUrl === "/api/movies/" && regexV4.test(id)) {
    try {
      let body = await requestBodyParser(req);
      const index = req.movies.findIndex((movie)=>{
        return movie.id === id;
      });
      if(index=== -1){
        resp.statusCode = 404;
          resp.write(JSON.stringify({ title: "Not found", msg: "movie not found" }));
          resp.end();
      }else{
        req.movies[index] = {id, ...body};
        writeToFile(req.movies);
        resp.writeHead(200,{"content-Type": "application/json"})
        resp.end(JSON.stringify(req.movies[index]));
      }
    } catch (error) {
      console.log(error)
      resp.writeHead(400, { "content-Type": "application/json" });
      resp.end(JSON.stringify({ title: "Validation Failed", msg: "Request Body is not valid" }));
    }
  }else {
    resp.writeHead(404, { "content-Type": "application/json" });
    resp.end(JSON.stringify({ title: "Not found", msg: "Route not found" }));

  }
};