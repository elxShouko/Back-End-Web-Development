// Admission Number : 2026453
// Name : Phan Kiah Fong Nicholas
// Class : 1B03

var mysql = require('mysql');

var dbConnect = {

    getConnection: function () {
        var conn = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "elxShouko",
            database: "sp_games"

        }

        );

        return conn;

    }
}
module.exports = dbConnect;