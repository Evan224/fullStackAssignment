import { useSelector, useDispatch } from 'react-redux'
import { addVote} from '../reducers/anecdoteReducer'
const orderByVotes=(anecdote)=>{
    return anecdote.sort((a,b) => b.votes - a.votes)
  }

const AnecdoteList = () => {
    const anecdotes = useSelector(state => orderByVotes(state))
    const dispatch = useDispatch()
  
    const vote = (id) => {
      console.log('vote', id)
      dispatch(addVote(id))
    }

    return (
        <>
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
          </>
    )
}

export default AnecdoteList