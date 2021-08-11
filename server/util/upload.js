const multer = require("multer");
const path = require("path");
const fs = require("fs");

function makeDirectory(path) {
    if (!fs.existsSync(path)) {
        fs.mkdirSync(path);
    }
    return true;
}
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        const orgId = req.tokenData.orgId;
        let dir = `./docs/${orgId}`;
        if (req.query.path != undefined) {
            dir = dir + `/${req.query.path}`;
        }
        makeDirectory(dir);
        return cb(null, dir);
    },
    filename: async function(req, file, cb) {
        cb(null, file.originalname);
    },
});
module.exports = {
    uploadSingle: multer({
        storage: storage,
        limits: {
            files: 1, // Take Maximum 5 Files at a time
            fileSize: 10 * 1024 * 1024, // Maximum Size of File is 10 MB
        },
        fileFilter: function(req, file, cb) {
            checkFileType(file, cb);
        },
    }).single("file"),
    uploadMultiple: multer({
        storage: storage,
        limits: {
            files: 5, // Take Maximum 5 Files at a time
            fileSize: 10 * 1024 * 1024, // Maximum Size of File is 10 MB
        },
        fileFilter: function(req, file, cb) {
            checkFileType(file, cb);
        },
    }).array("files", [5]),
};

function checkFileType(file, cb) {
    //Allow ext .WEBM .MPG, .MP2, .MPEG, .MPE, .MPV .OGG .MP4, .M4P, .M4V .AVI, .WMV .MOV, .QT .FLV,
    const filetypes = /jpeg|jpg|png|gif|pdf|mp4|mp2|avi|mpg|docx|doc|txt/;
    //check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    //check mime
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb("Error: Files Only! (jpeg|jpg|png|gif|pdf|mp4|mp2|avi|mpg|docx|doc|txt)");
    }
}

/**
 * SAMPLE API FOR FILE UPLOADING
 *
 *
 * const upload = require('./util/upload');
 * app.post('/upload',(req,res,next)=>{
    upload(req, res, (err) => {
		if(err){
			res.json({msg: err})
		}else{
			if(req.file == undefined){
				res.json({msg: 'Error: No File Selected!'})
			}else{
				res.json({
					msg: 'File Uploaded!',
					filePath: 'uploads/' + req.file.filename
				});
			}
		}
	});
});
 */