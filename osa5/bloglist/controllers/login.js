const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

router.post('/', async (request, response) => {
  try {
    const body = request.body

    const user = await User.findOne({ username: body.username })
    const passwordCorrect = user === null ?
      false :
      await bcrypt.compare(body.password, user.passwordHash)

    if ( !(user && passwordCorrect) ) {
      return response.status(401).send({ error: 'invalid username or password' })
    }

    const userForToken = {
      username: user.username,
      id: user._id
    }

    const token = jwt.sign(userForToken, process.env.SECRET)
  
    response.status(200).send({ token, username: user.username, name: user.name })
  } catch (e) {
    console.log(e)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = router
