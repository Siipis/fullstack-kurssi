import React from 'react'
import PropTypes from 'prop-types'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

const BlogForm = ({ handleSubmit, handleChange, title, author, url }) => (
  <div>
    <h2>create new</h2>

    <form onSubmit={handleSubmit}>
      <FormGroup controlId='title'>
        <ControlLabel>title:</ControlLabel>
        <FormControl
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>author:</ControlLabel>
        <FormControl
          type="text"
          name="author"
          value={author}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>url:</ControlLabel>
        <FormControl
          type="text"
          name="url"
          value={url}
          onChange={handleChange}
        />
      </FormGroup>
      <Button bsStyle='success' type="submit">create</Button>
    </form>
  </div>
)

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default BlogForm
