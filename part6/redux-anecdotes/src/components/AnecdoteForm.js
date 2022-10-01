import { useDispatch } from 'react-redux'
import { addAnecdote} from '../reducers/anecdoteReducer'
import { setNotification,hideNotification } from '../reducers/notificationReducer'


const AnecdoteForm = () => {
    const dispatch = useDispatch()
    const add = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        dispatch(addAnecdote(content))
        dispatch(setNotification(`You added '${content}'`))
        setTimeout(() => {
            dispatch(hideNotification())
        }, 5000)
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