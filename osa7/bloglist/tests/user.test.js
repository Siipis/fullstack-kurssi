const supertest = require('supertest')
const { app, server } = require('../index')
const api = supertest(app)
const User = require('../models/user')
const { newUser, newFaultyUser, usersInDb } = require('./test_helper')

beforeAll(async () => {
  await User.remove({})
})

describe('create users', () => {
  beforeEach(async () => {
    await User.remove({})
  })

  test('users can be added', async () => {
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  })

  test('users are stored correctly', async () => {
    const response = await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    expect(response.body.username).toBe('test')
    expect(response.body.name).toBe('Tessa Tester')
    expect(response.body.passwordHash).toBeDefined()
  })

  test('duplicate users can\'t be created', async () => {
    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
  })

  test('input is validated', async () => {
    const response = await api
      .post('/api/users')
      .send(newFaultyUser)
      .expect(400)

    expect(response.body).toEqual({ error: 'password must be at least 3 characters' })
  })})

afterAll(() => {
  server.close()
})
