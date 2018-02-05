import React from 'react'

const Form = ({app}) => (
  <form onSubmit={app.addName}>
    <div>
      nimi: <input value={app.state.newName}
      onChange={app.handleNameChange} />
    </div>
    <div>
      numero: <input value={app.state.newNumber}
      onChange={app.handleNumberChange} />
    </div>
    <div>
      <button type="submit">lisää</button>
    </div>
  </form>
)

export default Form
