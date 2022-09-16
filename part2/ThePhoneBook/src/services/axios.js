import axios from 'axios';

// const BASE_URL="http://localhost:3001/api/persons"
// const BASE_URL="https://cool-bush-2690.fly.dev/api/persons"
// const BASE_URL="/api/persons"
let BASE_URL="";
let env=process.env.NODE_ENV;
if(env==="development"){
    BASE_URL="https://cool-bush-2690.fly.dev/api/persons"
    // BASE_URL="http://localhost:3001/api/persons"
}else if(env==="production"){
    BASE_URL="/api/persons"
}
console.log(BASE_URL,'baseURL');

const addPost=(newObject)=>{
    const request=axios.post(BASE_URL,newObject)
    return request.then(response=>response.data)
}

const getAll=()=>{
    const request=axios.get(BASE_URL)
    return request.then(response=>response.data)
}

const deletePerson=(id)=>{
    const request=axios.delete(`${BASE_URL}/${id}`)
    return request.then(response=>response.data)
}

const updatePerson=(id,newPerson)=>{
    const request=axios.put(`${BASE_URL}/${id}`,newPerson)
    // console.log(request);
    return request.then(response=>response.data)
}

export {addPost,getAll,deletePerson,updatePerson}