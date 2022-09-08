import axios from 'axios';

const BASE_URL="http://localhost:3001/persons"

const addPost=(newObject)=>{
    const request=axios.post(BASE_URL,newObject)
    return request.then(response=>response.data)
}

const getAll=()=>{
    const request=axios.get(BASE_URL)
    return request.then(response=>response.data)
}

export default {addPost,getAll}