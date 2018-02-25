const router = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')

router.get('/', async (request, response) => {
  const blogs = await Blog.find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

router.post('/', async (request, response) => {
  try {
    const blog = new Blog(request.body)

    if (blog.author === undefined || blog.title === undefined || blog.url === undefined) {
      return response.status(400).json({ error: 'required fields are missing' })
    }

    if (request.token === null) {
      return response.status(401).json({ error: 'token is missing' })
    }

    const user = await User.findById(request.token.id)

    blog.likes = blog.likes === undefined ? 0 : blog.likes
    blog.user = user

    const savedBlog = await blog.save()

    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog)
  } catch (e) {
    if (e.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: e.message })
    } else {
      console.log(e)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

router.delete('/:id', async (request, response) => {
  try {
    if (request.token === null) {
      return response.status(401).json({ error: 'token is missing' })
    }

    const user = await User.findById(request.token.id)
    const blog = await Blog.findById(request.params.id)

    if (!blog) {
      return response.status(404).end()
    }

    if ( blog.user.toString() === user._id.toString() ) {
      await blog.remove()

      response.status(204).end()
    } else {
      return response.status(401).json({ error: 'only the blog owner can remove this' })
    }
  } catch (e) {
    if (e.name === 'JsonWebTokenError' ) {
      response.status(401).json({ error: e.message })
    } else {
      console.log(e)
      response.status(500).json({ error: 'something went wrong...' })
    }
  }
})

router.put('/:id', async (request, response) => {
  const blog = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = router
