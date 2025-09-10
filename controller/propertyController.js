const Buy = require("../models/Buy.model");
const cloudinary = require("../config/cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

// Configure Cloudinary Storage
const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "properties",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
  },
});

const parser = multer({ storage: cloudinaryStorage });

// Create a new Buy property
exports.createBuyProperty = [
  parser.fields([{ name: "images", maxCount: 50 }]),
  async (req, res) => {
    try {
      const {
        title,
        type,
        location,
        price,
        googleMapUrl,
        highlights,
        nearby,
        features,
        amenities,
        description,
      } = req.body;

      if (!title || !type || !location || !price || !description) {
        return res.status(400).json({ error: "Missing required fields." });
      }

      const images = Array.isArray(req.files["images"])
        ? req.files["images"]
        : [];

      const imageUrls = images.map((file) => file.path);

      const newProperty = new Buy({
        title,
        type,
        location,
        price,
        images: imageUrls,
        googleMapUrl,
        highlights: highlights
          ? highlights.split(",").map((i) => i.trim())
          : [],
        nearby: nearby ? nearby.split(",").map((i) => i.trim()) : [],
        features: features ? features.split(",").map((i) => i.trim()) : [],
        amenities: amenities ? amenities.split(",").map((i) => i.trim()) : [],
        description,
      });

      await newProperty.save();
      res.status(201).json({
        message: "Property listed for sale successfully",
        property: newProperty,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message || "Server Error" });
    }
  },
];

// 📌 Get All Buy Properties
exports.getAllBuyProperties = async (req, res) => {
  try {
    const properties = await Buy.find().sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

// 📌 Get Single Buy Property by ID
exports.getBuyPropertyById = async (req, res) => {
  try {
    const property = await Buy.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.status(200).json(property);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};

// 📌 Delete Buy Property by ID
exports.deleteBuyProperty = async (req, res) => {
  try {
    const property = await Buy.findByIdAndDelete(req.params.id);
    if (!property) {
      return res.status(404).json({ error: "Property not found" });
    }
    res.status(200).json({ message: "Property deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server Error" });
  }
};
