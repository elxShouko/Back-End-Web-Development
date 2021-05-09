// Admission Number : 2026453
// Name : Phan Kiah Fong Nicholas
// Class : 1B03

const express = require('express');
const imageController = require('../controller/image.controller');
const imageUploader = require('../helpers/image-uploader');

const router = express.Router();
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
router.post('/upload', printDebugInfo, imageUploader.upload.single('image'), imageController.upload);


// Exports
module.exports = router;