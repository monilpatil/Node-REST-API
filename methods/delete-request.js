const writeToFile = require("../util/write-to-file")
module.exports = (req, resp) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/")[3];
  const regexV4 = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);
  
  if (!regexV4.test(id)) {
  resp.writeHead(400, { "content-Type": "application/json" });
  resp.end(JSON.stringify({ title: "Validation Failed", msg: "UUID is not valid" }));
}
else if(baseUrl === "/api/movies/" && regexV4.test(id)){
  const index = req.movies.findIndex((movie)=>{
    return movie.id === id;

  });
  if(index=== -1){
    resp.statusCode = 404;
      resp.write(JSON.stringify({ title: "Not found", msg: "movie not found" }));
      resp.end();
  }else{
    req.movies.splice(index,1);
    writeToFile(req.movies);
    resp.writeHead(204,{ "content-Type": "application/json" });
    resp.end(JSON.stringify(req.movies));
  }
}else {
  resp.writeHead(404, { "content-Type": "application/json" });
  resp.end(JSON.stringify({ title: "Not found", msg: "Route not found" }));

}
}

