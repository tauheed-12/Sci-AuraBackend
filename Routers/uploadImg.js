const express = require('express');
const router = express.Router();
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const cloudinary = require('cloudinary').v2;
cloudinary.config({ 
  cloud_name: 'dffp285mq', 
  api_key: process.env.APIKEY, 
  api_secret: process.env.APISECRET 
});

router.post('/uploadImg', upload.single('image'), async (req, res) => {
  try {
    const result = await cloudinary.uploader.upload(req.file.buffer, {
      folder: 'Profile'
    });

    console.log(result);

    res.status(200).json({ success: true, imageUrl: result.secure_url });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to upload image' });
  }
});

module.exports = router;
