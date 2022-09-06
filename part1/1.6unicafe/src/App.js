import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Header=()=>{
    return(
      <h1>give feedback</h1>
    )
  }

  const Button=({handleClick,text})=>{
    return(
      <button onClick={handleClick}>{text}</button>
    )
  }

  const Buttons=()=>{
    return(
      <div>
        <Button handleClick={()=>setGood(good+1)} text="good"/>
        <Button handleClick={()=>setNeutral(neutral+1)} text="neutral"/>
        <Button handleClick={()=>setBad(bad+1)} text="bad"/>
      </div>
    )
  }

  const Stats=({good,netural,bad})=>{
    return(
      <div>
        <h1>statistics</h1>
        <p>good {good}</p>
        <p>neutral {neutral}</p>
        <p>bad {bad}</p>
      </div>
    )
  }

  return (
    <>
      <Header/>
      <Buttons/>
      <Stats good={good} neutral={neutral} bad={bad}/>
    </>
  )
}

export default App