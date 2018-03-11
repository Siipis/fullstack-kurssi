import React from 'react'

import { Table } from 'react-bootstrap'

const UserInfo = ({ user }) => (
  <div>
    <h1>{user.name}</h1>
    <h2>added blogs</h2>

    <Table striped>
    <tbody>
      { user.blogs.map(blog => <tr key={blog.id}><td>{blog.title}</td></tr>) }
    </tbody>
    </Table>
  </div>
)

export default UserInfo
