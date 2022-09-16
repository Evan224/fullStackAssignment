import { useState ,useEffect} from 'react'
import axios from 'axios';

const Weather=({weather})=>{
  return(
    <div>
      <p>the current temperature is {weather.main.temp} ℉</p>
      <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="2"></img>
      <p>Wind {weather.wind.speed} m/s</p>
    </div>
  )
}
const Country=({country})=>{

  const [lat,lon]=country.latlng;
  const api_key = process.env.REACT_APP_API_KEY;
  const [weather,setWeather]=useState({});
  useEffect(()=>{
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}`)
      .then(response=>{
        // console.log(weather);
        setWeather(response.data);
      })
  },[lat,lon,api_key])
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
      <h1>Weather in {country.name.common}</h1>
      {weather.main&&<Weather weather={weather}/>}
    </div>
  )
}

const Countries=({countries,filter,handleClickShow})=>{
  const filteredCountries=countries.filter(country=>country.name.common.toLowerCase().includes(filter.toLowerCase()));
  if(filteredCountries.length>10){
    return <p>Too many matches, specify another filter</p>
  }else if(filteredCountries.length===1){
    return filteredCountries.map(country=><Country key={country.name.common} country={country}/>)
  }else{
    return filteredCountries.map(country=>{
     
      return(
        <div key={country.name.common}>
          <span>{country.name.common}</span>
          <button onClick={(event)=>handleClickShow(event,country.name.common)} >Show</button>
        </div>
      )
    })
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

  const handleClickShow=(event,name)=>{
    event.preventDefault();
    setFilter(name);
  }

  return(
    <div>
      <form>
        find countries <input value={filter} onChange={handleClickInput}/>
      </form>
      <Countries countries={countries} filter={filter} handleClickShow={handleClickShow}/>
    </div>
  )
}

export default App