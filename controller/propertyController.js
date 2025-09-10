const Property = require("../models/Buy.model");

// @desc    Create a new property with images
// @route   POST /api/properties
// @access  Public or Admin

exports.createProperty = async (req, res) => {
  try {
    const {
      title,
      description,
      purpose,
      type,
      location,
      price,
      bedrooms,
      bathrooms,
      areaSqft,
      highlights,
      featuresAmenities,
      nearby,
      googleMapUrl,
      videoLink,
      extraHighlights,
    } = req.body;

    // Handle uploaded images from Cloudinary
    const images = req.files ? req.files.map((file) => file.path) : [];

    // Generate slug from title
    const slug = title
      .toLowerCase()
      .replace(/[^\w\s-]/g, "")
      .trim()
      .replace(/\s+/g, "-");

    // Convert numeric fields safely (empty string → null)
    const toNumberOrNull = (value) => {
      if (value === "" || value === undefined) return null;
      const num = Number(value);
      return isNaN(num) ? null : num;
    };

    const property = new Property({
      title,
      slug,
      description: description || "", // if empty, fallback ""
      purpose,
      type,
      location,
      price: toNumberOrNull(price),
      bedrooms: toNumberOrNull(bedrooms),
      bathrooms: toNumberOrNull(bathrooms),
      areaSqft: toNumberOrNull(areaSqft),

      highlights: highlights ? JSON.parse(highlights) : [],
      featuresAmenities: featuresAmenities ? JSON.parse(featuresAmenities) : [],
      nearby: nearby ? JSON.parse(nearby) : [],
      googleMapUrl: googleMapUrl || "",
      videoLink: videoLink || "",
      extraHighlights: extraHighlights ? JSON.parse(extraHighlights) : [],

      images,
    });

    await property.save();
    res.status(201).json(property);
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Failed to create property", error });
  }
};

// @desc    Get all properties
// @route   GET /api/properties
// @access  Public
exports.getProperties = async (req, res) => {
  try {
    const properties = await Property.find().sort({ createdAt: -1 });
    res.status(200).json(properties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch properties", error });
  }
};

// @desc    Get single property by slug
// @route   GET /api/properties/:slug
// @access  Public
exports.getPropertyBySlug = async (req, res) => {
  try {
    const property = await Property.findOne({ slug: req.params.slug });
    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(property);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch property", error });
  }
};
