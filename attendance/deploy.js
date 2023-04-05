var express = require("express");
const compression = require("compression");
var history = require("connect-history-api-fallback");

var app = express();
const port = 8087;
// Middleware for serving '/dist' directory
const staticFileMiddleware = express.static("./dist/spa");
// 1st call for unredirected requests
app.use(staticFileMiddleware);
app.use(compression());
// Support history api
// this is the HTTP request path not the path on disk
app.use(
  history({
    index: "/index.html",
  })
);
// 2nd call for redirected requests
app.use(staticFileMiddleware);
// //
app.listen(port, function () {
  console.log("Example app listening on port", port);
});