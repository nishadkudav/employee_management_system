import multer from 'multer';
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from 'cloudinary';

cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    cloud_key: process.env.CLOUD_API_KEY,
    cloud_secret: process.env.CLOUD_API_SECRET
});


const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'uploads',
    format: async (req, file) => 'png', 
    public_id: (req, file) => file.originalname.split('.')[0]+"",
  },
});

const cloudinaryFileUploader = multer({ storage: storage });

export{
    cloudinaryFileUploader
}