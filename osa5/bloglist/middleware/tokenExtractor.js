const jwt = require('jsonwebtoken')

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    const token = authorization.substring(7)
    const decodedToken = jwt.verify(token, process.env.SECRET)

    if (!token || !decodedToken) {
      return response.status(401).json({ error: 'token is invalid' })
    }

    request.token = decodedToken
  } else {
    request.token = null
  }

  next()
}

module.exports = tokenExtractor
