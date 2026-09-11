const URL = require("../models/Slug");
const { nanoid } = require("nanoid");

const createUrl = async (req, res) => {
  try {
    const longUrl = req.body.longUrl;
    if (!longUrl) {
      return res.status(400).json({ error: "URL is required" });
    }

    const slug = req.body.slug || nanoid();

    const url = await URL.create({
      slug: slug,
      longUrl: longUrl,
    });
    res.status(200).json(url);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: "slug already exists" });
    }
    res.status(500).json({ error: error.message });
  }
};

const getUrls = async (req, res) => {
  // get url in mongodb
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 20;
    const skip = (page - 1) * limit;
    const urls = await URL.find().skip(skip).limit(limit);

    res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteUrl = async (req, res) => {
  // delete url in mongodb
  try {
    const deleted = await URL.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: "URL not found" });
    }

    res.status(200).json({ message: "URL deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateUrl = async (req, res) => {
  try {
    const url = await URL.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { clicks: 1 } },
      { new: true },
    );
    if (!url) {
      return res.status(404).json({ error: "slug not found" });
    }
    res.redirect(url.longUrl);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createUrl,
  getUrls,
  deleteUrl,
  updateUrl,
};
