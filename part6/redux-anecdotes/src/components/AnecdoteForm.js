import { useDispatch } from 'react-redux'
import { addAnecdote} from '../reducers/anecdoteReducer'
import { setNotification,hideNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdote'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const add = async (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(createAnecdote(content))
        dispatch(setNotification(`You added '${content}'`,5))
      }
    return(
        <>
            <h2>create new</h2>
            <form onSubmit={add}>
            <div><input name="anecdote"/></div>
            <button >create</button>
            </form>
        </>
    )
}

export default AnecdoteForm