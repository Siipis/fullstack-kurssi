import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import { Glyphicon, Table, Nav, NavItem, Button } from 'react-bootstrap'

import Notification from './components/Notification'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import BlogInfo from './components/BlogInfo'
import UserList from './components/UserList'
import UserInfo from './components/UserInfo'

import blogService from './services/blogs'
import usersService from './services/users'
import loginService from './services/login'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      users: [],
      user: null,
      error: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )

    usersService.getAll().then(users =>
      this.setState({ users })
    )

    const loggedUser = window.localStorage.getItem('loggedUser')

    if (loggedUser) {
      const user = JSON.parse(loggedUser)
      this.setState({ user })
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

      this.setState({ username: '', password: '', user })
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

  addBlogComment = async (event, blog) => {
    event.preventDefault()

    const comment = event.target.comment.value
    event.target.comment.value = ''

    if (blog.comments === undefined) blog.comments = []

    blog.comments.push(comment)

    await blogService.update(blog._id, blog)

    const blogs = this.state.blogs.map(b => {
      if (b._id === blog._id) return blog
      return b
    })

    this.setState({ blogs })

    this.notify(`added comment ${comment}`)
  }

  handleFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    return (
      <div className='container'>
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
            <Router>
              <div>
                <div className='well clearfix' style={{ marginTop: 20 }}>
                  <Nav bsStyle='pills pull-left'>
                    <NavItem>
                      <Link to='/'>blogs </Link>
                    </NavItem>
                    <NavItem>
                      <Link to='/users'>users </Link>
                    </NavItem>
                  </Nav>

                  <div className='pull-right'>
                      <span style={{ lineHeight: '18px', marginRight: 5 }}>{this.state.user.name} logged in</span>
                      <Button onClick={this.logout}>
                        <Glyphicon glyph='off' />
                      </Button>
                  </div>
                </div>

                <Route exact path="/" render={() =>
                  <div>
                    <Togglable buttonLabel='create new blog'>
                      <BlogForm
                        title={this.state.title}
                        author={this.state.author}
                        url={this.state.url}
                        handleChange={this.handleFieldChange}
                        handleSubmit={this.createBlog}
                      />
                    </Togglable>

                    <h2>blogs</h2>
                      <Table striped hover>
                      <tbody>
                        {this.state.blogs.sort((a, b) => a.likes <= b.likes).map(blog =>
                          <Blog key={blog._id} blog={blog} />
                        )}
                      </tbody>
                    </Table>
                  </div>
                } />

                <Route exact path="/users" render={() =>
                  <UserList users={this.state.users} />
                } />

                <Route exact path="/users/:id" render={({ match }) => {
                  const user = this.state.users.find(user => user.id === match.params.id)

                  if (!user) return <p>loading...</p>

                  return (
                    <UserInfo user={user} />
                  )
                }} />

                <Route exact path="/blogs/:id" render={({ match }) => {
                  const blog = this.state.blogs.find(blog => blog._id === match.params.id)

                  if (!blog) return <p>loading...</p>

                  return (
                    <div>
                      <BlogInfo blog={blog}
                        isOwnBlog={blog.user === undefined ? true : (blog.user.username === this.state.user.username)}
                        handleSubmit={(e) => this.addBlogComment(e, blog)}
                        handleUpdate={(e) => this.updateBlog(e, blog)}
                        handleDelete={(e) => this.deleteBlog(e, blog)}
                      />
                    </div>
                  )
                }} />
              </div>
            </Router>
          </div>
        }

      </div>
    )
  }
}

export default App
