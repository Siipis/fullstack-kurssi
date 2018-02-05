import React from 'react';

import './index.css'

import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import Notification from './components/Notification'
import PersonsService from './services/Persons'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      persons: [],
      newName: '',
      newNumber: '',
      filter: '',
      notification: null
    }
  }

  componentWillMount = () => {
    PersonsService.getAll()
      .then(persons => {
        this.setState({ persons })
      })
  }

  handleFilterChange = (event) => {
    this.setState({
      filter: event.target.value
    })
  }

  handleNameChange = (event) => {
    this.setState({
      newName: event.target.value
    })
  }

  handleNumberChange = (event) => {
    this.setState({
      newNumber: event.target.value
    })
  }

  addName = (event) => {
    event.preventDefault()

    if (this.state.newName === '' || this.state.newNumber === '') return

    const person = {
      name: this.state.newName,
      number: this.state.newNumber
    }

    const existing = this.state.persons.find(p => p.name === person.name)

    if (existing) {
      if (window.confirm(`${person.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
        const changed = { ...existing, name: person.name, number: person.number }

        PersonsService.update(changed)
          .then(response => {
            this.setNotification(`${person.name} on nyt päivitetty`)

            this.setState({
              persons: this.state.persons.map(p => p.name !== changed.name ? p : changed)
            })
          })
          .catch(error => {
            this.setNotification(`Tietojen päivittäminen epäonnistui. Lataa sivu uudelleen`)
          })
      }

      this.setState({
        newName: '',
        newNumber: ''
      })

      return
    }

    PersonsService.create(person)
      .then(response => {
        const persons = this.state.persons.concat(response.data)

        this.setNotification(`Lisätty henkilö ${response.data.name}`)

        this.setState({
          persons: persons,
          newName: '',
          newNumber: ''
         })
      })
  }

  deleteName = (person) => {
    if (window.confirm(`Poistetaanko ${person.name}?`)) {
      PersonsService.remove(person)
        .then(respone => {
          const persons = this.state.persons.filter(p => p.id !== person.id)

          this.setNotification(`Poistettiin onnistuneesti ${person.name}`)

          this.setState({ persons })
        })
    }
  }

  setNotification = (message) => {
    this.setState({
      notification: message
    })

    setTimeout(() => {
      this.setState({
        notification: null
      })
    }, 5000)
  }

  render() {
    const filteredPersons =
      this.state.filter === '' ?
        this.state.persons :
        this.state.persons.filter(
          person => person.name.toLowerCase()
            .includes(this.state.filter.toLowerCase())
        )

    return (
      <div>
        <h2>Puhelinluettelo</h2>
        <Notification message={this.state.notification} />

        <Filter handleChange={this.handleFilterChange} value={this.state.filter} />

        <h2>Lisää uusi</h2>
        <Form app={this} />

        <h2>Numerot</h2>
        <Persons persons={filteredPersons} deleteName={this.deleteName} />
      </div>
    )
  }
}

export default App
