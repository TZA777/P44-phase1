const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

//configuration
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
})

//cloud storge
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'airBNB_DEV',
    allowedFormats: ['png', 'jpg', 'jpeg'], // supports promises as well
    // public_id: (req, file) => 'computed-filename-using-request',
  },
});

module.exports= {
    cloudinary,
    storage,
}