const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) => {
  let total = 0

  blogs.forEach(blog => {
    total += blog.likes
  })

  return total
}

const favouriteBlog = (blogs) => {
  let favourite = {}

  blogs.forEach(blog => {
    favourite = Object.keys(favourite).length === 0 || blog.likes > favourite.likes ? blog : favourite
  })

  return favourite
}

const mostBlogs = (blogs) => {
  let most = {
    author: '',
    blogs: 0
  }

  const authors = [... new Set(blogs.map(blog => blog.author))]

  authors.forEach(author => {
    let count = blogs.filter(blog => blog.author === author).length

    if (count > most.blogs) {
      most.author = author
      most.blogs = count
    }
  })

  return most
}

const mostLikes = (blogs) => {
  let most = {
    author: '',
    blogs: 0
  }

  const authors = [... new Set(blogs.map(blog => blog.author))]

  authors.forEach(author => {
    let count = blogs.filter(blog => blog.author === author).reduce((total, blog) => total + blog.likes, 0)

    if (count > most.blogs) {
      most.author = author
      most.blogs = count
    }
  })

  return most
}

module.exports = {
  dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes
}
