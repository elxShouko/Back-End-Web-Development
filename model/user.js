// Admission Number : 2026453
// Name : Phan Kiah Fong Nicholas
// Class : 1B03

var db = require('../model/databaseConfig');
var config = require('../config.js');
var jwt = require('jsonwebtoken');

var User = {
    // Login
    loginUser: function (email, password, callback) {

        var conn = db.getConnection();
        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null, null);
            }
            else {
                console.log("Connected!");

                var sql = 'select * from user where email=? and password=?';

                conn.query(sql, [email, password], function (err, result) {
                    conn.end();

                    if (err) {
                        console.log(err);
                        return callback(err, null, null);

                    } else {
                        // no results at all
                        if (result.length == 0) {
                            return callback(null, null, null);
                        }
                        // there are results
                        else {
                            // it must be that we have ONE result here,
                            // since the email is Unique

                            // confirm if we have the key
                            console.log(result[0]);

                            // generate the token
                            var token = jwt.sign(
                                // (1) PayLoad
                                {
                                    userid: result[0].userid,
                                    type: result[0].type
                                },
                                // (2) Secret Key
                                config.key,
                                // (3) Lifetime of token
                                {
                                    // expires in 24 hrs
                                    expiresIn: 86400
                                }
                            );

                            return callback(null, token, result);
                        }

                    }
                });

            }

        });
    },

    // Update
    updateUser: function (userid, data, callback) {
        var username = data.username;
        var email = data.email;
        var type = data.type;
        var password = data.password;
        // get a connection to the database
        var conn = db.getConnection();

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");

                var sql = `
                UPDATE 
                    sp_games.user
                SET
                    username=?,
                    email=?,
                    type=?,
                    password=?
                WHERE
                    userid = ?;
            
                `;

                conn.query(sql, [username, email, type, password, userid], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },

    // Question 1
    findAll: function (callback) {
        // get a connection to the database
        var conn = db.getConnection();

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");

                var sql = 'SELECT * FROM user';
                //   |
                //   |
                // Below command changes the question mark   |
                conn.query(sql, [], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    else {
                        return callback(null, result);
                    }

                });
            }
        });
    },
    // Question 2
    insert: function (user, callback) {
        var username = user.username;
        var email = user.email;
        var type = user.type;
        var profile_pic_url = user.profile_pic_url;


        // get a connection to the database
        var conn = db.getConnection();

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");

                var sql = `
            INSERT INTO
                user (
                   username, email, type, profile_pic_url) 
            VALUES
                (
                    ?,?,?,?
                );
                `;

                conn.query(sql, [username, email, type, profile_pic_url], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },
    // Question 3
    findById: function (id, callback) {
        // get a connection to the database
        var conn = db.getConnection();

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");

                var sql = 'SELECT * FROM user WHERE userid = ?';
                //   |
                //   |
                // Below command changes the question mark   |
                conn.query(sql, [id], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        return callback(null, result);
                    }
                });
            }
        });
    },
};

module.exports = User;
