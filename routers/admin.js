const express = require("express");
const adminController = require("../controllers/admin.controller");
const { verifyToken } = require("../utilities/verifyToken");

const router = express.Router();

router.post("/add-admin", adminController.addAdmin);
router.post("/login-admin", adminController.loginAdmin);
router.patch("/update-admin", verifyToken, adminController.updateAdmin);
router.post("/is-admin", verifyToken, adminController.isAdmin);

module.exports = router;
