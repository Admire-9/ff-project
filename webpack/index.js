
let config;
console.log(process.env.NODE_ENV , "process.env.NODE_ENV ")
if(process.env.NODE_ENV === "development") {
    config = require("./webpack.dev");
}else {
    config = require("./webpack.prod");
}

module.exports = config;