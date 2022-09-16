import { useState ,useEffect} from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import {getAll,addPost,deletePerson,updatePerson} from './services/axios.js';
import Notification from './components/Notification';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [message, setMessage] = useState(null)
  const [messageType, setMessageType] = useState(null);

  const handleNameChange = (event) => {
    // console.log(event.target.value)
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    // console.log(event.target.value)
    setNewNumber(event.target.value);
  }

  const handleFilterChange=(event)=>{
    // console.log(event.target.value)
    setFilter(event.target.value);
  }

  const handleDelete=(id)=>{
    // console.log("delete",id)
    deletePerson(id).then(response=>{
      setMessage(`${persons.find(person=>person.id===id).name} has already been deleted`)
      setMessageType('success')
      setTimeout(()=>{
        setMessage(null)
        setMessageType(null)
      },5000)

      setPersons(persons.filter(person=>person.id!==id))
    }).catch(error=>{
      setMessage(`Information of ${persons.find(person=>person.id===id).name} has already been removed from server`)
      setMessageType('error')
      setTimeout(()=>{
        setMessage(null)
        setMessageType(null)
      },5000)
    })
  }

  const checkName = (name) => {
    return persons.some(person => person.name === name)
  }

  const addPerson = (event) => {
    event.preventDefault();
    if(checkName(newName)) {
      const choose=window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`);
      if(choose){
        const newPerson=persons.find(person=>person.name===newName);
        const changedPerson={...newPerson,number:newNumber};
        // console.log(changedPerson,'and',newPerson);
        updatePerson(newPerson.id,changedPerson).then(response=>{
          console.log(response,'updated')
          setPersons(persons.map(person=>person.id!==response.id?person:response))
          setMessage(`Changed ${newPerson.name}'s phonenumber to ${newNumber}`)
          setMessageType('success');
          setTimeout(() => {
            setMessage(null)
            setMessageType(null);
          }, 5000)
        }).catch(error=>{
          // console.log(error,'error');
          setMessage(`Information of ${newPerson.name} has already been removed from server`)
          setMessageType('error');
          setTimeout(() => {
            setMessage(null)
            setMessageType(null);
          }, 5000)
        })
      }else{

      }
      setNewName('')
      setNewNumber('')
    }else{
      const nameObject = {
        name: newName,
        number: newNumber,
      }
      addPost(nameObject).then(responseData=>{
        setMessage(`Added ${responseData.name}`)
        setMessageType('success');
        setTimeout(() => {
          setMessage(null)
          setMessageType(null);
        }, 5000)
        setPersons(persons.concat(responseData))
        setNewName('')
        setNewNumber('')
      }).catch(error=>{
        // console.log(error.response.data.error);
        setMessage(error.response.data.error)
        setMessageType('error');
        setTimeout(() => {
          setMessage(null)
          setMessageType(null);
        }, 5000)
      })
    }
  }

  useEffect(() => {
    getAll().then(responseData=>{
      // console.log(responseData)
      setPersons(responseData)
    });
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} type={messageType}/>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h2>add a new</h2>
      <PersonForm newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Persons persons={persons} filter={filter} handleDeletePerson={handleDelete}/>
    </div>
  )
}

export default App