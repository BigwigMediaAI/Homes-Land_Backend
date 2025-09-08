const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("./cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "properties",
    allowed_formats: ["jpg", "jpeg", "png", "webp", "mp4"],
    resource_type: "auto", // THIS IS THE KEY LINE
  },
});

module.exports = storage;
