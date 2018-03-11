import React from 'react'
import PropTypes from 'prop-types'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

const LoginForm = ({ handleSubmit, handleChange, username, password }) => (
  <div>
    <h2>Log in to application</h2>

    <form onSubmit={handleSubmit}>
      <FormGroup>
        <ControlLabel>username:</ControlLabel>
        <FormControl
          type="text"
          name="username"
          value={username}
          onChange={handleChange}
        />
      </FormGroup>
      <FormGroup>
        <ControlLabel>password:</ControlLabel>
        <FormControl
          type="password"
          name="password"
          value={password}
          onChange={handleChange}
        />
      </FormGroup>
      <Button bsStyle='primary' type="submit">login</Button>
    </form>
  </div>
)

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleChange: PropTypes.func.isRequired
}

export default LoginForm
