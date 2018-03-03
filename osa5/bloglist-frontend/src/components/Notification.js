import React from 'react'
const Notification = ({message}) => (
  <div style={{ color: 'teal', fontWeight: 'bold', padding: 10, border: '1px solid teal', marginBottom: 20 }}>
    {message}
  </div>
)

export default Notification
