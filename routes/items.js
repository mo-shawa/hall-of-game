var express = require("express");
var router = express.Router();
const itemsCtrl = require("../controllers/items");

router.get("/", itemsCtrl.index);
router.get("/:id", itemsCtrl.show);
router.get("/new/:id", itemsCtrl.new);
router.post("/:g_id", itemsCtrl.create);
router.get("/categories", itemsCtrl.catIndex);
router.get("/categories/:cat", itemsCtrl.catShow);

module.exports = router;
