// Admission Number : 2026453
// Name : Phan Kiah Fong Nicholas
// Class : 1B03


var db = require('./databaseConfig.js');

var Games = {
    insertGame: function (game, callback) {
        var title = game.title;
        var description = game.description;
        var price = game.price;
        var platform = game.platform;
        var categoryid = game.categoryid;
        var categoryid2 = game.categoryid2
        var year = game.year;


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
                game (
                   title, description, price, platform, categoryid, categoryid2, year) 
            VALUES
                (
                    ?,?,?,?,?,?,?
                );
                `;

                conn.query(sql, [title, description, price, platform, categoryid, categoryid2, year], function (err, result) {
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
    showGames: function (platform, callback) {
        //get connection to the database
        var conn = db.getConnection();

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = `
                SELECT 
	                g.gameid, g.title, g.description, g.price, g.platform, g.categoryid, g.categoryid2, c.catname, g.year, g.created_at 
                FROM
	                category AS c,
                    game AS g
                WHERE
                    g.categoryid = c.id
                    AND
                    g.platform = ?
                    `;

                conn.query(sql, [platform], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        if (result.length == 0) {
                            //if there is no result, lets call back with 
                            //no error and no results
                            return callback(null, null);
                        } else {
                            //Since there is a size to it, it must be that 
                            //only one record is found 
                            //let's return only the first one found 
                            return callback(null, result);
                        }
                    }
                });
            }
        });
    },
    deleteID: function (gameid, callback) {
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
                DELETE FROM
                    game
                WHERE
                    gameid = ?;
                `;
                //   |
                //   |
                // Below command changes the question mark   |
                conn.query(sql, [gameid], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    }
                    else {
                        //any results?
                        if (result.length == 0) {
                            // if there is no result, lets call back with
                            // no error, and no results
                            return callback(null, null);
                        }
                        else {
                            // since there is a size to it, it must be that
                            // there is only one record found 
                            // let's return the only one found (result[0]).
                            return callback(null, result[0]);
                        }
                    }

                });
            }
        });
    },
    editID: function (gameid, game, callback) {
        var title = game.title;
        var description = game.description;
        var price = game.price;
        var platform = game.platform;
        var categoryid = game.categoryid;
        var year = game.year;

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
                    game
                SET
                    title = ?,
                    description = ?,
                    price = ?,
                    platform = ?,
                    categoryid = ?,
                    year = ?
                WHERE
                    gameid = ?;
            
                `;

                conn.query(sql, [title, description, price, platform, categoryid, year, gameid], function (err, result) {
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
    showAllGames: function (callback) {
        //get connection to the database
        var conn = db.getConnection();

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");
                var sql = `
                SELECT 
	                *
                FROM
	                sp_games.game
                `   
                ;

                conn.query(sql, [], function (err, result) {
                    conn.end();
                    if (err) {
                        console.log(err);
                        return callback(err, null);
                    } else {
                        if (result.length == 0) {
                            //if there is no result, lets call back with 
                            //no error and no results
                            return callback(null, null);
                        } else {
                            //Since there is a size to it, it must be that 
                            //only one record is found 
                            //let's return only the first one found 
                            return callback(null, result);
                        }
                    }
                });
            }
        });
    },
    searchGames: function (title, platform, price, callback) {
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
                    SELECT
                        *
                    FROM 
                        sp_games.game 
                    WHERE 
                        title LIKE ? 
                        AND platform LIKE ? 
                        AND price <= ?
                    `;
                //   |
                //   |
                // Below command changes the question mark   |
                conn.query(sql, [title, platform, price], function (err, result) {
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


    // searchGamesByTitle: function (title, callback) {
    //     // get a connection to the database
    //     var conn = db.getConnection();

    //     conn.connect(function (err) {
    //         if (err) {
    //             console.log(err);
    //             return callback(err, null);
    //         }
    //         else {
    //             console.log("Connected!");

    //             var sql = `
    //                 SELECT
    //                     *
    //                 FROM 
    //                     sp_games.game 
    //                 WHERE 
    //                     title LIKE "%"?"%"
                         
                        
    //                 `;
    //             //   |
    //             //   |
    //             // Below command changes the question mark   |
    //             conn.query(sql, [title], function (err, result) {
    //                 conn.end();
    //                 if (err) {
    //                     console.log(err);
    //                     return callback(err, null);
    //                 } else {
    //                     return callback(null, result);
    //                 }
    //             });
    //         }
    //     });
    // },
    
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

                var sql = 'SELECT g.title, g.platform, c.catname, g.year, g.description FROM sp_games.game AS g, sp_games.category AS c WHERE g.categoryid = c.id AND g.gameid = ?';
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
    
}


//-----------------------------------------------
// exports
//-----------------------------------------------
module.exports = Games;
