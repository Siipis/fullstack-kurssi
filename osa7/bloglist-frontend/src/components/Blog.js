import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => (
  <div style={{ border: '1px solid #ccc', marginBottom: 5, padding: 10 }}>
    <Link to={ `/blogs/${blog._id}` }>
      {blog.title} {blog.author}
    </Link>
  </div>
)

export default Blog
