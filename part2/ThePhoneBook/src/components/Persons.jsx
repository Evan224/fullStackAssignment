const Persons = ({ persons, filter }) => {

  return (
    <div>
      {persons.map(person => {
        if(person.name.includes(filter)){
          return <p key={person.name}>{person.name} {person.number}</p>
        }
      })}
    </div>
  )
}

export default Persons