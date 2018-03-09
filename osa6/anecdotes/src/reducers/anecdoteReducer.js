import anecdoteService from '../services/anecdotes'

export const initAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      anecdotes
    })
  }
}

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const anecdote = await anecdoteService.create(content)
    dispatch({
      type: 'CREATE',
      anecdote
    })
  }
}

export const voteForAnecdote = (anecdote) => {
  return async (dispatch) => {
    await anecdoteService.update({ ...anecdote, votes: anecdote.votes+1 })
    dispatch({
      type: 'VOTE',
      id: anecdote.id
    })
  }
}

const reducer = (store = [], action) => {
  console.log(action)
  if (action.type==='INIT') {
    return action.anecdotes
  }
  if (action.type==='VOTE') {
    const old = store.filter(a => a.id !==action.id)
    const voted = store.find(a => a.id === action.id)

    return [...old, { ...voted, votes: voted.votes+1 } ]
  }
  if (action.type === 'CREATE') {
    return store.concat(action.anecdote)
  }

  return store
}

export default reducer
