import { useState ,useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import {getAll,addPost,deletePerson} from './services/axios.js';

const App = () => {
  const [persons, setPersons] = useState([]);
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

  const handleDelete=(id)=>{
    console.log("delete",id)
    deletePerson(id).then(response=>{
      console.log(response)
      setPersons(persons.filter(person=>person.id!==id))
    })
  }

  const checkName = (name) => {
    return persons.some(person => person.name === name)
  }

  const addPerson = (event) => {
    event.preventDefault();
    if(checkName(newName)) {
      alert(`${newName} is already added to phonebook`)
      setNewName('')
      setNewNumber('')
    }else{
      const nameObject = {
        name: newName,
        number: newNumber,
      }
      addPost(nameObject).then(responseData=>{
        setPersons(persons.concat(responseData))
        setNewName('')
        setNewNumber('')
      })
    }
  }

  useEffect(() => {
    getAll().then(responseData=>{
      console.log(responseData)
      setPersons(responseData)
    });
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDeletePerson={handleDelete}/>
    </div>
  )
}

export default App