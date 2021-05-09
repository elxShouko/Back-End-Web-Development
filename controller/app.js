// Admission Number : 2026453
// Name : Phan Kiah Fong Nicholas
// Class : 1B03

var express = require('express');
var app = express();
var multer = require('multer');
var upload = multer({ dest: 'uploads/' }); // this folder is to store all incoming files
var imageRoute = require('../model/images');

var User = require('../model/user')
var Category = require('../model/category');
var Games = require('../model/games');
var Review = require('../model/review');
var verifyToken = require('../auth/verifyToken');
var jwt = require('jsonwebtoken');
var JWT_SECRET = require('../config.js')
var cors = require('cors');

var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

//--------------------------------------------------------
//-------------------------------------
//-------------------------------------------------


//----------------------------------------------------
// Middleware Functions
//----------------------------------------------------
/**
 * Prints useful debugging information about an endpoint we are going to service
 * 
 * @param {object} req
 *      Request Object
 *  
 * @param {object} res
 *      Response Object
 *  
 * @param {function} next
 *      Reference to the next function to call 
 */
function printDebugInfo(req, res, next) {
    console.log();
    console.log("-----------------[ Debug Info ]------------------");
    // console.log(`Servicing ${urlPattern} ...`);
    console.log(`Servicing ${req.url} ...`);

    console.log(`> req.params: ${JSON.stringify(req.params)} ...`);
    console.log(`> req.body: ${JSON.stringify(req.body)} ...`);

    // console.log(`> req.myOwnDebugInfo: ${JSON.stringify(req.myOwnDebugInfo)}`);
    console.log("---------------[ End Debug Info ]----------------");
    console.log();
    next();
}
const isLoggedInMiddleware = require("../auth/isLoggedInMiddleware");

app.use(bodyParser.json()); //parse appilcation/json data
app.use(urlencodedParser);

app.options('*', cors());
app.use(cors());

// Endpt 1
app.get('/users', printDebugInfo, function (req, res) {
    User.findAll(function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            var error = {
                "Message": "Internal Server Error"
            }
            res.status(500).send(error);
        }
    });
});

// Endpt 2
app.post('/users', printDebugInfo, function (req, res) {
    var data = {
        username: req.body.username,
        email: req.body.email,
        type: req.body.type,
        profile_pic_url: req.body.profile_pic_url,
    };

    User.insert(data, function (err, result) {
        if (!err) {
            var output = {
                "userid": result.insertId
            }
            res.status(201).send(output);
        } else {
            var error = {
                "Message": "Internal Server Error"
            }
            var duplicate = {
                "Error": "Duplicate Entry"
            }
            if (err.code == 'ER_DUP_ENTRY') {
                res.status(409).send(duplicate);
            }
            else {
                res.status(500).send(error);
            }
        }
    });
});

// Endpt 3
app.get('/users/:id', printDebugInfo, function (req, res) {
    var id = req.params.id;
    User.findById(id, function (err, result) {
        if (!err) {
            if (result == null) {
                res.status(404).send("No such ID");
            }
            else {
                res.status(200).send(result);
            }
        }
        else {
            res.status(500).send("Internal Server Error");
        }
    });
});

// Endpt 4
app.post('/category', printDebugInfo, function (req, res) {
    var data = {
        catname: req.body.catname,
        description: req.body.description,
    };

    Category.insertCat(data, function (err, result) {
        if (!err) {
            res.status(204).send(result);
        } else {
            var duplicate = {
                "Condition": "The category name provided already exists"
            }
            var error = {
                "Message": "Internal Server Error"
            }

            if (err.code === 'ER_DUP_ENTRY') {
                res.status(422).send(duplicate);
            }
            else {
                res.status(500).send(error);
            }

        }
    });
});

// Endpt 5
app.put('/category/:id', printDebugInfo, function (req, res) {
    var id = req.params.id;
    var data = {
        catname: req.body.catname,
        description: req.body.description
    };

    Category.edit(id, data, function (err, result) {
        if (!err) {
            res.status(204).send();
        } else {
            var error = {
                "Message": "Internal Server Error"
            }
            if (err.code == "ER_DUP_ENTRY") {
                var duplicate = {
                    "Condition": "The category name provided already exists."
                }
                res.status(422).send(duplicate);
            }
            else {
                res.status(500).send(error);

            }


        }
    });
});

