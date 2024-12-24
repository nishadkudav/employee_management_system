import multer  from "multer";

function fileupload(dest,filepath,curtimestamp){
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, dest)
        },
        filename: function (req, file, cb) {
         cb(null, curtimestamp + file.originalname)
        }
      });
      
      const upload = multer({ storage: storage }).single(filepath);
      return upload
}

export default fileupload;