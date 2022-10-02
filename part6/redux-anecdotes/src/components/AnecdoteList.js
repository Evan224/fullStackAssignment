import { addVote} from '../reducers/anecdoteReducer'
import { setNotification,hideNotification } from '../reducers/notificationReducer'

import { voteAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

const AnecdoteList = (props) => {
    // const anecdotes = useSelector(({ anecdotes }) => {
    //     return [...anecdotes].sort((a, b) => {
    //       return b.votes - a.votes
    //     })
    //   })

    let anecdotes=[...props.anecdotes].sort((a, b) => {
        return b.votes - a.votes
      }
    )
    // console.log(anecdotes,'anecdotes')
    // const filter=useSelector(({ filter }) => filter)
    const filter=props.filter
  
    const vote =async (id) => {
      const anecdote = anecdotes.find(a => a.id === id)
      // dispatch(voteAnecdote(id))
      props.voteAnecdote(id);
      props.setNotification(`you voted '${anecdote.content}'`,5)
      // dispatch(setNotification(`You voted '${anecdote.content}'`,5))
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

const mapStateToProps = (state) => {
    return {
      anecdotes: state.anecdotes,
      filter: state.filter
    }
  }

  const mapDispatchToProps = {
    addVote,
    setNotification,
    hideNotification,
    voteAnecdote
  }

  const ConnectedAnecdoteList = connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)

export default ConnectedAnecdoteList