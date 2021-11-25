var express = require("express");
var router = express.Router();
const itemsCtrl = require("../controllers/items");

router.get("/", itemsCtrl.index);
router.get("/categories/:cat", itemsCtrl.catShow);
router.get("/new/:id", itemsCtrl.new);
router.get("/:id/edit", itemsCtrl.edit);
router.get("/:id", itemsCtrl.show);
router.post("/:g_id", itemsCtrl.create);
router.delete("/:id", itemsCtrl.delete);
router.put("/:id", itemsCtrl.update);

module.exports = router;
