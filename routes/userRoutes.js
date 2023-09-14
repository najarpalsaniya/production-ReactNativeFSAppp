const express = require("express")
const { registerController, loginController, updateUserController, requireSignIn } = require("../controllers/userController")


// Router Objects

const router = express.Router()


// Routes

// 1. Registration || Type POST
router.post('/register', registerController)

// 2. Login || Type POST

router.post('/login', loginController)

// UPDATE || PUT

router.put('/update-user', requireSignIn, updateUserController)


// Export

module.exports = router