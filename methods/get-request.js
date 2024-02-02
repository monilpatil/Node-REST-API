
module.exports = (req, resp) => {
  let baseUrl = req.url.substring(0, req.url.lastIndexOf("/") + 1);
  let id = req.url.split("/")[3];
  const regexV4 = new RegExp(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);

  console.log(id);

  if (req.url === "/api/movies") {
    resp.statusCode = 200;
    resp.setHeader("content-Type", "application/json");
    resp.write(JSON.stringify(req.movies));
    resp.end();

  } else if (!regexV4.test(id)) {
    resp.writeHead(400, { "content-Type": "application/json" });
    resp.end(JSON.stringify({ title: "Validation Failed", msg: "UUID is not valid" }));

  } else if (baseUrl === "/api/movies/" && regexV4.test(id)) {
    resp.statusCode = 200;
    resp.setHeader("content-Type", "application/json");
    let filteredMovie = req.movies.filter((movie) => {
      return movie.id == id;
    });

    if (filteredMovie.length > 0) {
      resp.statusCode = 200;
      resp.write(JSON.stringify(filteredMovie));
      resp.end();
      // console.log("movie found")
    } else {
      resp.statusCode = 404;
      resp.write(JSON.stringify({ title: "Not found", msg: "movie not found" }));
      resp.end();
      // console.log("movie not found")
    }

  } else {
    resp.writeHead(404, { "content-Type": "application/json" });
    resp.end(JSON.stringify({ title: "Not found", msg: "Route not found" }));

  }
};