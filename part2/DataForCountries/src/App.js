import { useState ,useEffect} from 'react'
import axios from 'axios';

const Country=({country})=>{
  console.log(country);
  return(
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital[0]}</p>
      <p>area {country.area}</p>
      <h2>languages</h2>
      <ul>
        {Object.entries(country.languages).map(([key,value])=><li key={key}>{value}</li>)}
      </ul>
      <img src={country.flag} alt="" width="200"/>
    </div>
  )
}

const Countries=({countries,filter})=>{
  const filteredCountries=countries.filter(country=>country.name.common.toLowerCase().includes(filter.toLowerCase()));
  if(filteredCountries.length>10){
    return <p>Too many matches, specify another filter</p>
  }else if(filteredCountries.length===1){
    return filteredCountries.map(country=><Country key={country.name.common} country={country}/>)
  }else{
    return filteredCountries.map(country=><p key={country.name.common}>{country.name.common}</p>)
  }
}

const App=()=>{
  const [countries,setCountries]=useState([]);
  const [filter,setFilter]=useState('');

  useEffect(()=>{
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response=>{
        setCountries(response.data);
      })
  },[])

  const handleClickInput=(event)=>{
    event.preventDefault();
    setFilter(event.target.value);
  }

  return(
    <div>
      <form>
        find countries <input value={filter} onChange={handleClickInput}/>
      </form>
      <Countries countries={countries} filter={filter}/>
    </div>
  )
}

export default App