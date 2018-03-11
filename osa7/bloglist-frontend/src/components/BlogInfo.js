import React from 'react'

const BlogInfo = ({ handleSubmit, handleUpdate, handleDelete, blog, isOwnBlog }) => (
  <div>
    <h1>{blog.title}</h1>
    <p>
      <a href={blog.url} target="_blank">{blog.url}</a>
    </p>
    <div>
      {blog.likes} likes
      <button onClick={handleUpdate}>like</button>
    </div>
    <p>added by {blog.user === undefined ? 'unknown' : blog.user.name}</p>

    {isOwnBlog ?
      <button onClick={handleDelete}>delete</button> : ''
    }

    <h2>comments</h2>
    <ul>
      { blog.comments === undefined ? '' : blog.comments.map((comment, i) => <li key={i}>{comment}</li>) }
    </ul>

    <form onSubmit={handleSubmit}>
      <input name='comment' />
      <button>add comment</button>
    </form>
  </div>
)

export default BlogInfo
