import React from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blog }) => (
  <tr><td>
    <Link to={ `/blogs/${blog._id}` }>
      {blog.title} {blog.author}
    </Link>
  </td></tr>
)

export default Blog
