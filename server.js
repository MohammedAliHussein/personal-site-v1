const express = require("express");
const path = require("path");
const server = express();

server.use(express.static(path.join(__dirname, "/dist")));

server.get("/", (request, response) => {
    response.sendFile(path.join(__dirname, "dist/index.html"));
});

server.listen(5000, () => {
    console.log("http://localhost:5000");
});