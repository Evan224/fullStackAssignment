
const App = () => {
  const course = 'Half Stack application development'
  const parts = [
    {
      name: 'Fundamentals of React',
      exercises: 10
    },
    {
      name: 'Using props to pass data',
      exercises: 7
    },
    {
      name: 'State of a component',
      exercises: 14
    }
  ]

  const Header=(props)=>{
    return(
      <h1>{props.course}</h1>
    )
  }

  const Part=(props)=>{
    const {part} =props;
    return(
      <div>
        <p>{part.name} {part.exercises}</p>
      </div>
    )
  }

  const Content=(props)=>{
    const parts=props.parts;

    return(
      <>
        <Part part={parts[0]}/>
        <Part part={parts[1]}/>
        <Part part={parts[2]}/>
      </>
    )
  }

  const Total=(props)=>{
    const parts=props.parts;
    console.log(parts);
    return(
      <p>Number of exercises {parts[0].exercises+
        parts[1].exercises+parts[2].exercises}</p>
    )
  }

  return (
    <div>
      <Header course={course}/>
      <Content parts={parts} />
      <Total parts={parts} />
    </div>
  )
}

export default App