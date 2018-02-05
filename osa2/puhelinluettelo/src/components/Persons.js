import React from 'react'

const Persons = ({deleteName, persons}) => (
  <table>
  <tbody>
    { persons.map(person => <Person key={person.name} person={person} deleteName={deleteName} /> ) }
  </tbody>
  </table>
)

const Person = ({deleteName, person}) => (
  <tr>
    <td>{person.name}</td>
    <td>{person.number}</td>
    <td>
      <button onClick={() => deleteName(person)}>poista</button>
    </td>
  </tr>
)

export default Persons
