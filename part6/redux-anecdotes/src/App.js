import { useSelector, useDispatch } from 'react-redux'
import { addVote,addAnecdote} from './reducers/anecdoteReducer'

const orderByVotes=(anecdote)=>{
  return anecdote.sort((a,b) => b.votes - a.votes)
}
const App = () => {
  const anecdotes = useSelector(state => orderByVotes(state))
  const dispatch = useDispatch()

  const vote = (id) => {
    console.log('vote', id)
    dispatch(addVote(id))
  }

  const add = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(addAnecdote(content))
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name="anecdote"/></div>
        <button >create</button>
      </form>
    </div>
  )
}

export default App