// Endpt 6
app.post('/game', printDebugInfo, function (req, res) {
    var data = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        platform: req.body.platform,
        categoryid: req.body.categoryid,
        categoryid2: req.body.categoryid2,
        year: req.body.year
    };

    Games.insertGame(data, function (err, result) {
        if (!err) {
            var Answer = {
                "gameid": result.insertId
            }
            res.status(201).send(Answer);
        } else {
            var error = {
                "Message": "Internal Server Error"
            }
            res.status(500).send(error);
        }
    });
});

// Endpt 7
app.get('/games/:platform', printDebugInfo, function (req, res) {
    var platform = req.params.platform;
    Games.showGames(platform, function (err, result) {
        if (!err) {
            res.status(200).send(result);
        }
        else {
            res.status(500).send("Internal Server Error");
        }
    });
});

// Endpt 8
app.delete('/game/:id', printDebugInfo, function (req, res) {
    var id = req.params.id;
    Games.deleteID(id, function (err, result) {
        if (!err) {
            res.status(204).send();
        }
        else {
            res.status(500).send("Internal Server Error");
        }
    });
});

// Endpt 9
app.put('/game/:id', printDebugInfo, function (req, res) {
    var id = req.params.id;
    var data = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        platform: req.body.platform,
        categoryid: req.body.categoryid,
        year: req.body.year

    };

    Games.editID(id, data, function (err, result) {
        if (!err) {
            console.log(result);
            res.status(204).send();
        } else {
            res.status(500).send("Internal Server Error");
        }
    });
});

// Endpt 10
// app.post('/user/:uid/game/:gid/review', printDebugInfo, function (req, res) {
//     var data = {
//         content: req.body.content,
//         rating: req.body.rating
//     };
//     var uid = req.params.uid;
//     var gid = req.params.gid;

//     Review.insertReview(uid, gid, data, function (err, result) {
//         if (!err) {
//             var Answer = {
//                 "reviewid": result.insertId
//             }
//             res.status(201).send(Answer);
//         } else {
//             var error = {
//                 "Message": "Internal Server Error"
//             }
//             res.status(500).send(error);
//         }
//     });
// });

// Endpt 11
app.get('/game/:id/review', printDebugInfo, function (req, res) {
    var id = req.params.id;
    Review.getGameReview(id, function (err, result) {
        if (!err) {
            if (result == null) {
                res.status(404).send("No such ID");
            }
            else {
                res.status(200).send(result);
            }
        }
        else {
            res.status(500).send("Internal Server Error");
        }
    });
});


// Post endpoint
app.post('/api/user', printDebugInfo, verifyToken, function (req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var role = req.body.role;
    var password = req.body.password;

    User.addUser(username, email, role, password, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Some error");
        }
    });
});









// Update User
// app.put('/user/:userid', printDebugInfo, verifyToken, function (req, res) {
//     // res.status(403).send("403 demo");
//     // res.status(401).send("401 demo");
//     // return;
//     var userid = req.params.userid;
//     var username = req.body.username;
//     var email = req.body.email;
//     var type = req.body.type;
//     var password = req.body.password;

//     User.updateUser(userid, username, email, type, password, function (err, result) {
//         if (!err) {
//             var output = {
//                 "success": true,
//                 "affectedRows": result.affectedRows,
//                 "changed rows": result.changedRows,

//             };
//             res.send(output);
//         } else {
//             res.status(500).send("Some error");
//         }
//     });
// });




// Login Endpt
app.post('/login', function (req, res) {

    var email = req.body.email;
    var password = req.body.password;

    User.loginUser(email, password, function (err, token, result) {
        if (!err) {
            if (result) {
                console.log("Token: " + token);
                // this is matched to callback(null, not null, not null)

                // var UserData = [
                //     {
                //         "username": "u3",
                //         "email": "u3@abc.com",
                //         "role": "admin"
                //     }
                // ];
                var message = {
                    "UserData": JSON.stringify(result),
                    "token": token
                };
                res.status(200).send(message);

            }
            else {
                // this is matched to callback(null, null)
                var message = {
                    "Error": "Invalid login"
                };
                res.status(401).send(message);
            }

            //res.send("{\"result\":\"" + result + "\"}");

        } else {
            // this is matched to callback (not null, null, null)
            res.status(500);
            res.send(err.statusCode);

        }

    });


});

// Get all games
app.get('/games', printDebugInfo, function (req, res) {
    Games.showAllGames(function (err, result) {
        if (!err) {
            res.status(200).send(result);
        } else {
            var error = {
                "Message": "Internal Server Error"
            }
            res.status(500).send(error);
        }
    });
});

