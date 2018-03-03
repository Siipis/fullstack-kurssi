import React from 'react';

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      input: ''
    }
  }

  handleInputChange = (e) => {
    this.setState({
      input: e.target.value
    })
  }

  addVote = (anecdote) => {
    this.props.store.dispatch({ type: 'vote', data: anecdote })
  }

  addAnecdote = (e) => {
    e.preventDefault()

    this.props.store.dispatch({ type: 'add', data: this.state.input })
    this.setState({
      input: ''
    })
  }

  render() {
    const anecdotes = this.props.store.getState()
    return (
      <div>
        <h2>Anecdotes</h2>
        {anecdotes.sort((a, b) => a.votes < b.votes).map(anecdote=>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={(e) => this.addVote(anecdote)}>vote</button>
            </div>
          </div>
        )}
        <h2>create new</h2>
        <form onSubmit={this.addAnecdote}>
          <div><input onChange={this.handleInputChange} /></div>
          <button>create</button>
        </form>
      </div>
    )
  }
}

export default App
