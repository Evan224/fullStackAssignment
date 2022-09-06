import { useState } from 'react'

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



const Stats=({good,netural,bad})=>{
  const all=good+netural+bad;
  const average=all===0?0:(good-bad)/all;
  const positive=all===0?0:good/all*100;
  console.log(good,netural,bad,all);
  return(
    <div>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {netural}</p>
      <p>bad {bad}</p>
      <p>all {all}</p>
      <p>average {average}</p>
      <p>positive {positive}</p>

    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const Buttons=()=>{
    return(
      <div>
        <Button handleClick={()=>setGood(good+1)} text="good"/>
        <Button handleClick={()=>setNeutral(neutral+1)} text="neutral"/>
        <Button handleClick={()=>setBad(bad+1)} text="bad"/>
      </div>
    )
  }

  return (
    <>
      <Header/>
      <Buttons/>
      <Stats good={good} netural={neutral} bad={bad}/>
    </>
  )
}

export default App