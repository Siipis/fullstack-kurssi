const blogs = [
  {
    _id: '5a451df7571c224a31b5c8ce',
    title: 'HTML on helppoa',
    author: 'M. Luuk',
    url: 'http://google.com',
    likes: 1,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  },
  {
    _id: '5a451e21e0b8b04a45638211',
    title: 'Selain pystyy suorittamaan vain javascriptiä',
    author: 'M. Luuk',
    url: 'http://google.com',
    likes: 1,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  },
  {
    _id: '5a451e30b5ffd44a58fa79ab',
    title: 'HTTP-protokollan tärkeimmät metodit ovat GET ja POST',
    author: 'M. Luuk',
    url: 'http://google.com',
    likes: 1,
    user: {
      _id: '5a437a9e514ab7f168ddf138',
      username: 'mluukkai',
      name: 'Matti Luukkainen'
    }
  }
]

const getAll = () => {
  return Promise.resolve(blogs)
}

const setToken = () => {}

const create = async (newObject) => {
  blogs.push(newObject)
}

const update = () => {}

const remove = () => {}

export default { getAll, create, update, remove, setToken }
