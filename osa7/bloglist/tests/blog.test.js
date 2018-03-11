const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const Blog = require('../models/blog')
const { initialBlogs, newBlog, newFaultyBlog, newBlogWithNoLikes, formatBlog, blogsInDb } = require('./test_helper')

beforeAll(async () => {
  await Blog.remove({})

  const blogObjects = initialBlogs.map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)
})

describe('get blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const totalBlogs = await blogsInDb()

    const response = await api
      .get('/api/blogs')

    expect(response.body.length).toBe(totalBlogs.length)
  })

  test('a specific blog is within the returned results', async () => {
    const totalBlogs = await blogsInDb()

    const response = await api
      .get('/api/blogs')

    expect(response.body[0].title).toEqual(totalBlogs[0].title)
  })
})

describe('post blogs', () => {
  test('blogs can be added', async () => {
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('blogs are stored correctly', async () => {
    const response = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)

    expect(response.body.title).toBe('React patterns #2')
    expect(response.body.author).toBe('Michael Chan')
  })

  test('blogs likes is set to zero', async () => {
    const response = await api
      .post('/api/blogs')
      .send(newBlogWithNoLikes)
      .expect(201)

    expect(response.body.likes).toBe(0)
  })

  test('bad input returns error', async () => {
    const newBlog = {}

    const response = await api
      .post('/api/blogs')
      .send(newFaultyBlog)
      .expect(400)
  })
})

describe('delete blogs', () => {
  let addedBlog

  beforeAll(async () => {
    addedBlog = new Blog(newBlog)
    await addedBlog.save()
  })

  test('blogs are deleted correctly', async () => {
    const totalBlogs = await blogsInDb()

    await api
      .delete(`/api/blogs/${addedBlog.id}`)
      .expect(204)

    const blogsAfterDelete = await blogsInDb()

    const ids = blogsAfterDelete.map(r => r.id)

    expect(ids).not.toContain(addedBlog.id)
    expect(blogsAfterDelete.length).toBe(totalBlogs.length - 1)
  })
})

describe('update blogs', () => {
  let addedBlog

  beforeAll(async () => {
    addedBlog = new Blog(newBlogWithNoLikes)
    await addedBlog.save()
  })

  test('update blog like count', async () => {
    const response = await api
      .put(`/api/blogs/${addedBlog.id}`)
      .send(newBlog)
      .expect(200)

    expect(response.body.author).toEqual(newBlog.author)
    expect(response.body.title).toEqual(newBlog.title)
    expect(response.body.url).toEqual(newBlog.url)
    expect(response.body.likes).toEqual(newBlog.likes)
  })
})

afterAll(() => {
  server.close()
})