// Get game by title, platform, price
app.get('/game/:title/:platform/:price', printDebugInfo, function (req, res) {
    var title = req.params.title;
    var platform = req.params.platform;
    var price = req.params.price;

    title = "%" + title + "%"
    platform = "%" + platform + "%"
    Games.searchGames(title, platform, price, function (err, result) {
        if (!err) {
            if (result == null) {
                res.status(404).send("No such ID");
            }
            else {
                res.status(200).send(result);
            }
        }
        else {
            res.status(500).send("Internal Server Error");
        }
    });
});


// Get game by id
app.get('/game/:id', printDebugInfo, function (req, res) {
    var id = req.params.id;
    Games.findById(id, function (err, result) {
        if (!err) {
            if (result == null) {
                res.status(404).send("No such ID");
            }
            else {
                res.status(200).send(result);
            }
        }
        else {
            res.status(500).send("Internal Server Error");
        }
    });
});

// Get review by gameid
app.get('/viewReview/:id', printDebugInfo, function (req, res) {
    var id = req.params.id;
    Review.getGameReviewByID(id, function (err, result) {
        if (!err) {
            if (result == null) {
                res.status(404).send("No such ID");
            }
            else {
                res.status(200).send(result);
            }
        }
        else {
            res.status(500).send("Internal Server Error");
        }
    });
});

// Add a new Game
app.post('/addGame', printDebugInfo, isLoggedInMiddleware, function (req, res) {
    var game = {
        title: req.body.title,
        description: req.body.description,
        price: req.body.price,
        platform: req.body.platform,
        categoryid: req.body.categoryid,
        categoryid2: req.body.categoryid2,
        year: req.body.year
    }

    if(req.decodedToken.type != "Admin"){
        res.status(403).send("Forbidden. You are not an admin");
        return;
    }

    Games.insertGame(game, function (err, result) {
        if (!err) {
            res.send(result);
        } else {
            res.status(500).send("Some error");
        }
    });
});

// Add a new Game Review
app.post('/user/:uid/game/:gid/review', printDebugInfo, isLoggedInMiddleware, function (req, res) {
    var data = {
        content: req.body.content,
        rating: req.body.rating
    };
    var uid = req.params.uid;
    var gid = req.params.gid;


    if (uid != req.decodedToken.userid) {
        res.status(403).send();
        return;
    }
    if(req.decodedToken.type == "Admin"){
        res.status(403).send("Forbidden. You are not a customer!");
        return;
    }
    

    Review.insertReview(uid, gid, data, function (err, result) {
        if (!err) {
            var Answer = {
                "reviewid": result.insertId
            }
            res.status(201).send(Answer);
        } else {
            var error = {
                "Message": "Internal Server Error"
            }
            res.status(500).send(error);
        }
    });
});

// Add a new Category
app.post('/addCat', printDebugInfo, isLoggedInMiddleware, function (req, res) {
    var data = {
        catname: req.body.catname,
        description: req.body.description,
    };

    if(req.decodedToken.type != "Admin"){
        res.status(403).send("Forbidden. You are not an Admin!");
        return;
    }

    Category.insertCat(data, function (err, result) {
        if (!err) {
            res.status(204).send(result);
        } else {
            var duplicate = {
                "Condition": "The category name provided already exists"
            }
            var error = {
                "Message": "Internal Server Error"
            }

            if (err.code === 'ER_DUP_ENTRY') {
                res.status(422).send(duplicate);
            }
            else {
                res.status(500).send(error);
            }

        }
    });
});

// Get all categories
app.get('/getAllCategories', printDebugInfo, function (req, res) {
    Category.showAllCategories(function (err, result) {
        if (!err) {
            res.status(200).send(result);
        }
        else {
            res.status(500).send("Internal Server Error");
        }
    });
});

// Update User Details
app.put('/user/:id', printDebugInfo, isLoggedInMiddleware, function (req, res) {
    var id = req.params.id;
    var data = {
        username: req.body.username,
        email: req.body.email,
        type: req.body.type,
        password: req.body.password
    };

    console.log(req.decodedToken.type);

    if(req.decodedToken.type != "Admin" || req.decodedToken.type != "Customer"){
        console.log("You do not have a profile to edit. Please log in!");
        return;
    }

    User.updateUser(id, data, function (err, result) {
        if (!err) {
            res.status(204).send();
        } else {
            var error = {
                "Message": "Internal Server Error"
            }
            res.status(500).send(error);

        }
    });
});

// Bonus Requirements
app.use("/images", imageRoute);

module.exports = app;
