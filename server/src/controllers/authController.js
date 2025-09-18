const asyncHandler = require('express-async-handler')
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const generateToken = require('../utils/generateToken')


// @desc Register a new user
// @route POST /api/auth/register
// @access Public
const registerUser = asyncHandler(async (req, res) => {
const { email, password } = req.body
if (!email || !password) {
res.status(400)
throw new Error('Please provide email and password')
}


const userExists = await User.findOne({ email: email.toLowerCase() })
if (userExists) {
res.status(400)
throw new Error('User already exists')
}


const salt = await bcrypt.genSalt(10)
const hashed = await bcrypt.hash(password, salt)


const user = await User.create({ email: email.toLowerCase(), password: hashed })
if (user) {
res.status(201).json({
token: generateToken(user._id),
user: { _id: user._id, email: user.email, isAdmin: user.isAdmin },
})
} else {
res.status(400)
throw new Error('Invalid user data')
}
})


// @desc Authenticate user & get token
// @route POST /api/auth/login
// @access Public
const authUser = asyncHandler(async (req, res) => {
const { email, password } = req.body
const user = await User.findOne({ email: email.toLowerCase() })
if (user && (await bcrypt.compare(password, user.password))) {
res.json({ token: generateToken(user._id), user: { _id: user._id, email: user.email, isAdmin: user.isAdmin } })
} else {
res.status(401)
throw new Error('Invalid email or password')
}
})


module.exports = { registerUser, authUser }