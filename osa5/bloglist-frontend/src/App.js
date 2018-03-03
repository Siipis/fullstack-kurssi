import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import blogService from './services/blogs'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      user: null,
      error: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    const loggedUser = window.localStorage.getItem('loggedUser')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      this.setState({user})
      blogService.setToken(user.token)
    }
  }

  notify = (message) => {
    this.setState({
      error: message,
    })
    setTimeout(() => {
      this.setState({ error: null })
    }, 5000)
  }

  login = async (event) => {
    event.preventDefault()
    try{
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      this.setState({ username: '', password: '', user})
      blogService.setToken(user.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(user))
    } catch(exception) {
      console.log(exception)
      this.notify('invalid username or password')
    }
  }

  logout = async (event) => {
    event.preventDefault()

    this.setState({
      user: null
    })
    blogService.setToken(null)
    window.localStorage.clear()
  }

  createBlog = async (event) => {
    event.preventDefault()

    try{
      const savedBlog = await blogService.create({
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      })

      this.notify(`a new blog "${savedBlog.title}" by ${savedBlog.author} was added`)

      const blogs = this.state.blogs.concat(savedBlog)
      this.setState({ blogs })
    } catch(exception) {
      console.log(exception)
      this.notify('could not create blog')
    }
  }

  updateBlog = async (event, blog) => {
    event.preventDefault()

    try{
      let newBlog = {
        likes: blog.likes + 1,
        title: blog.title,
        url: blog.url
      }

      if (blog.user !== undefined) {
        newBlog.user = blog.user._id.toString()
      }

      await blogService.update(blog._id, newBlog)

      const blogs = this.state.blogs.map(b => {
        if (b._id === blog._id) b.likes++
        return b
      })

      this.setState({ blogs })
    } catch(exception) {
      console.log(exception)
      this.notify('could not update blog')
    }
  }

  deleteBlog = async (event, blog) => {
    event.preventDefault()

    if (window.confirm(`delete '${blog.title}' by ${blog.author}?`)) {
      try{
        await blogService.remove(blog._id)

        const blogs = this.state.blogs.filter(b => b._id !== blog._id)

        this.setState({ blogs })
      } catch(exception) {
        console.log(exception)
        this.notify('could not delete blog')
      }
    }
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div>
        {this.state.error === null ?
          <div></div> :
          <Notification message={this.state.error} />
        }

        {this.state.user === null ?
          <Togglable buttonLabel="login">
            <LoginForm
              username={this.state.username}
              password={this.state.password}
              handleChange={this.handleFieldChange}
              handleSubmit={this.login}
            />
          </Togglable> :
          <div>
            <div>
              {this.state.user.name} logged in
              <button onClick={this.logout}>logout</button>
            </div>

            <BlogForm
              title={this.state.title}
              author={this.state.author}
              url={this.state.url}
              handleChange={this.handleFieldChange}
              handleSubmit={this.createBlog}
            />

            <h2>blogs</h2>
            {this.state.blogs.sort((a, b) => a.likes <= b.likes).map(blog =>
              <Blog key={blog._id} blog={blog}
                isOwnBlog={blog.user === undefined ? true : (blog.user.username === this.state.user.username)}
                handleUpdate={(e) => this.updateBlog(e, blog)}
                handleDelete={(e) => this.deleteBlog(e, blog)}
              />
            )}
          </div>
          }

      </div>
    )
  }
}

export default App
