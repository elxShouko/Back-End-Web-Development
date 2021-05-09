// Admission Number : 2026453
// Name : Phan Kiah Fong Nicholas
// Class : 1B03

const e = require("express");

function upload(req, res){
    if(req.file.filename){
        res.status(201).json({
            message: "Image upload successful",
        url: req.file.filename
        });
    }
    else{
        res.status(500).json({
            message: "Something went wrong!"
        });
    }
}

// Exports
module.exports = {
    upload: upload
}