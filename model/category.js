// Admission Number : 2026453
// Name : Phan Kiah Fong Nicholas
// Class : 1B03

const db = require('../model/databaseConfig');

var Category = {
    // Question 4
    insertCat: function (category, callback) {
        var catname = category.catname;
        var description = category.description;


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
                category (
                   catname, description) 
            VALUES
                (
                    ?,?
                );
                `;

                conn.query(sql, [catname, description], function (err, result) {
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
    // Question 5
    edit: function (id, category, callback) {
        var catname = category.catname;
        var description = category.description;
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
                    category
                SET
                    catname = ?,
                    description = ?
                WHERE
                    id = ?;
            
                `;

                conn.query(sql, [catname, description, id], function (err, result) {
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
    
    // Get All Categories
    showAllCategories: function (callback) {
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
	                sp_games.category
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
}

module.exports = Category;