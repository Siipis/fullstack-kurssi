import React from 'react'
import { connect } from 'react-redux'
import { voteForAnecdote } from '../reducers/anecdoteReducer'
import { notify } from '../reducers/notificationReducer'
import Filter from '../components/Filter'
import anecdoteService from '../services/anecdotes'

class AnecdoteList extends React.Component {
  handleClick = (anecdote) => {
    anecdoteService.update({ ...anecdote, votes: anecdote.votes+1 })
    this.props.voteForAnecdote(anecdote)
    this.props.notify(`you voted for "${anecdote.content}"`)
  }

  render() {
    const anecdotes = this.props.anecdotes

    return (
      <div>
        <h2>Anecdotes</h2>
        <Filter />
        {anecdotes.map(anecdote =>
          <div key={anecdote.id}>
            <div>
              {anecdote.content}
            </div>
            <div>
              has {anecdote.votes}
              <button onClick={() => this.handleClick(anecdote)}>
                vote
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }
}

const anecdotesToShow = (anecdotes, filter) => {
  return anecdotes.filter(a => a.content.includes(filter)).sort((a, b) => b.votes - a.votes)
}

const mapStateToProps = (state) => {
  return {
    anecdotes: anecdotesToShow(state.anecdotes, state.filter)
  }
}

const mapDispatchToProps = {
  voteForAnecdote,
  notify
}

const ConnectedAnecdoteList = connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)

export default ConnectedAnecdoteList
