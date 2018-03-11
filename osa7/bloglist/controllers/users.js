const bcrypt = require('bcrypt')
const router = require('express').Router()
const User = require('../models/user')

const format = (user) => {
  return {
    id: user.id,
    username: user.username,
    name: user.name,
    adult: user.adult,
    blogs: user.blogs
  }
}

router.get('/', async (request, response) => {
  try {
    const users = await User.find({})
      .populate('blogs')
    response.json(users.map(format))
  } catch (e) {
    console.log(e)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

router.post('/', async (request, response) => {
  try {
    const body = request.body

    if (body.username === undefined) {
      return response.status(400).json({ error: 'username is required' })
    }

    if (body.name === undefined) {
      return response.status(400).json({ error: 'name is required' })
    }

    if (body.password === undefined) {
      return response.status(400).json({ error: 'password is required' })
    }

    if (body.password.length < 3) {
      return response.status(400).json({ error: 'password must be at least 3 characters' })
    }

    const existingUser = await User.find({ username: body.username })

    if (existingUser.length > 0) {
      return response.status(400).json({ error: 'username must be unique' })
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      adult: body.adult ? body.adult : true,
      passwordHash
    })

    const savedUser = await user.save()

    response.status(201).json(savedUser)
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = router
