import { useDispatch } from 'react-redux'
import { setFilter} from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = (props) => {
    const handleChange = (event) => {
        event.preventDefault()
        const content=event.target.value;
        props.setFilter(content)
    }

    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input name="filter" onChange={handleChange} />
      </div>
    )
  }

  const mapStateToProps = (state) => {
    return {
      filter: state.filter
    }
  }

  const mapDispatchToProps = {
    setFilter
  }

  const ConnectedFilter =
   connect(mapStateToProps,mapDispatchToProps)(Filter)
  
  export default ConnectedFilter