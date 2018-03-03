import React from 'react'
import PropTypes from 'prop-types'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      collapsed: true
    }
  }

  toggleCollapse = () => {
    this.setState({collapsed: !this.state.collapsed})
  }

  render() {
    const blog = this.props.blog

    return (
      <div style={{ border: '1px solid #ccc', marginBottom: 5, padding: 10 }} className="blog">
        <p onClick={this.toggleCollapse} style={{ cursor: 'pointer' }} className="blog__header">
          {blog.title} {blog.author}
        </p>
        <div style={{ paddingLeft: 10, display: this.state.collapsed ? 'none' : '' }} className="blog__content">
          <p>
            <a href={blog.url} target="_blank">{blog.url}</a>
          </p>
          <div>
            {blog.likes} likes
            <button onClick={this.props.handleUpdate}>like</button>
          </div>
          <p>added by {blog.user === undefined ? 'unknown' : blog.user.name}</p>

          {this.props.isOwnBlog ?
            <button onClick={this.props.handleDelete}>delete</button> : ''
          }
        </div>
      </div>
    )
  }
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  isOwnBlog: PropTypes.bool.isRequired,
  handleUpdate: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired
}

export default Blog
