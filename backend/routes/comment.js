const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");

router.post("/", auth, commentCtrl.createComment);
router.get("/:id", auth, commentCtrl.getAllComment);
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;
