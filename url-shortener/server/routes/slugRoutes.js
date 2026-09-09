const express = require("express");
const router = express.Router();
const {
  createUrl,
  getUrls,
  deleteUrl,
  updateUrl,
} = require("../controllers/slugController");

router.post("/links", createUrl);
router.get("/links", getUrls);
router.delete("links/:id", deleteUrl);
router.get("/:slug", updateUrl);

module.exports = router;
