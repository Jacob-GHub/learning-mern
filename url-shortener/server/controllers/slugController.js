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
};

const deleteUrl = async (req, res) => {
  // delete url in mongodb
};

const updateUrl = async (req, res) => {
  // update url in mongodb
};

module.exports = {
  createUrl,
  getUrls,
  deleteUrl,
  updateUrl,
};
