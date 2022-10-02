import { useSelector, useDispatch } from 'react-redux'
import { addVote} from '../reducers/anecdoteReducer'
import { setNotification,hideNotification } from '../reducers/notificationReducer'

import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes }) => {
        return [...anecdotes].sort((a, b) => {
          return b.votes - a.votes
        })
      })
    // console.log(anecdotes,'anecdotes')
    const filter=useSelector(({ filter }) => filter)
    const dispatch = useDispatch()
  
    const vote =async (id) => {
      const anecdote = anecdotes.find(a => a.id === id)
      dispatch(voteAnecdote(id))
      dispatch(setNotification(`You voted '${anecdote.content}'`,5))
    }

    return (
        <>
        {anecdotes.map(anecdote =>
        {
            if(anecdote.content.includes(filter)){
              return(
                <div key={anecdote.id}>
                <div>
                  {anecdote.content}
                </div>
                <div>
                  has {anecdote.votes}
                  <button onClick={() => vote(anecdote.id)}>vote</button>
                </div>
              </div>
              )
            }
            return null
        }

          )}
          </>
    )
}

export default AnecdoteList