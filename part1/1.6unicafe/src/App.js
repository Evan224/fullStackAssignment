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

const StatisticLine=({text,value})=>{
  return(

    <tr>
    <td>{text}</td>
    <td>{value}</td>
    </tr>
  )
}

const Stats=({good,netural,bad})=>{
  const all=good+netural+bad;
  const average=all===0?0:(good-bad)/all;
  const positive=all===0?0:good/all*100;
  if(all===0){
    return(
      <h1>No FeedBack Given</h1>
    )
  }
  return(
    <table>
        <thead>
          <tr>
            <td>statistics</td>
            <td>value</td>
          </tr>
 
        </thead>
        <tbody>
            <StatisticLine text="good" value={good}/>
            <StatisticLine text="neutral" value={netural}/>
            <StatisticLine text="all" value={all}/>
            <StatisticLine text="average" value={average}/>
            <StatisticLine text="positive" value={positive}/>
        </tbody>

    </table>
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