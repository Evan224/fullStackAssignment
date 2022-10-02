import { useSelector, useDispatch } from 'react-redux'
import { addVote} from '../reducers/anecdoteReducer'
import { setNotification,hideNotification } from '../reducers/notificationReducer'


const AnecdoteList = () => {
    const anecdotes = useSelector(({ anecdotes }) => {
        return [...anecdotes].sort((a, b) => {
          return b.votes - a.votes
        })
      })
    console.log(anecdotes,'anecdotes')
    const filter=useSelector(({ filter }) => filter)
    const dispatch = useDispatch()
  
    const vote = (id) => {
      dispatch(addVote(id))
      dispatch(setNotification(`You voted '${anecdotes.find(a => a.id === id).content}'`))
      setTimeout(() => {
        dispatch(hideNotification())
      }, 5000)
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