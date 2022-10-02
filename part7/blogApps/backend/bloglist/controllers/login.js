const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.post('/', async (request, response) => {
  const { username, password } = request.body
  console.log('-----------------')
  const user = await User.findOne({ username })
  console.log(user.passwordHash,'-----',password);
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)
    console.log(passwordCorrect,'pass');
  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: 'invalid username or password'
    })
  }
  console.log('--------------')

  const userForToken = {
    username: user.username,
    id: user._id,
  }

  const token = jwt.sign(userForToken, process.env.SECRET)

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = router