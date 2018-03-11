import React from 'react'
import { FormGroup, FormControl, InputGroup, Button, Glyphicon, Well } from 'react-bootstrap'

const BlogInfo = ({ handleSubmit, handleUpdate, handleDelete, blog, isOwnBlog }) => (
  <div>
    <h1>{blog.title}</h1>
    <p>
      <a href={blog.url} target="_blank">{blog.url}</a>
    </p>
    <div>
      <span style={{ fontSize: '120%', lineHeight: '14px', marginRight: 10 }}>
        {blog.likes} likes
      </span>
      <Button bsStyle='success' onClick={handleUpdate}>
        <Glyphicon glyph='thumbs-up' />
      </Button>
    </div>

    <div style={{ marginTop: 20, marginBottom: 20 }}>
      added by {blog.user === undefined ? 'unknown' : blog.user.name}
    </div>

    {isOwnBlog ?
      <Button bsStyle='danger' onClick={handleDelete}>delete</Button> : ''
    }

    <h2>comments</h2>
    { blog.comments === undefined ? '' : blog.comments.map((comment, i) => <Well key={i}>{comment}</Well>) }

    <form onSubmit={handleSubmit} className='col-xs-6'>
      <FormGroup>
        <InputGroup>
          <FormControl name='comment' />
          <InputGroup.Button>
            <Button bsStyle='info'>add comment</Button>
          </InputGroup.Button>
        </InputGroup>
      </FormGroup>
    </form>
  </div>
)

export default BlogInfo
