import React from 'react'

const Filter = ({handleChange, filter}) => (
  <div>
    rajaa näytettäviä: <input value={filter}
      onChange={handleChange} />
  </div>
)

export default Filter
