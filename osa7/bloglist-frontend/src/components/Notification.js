import React from 'react'
import { Alert } from 'react-bootstrap'

const Notification = ({ message }) => (
  <Alert bsStyle='info'>
    {message}
  </Alert>
)

export default Notification
