let server;
if(process.env.NODE_ENV === "development") {
    server = require("./server.dev");
}else {
    server = require("./server.prod");
}

module.exports = server;