const express = require('express');
const router = express.Router(); 
const userController = require("../controllers/userController");

let { createUser, userLogin } = userController;

// ==========> Create User Api <=============
router.post("/register", createUser);

// =========> User Login Api <============
router.post("/login", userLogin);

router.all("/*", async function (req, res) {
    res.status(404).send({ status: false, msg: "Page Not Found!"})
});

module.exports = router;