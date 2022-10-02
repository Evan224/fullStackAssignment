import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdote'


const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState:[],
  reducers: {
    addVote(state, action){
      const id = action.payload
      const current = state.find(a => a.id === id)
      const changedAnecdote = {
        ...current,
        votes: current.votes + 1
      }
      return state.map(current =>
        current.id !== id ? current : changedAnecdote
      )
    },
    addAnecdote(state, action){
      return [...state,action.payload]
    },
    setAnecdotes(state, action){
      return action.payload
    },
    appendAnecdote(state, action){
      return state.concat(action.payload)
    }
  }
})

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (content) => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const voteAnecdote = (id) => {
  return async dispatch => {
    const current = await anecdoteService.getOne(id)
    const changedAnecdote = {
      ...current,
      votes: current.votes + 1
    }
    console.log(current,'current',changedAnecdote,'changedAnecdote')
    await anecdoteService.update(id,changedAnecdote)
    dispatch(addVote(id))
  }
}

export const { addVote, addAnecdote,setAnecdotes,appendAnecdote} = anecdoteSlice.actions
export default anecdoteSlice.reducer