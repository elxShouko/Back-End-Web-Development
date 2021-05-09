// Admission Number : 2026453
// Name : Phan Kiah Fong Nicholas
// Class : 1B03

const db = require('../model/databaseConfig');

var Review = {
    // Question 10
    insertReview: function (uid, gid, data, callback) {
        var content = data.content;
        var rating = data.rating;


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
                reviews (
                   uid, gid, content, rating
                   ) 
            VALUES
                (
                    ?, ?, ?, ?
                );
                `;

                conn.query(sql, [uid, gid, content, rating], function (err, result) {
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
    // Question 11
    getGameReviewByID: function (id, callback) {
        // get a connection to the database
        var conn = db.getConnection();

        conn.connect(function (err) {
            if (err) {
                console.log(err);
                return callback(err, null);
            }
            else {
                console.log("Connected!");

                var sql =
                    `
                SELECT 
	                r.gid, r.content, r.rating, u.username, r.created_at
                FROM 
                	reviews AS r,
                    user AS u,
                    game AS g
                WHERE
                    g.gameid = r.gid AND 
                    u.userid = r.uid AND
                    r.gid = ?
                `;
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

module.exports = Review;