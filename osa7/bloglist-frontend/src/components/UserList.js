import React from 'react'
import { Link } from 'react-router-dom'

import { Table } from 'react-bootstrap'

const UserList = ({ users }) => (
  <div>
    <h2>users</h2>

    <Table striped hover>
      <thead>
        <tr>
          <th>username</th>
          <th>blogs added</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user =>
          <tr key={user.id}>
            <td>
              <Link to={ `/users/${user.id}` }>{user.name}</Link>
            </td>
            <td>{user.blogs.length}</td>
          </tr>
        )}
      </tbody>
    </Table>
  </div>
)

export default UserList
