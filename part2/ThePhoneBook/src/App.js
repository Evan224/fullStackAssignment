import { useState } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')



  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value);
  }

  const handleFilterChange=(event)=>{
    console.log(event.target.value)
    setFilter(event.target.value);
  }

  const checkName = (name) => {
    return persons.some(person => person.name === name)
  }

  const addPerson = (event) => {
    console.log(event)
    event.preventDefault();
    if(checkName(newName)) {
      alert(`${newName} is already added to phonebook`)
    }else{
      const nameObject = {
        name: newName,
        number: newNumber,
      }
      setPersons(persons.concat(nameObject));
    }
    setNewName('')
    setNewNumber('')
  }

  return (
    <div>
      <h2>Phonebook</h2>
      {/* <form>
        <div>
          filter shown with: <input value={filter} onChange={handleFilterChange}/>
        </div>
      </form> */}
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      {/* <form>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit" onClick={addName}>add</button>
        </div>
      </form> */}
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson}/>
      <h2>Numbers</h2>
      {/* {persons.map(person => {
        if(person.name.includes(filter)){
          return <p key={person.name}>{person.name} {person.number}</p>
        }
      })} */}
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App