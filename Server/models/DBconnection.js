var mysql = require('mysql');

var config = {
    host: "127.0.0.1",
    user: "root",
    password: "yjw715901",
    port: "3306",
    database: "newswebsite"
};

var pool = mysql.createPool(config);

function getConnection() {
    return pool;
}

module.exports = getConnection;