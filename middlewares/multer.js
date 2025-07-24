import multer from "multer";

const storage = multer.memoryStorage(); // we'll upload to Cloudinary via buffer
const upload = multer({ storage });

export default upload;
