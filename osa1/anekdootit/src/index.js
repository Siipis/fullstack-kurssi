import React from 'react'
import ReactDOM from 'react-dom'

const Anecdote = ({text}) => (
  <div>
    {text}
  </div>
)

const Button = ({label, handleClick}) => (
  <button onClick={handleClick}>
    {label}
  </button>
)

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      selected: Math.floor(Math.random() * this.props.anecdotes.length),
      highestVoted: 0,
      votes: this.props.anecdotes.map((item, index) => (0))
    }
  }

  addVote = (index) => (
      () => {
        const votes = [...this.state.votes]
        votes[index] += 1

        const mostVotes = Math.max(...votes)

        this.setState({
          votes: votes,
          highestVoted: votes.indexOf(mostVotes)
        })
      }
  )

  nextVote = () => (
    this.setState({
      selected: Math.floor(Math.random() * this.props.anecdotes.length)
    })
  )

  render() {
    return (
      <div>
        <Anecdote text={this.props.anecdotes[this.state.selected]} />

        <Button label="vote" handleClick={this.addVote(this.state.selected)} />
        <Button label="next anecdote" handleClick={this.nextVote} />

        <h1>anecdote with most votes</h1>

        <Anecdote text={this.props.anecdotes[this.state.highestVoted]} />

        <div>
          has {Math.max(...this.state.votes)} votes
        </div>
      </div>
    )
  }
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
