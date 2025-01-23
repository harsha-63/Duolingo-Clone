import multer from 'multer'
import {CloudinaryStorage} from 'multer-storage-cloudinary'
import cloudinary from '../Config/cloudinary.js'

const storage = new CloudinaryStorage({
    cloudinary:cloudinary,
    params:{
        folder:'Duolingo-audio',
        resource_type: "raw",
    }
})

const upload = multer({storage:storage});
export default upload