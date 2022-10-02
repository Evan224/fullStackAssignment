import { useState } from 'react'
// import loginService from '../services/login'
// import blogService from '../services/blogs'
import { useDispatch } from 'react-redux'
import { createBlogs } from '../reducers/blogReducer'

const NewBlog=() => {
  const [title,setTitle]=useState('')
  const [author,setAuthor]=useState('')
  const [url,setUrl]=useState('')
  const dispatch=useDispatch()

  const createBlog=async (event) => {
    event.preventDefault()
    const blogObject={
      title:title,
      author:author,
      url:url,
    }
    // let response={}
    try{
      await dispatch(createBlogs(blogObject))
    }catch(exception){
      console.log(exception)
    }
    // console.log(response)
    // addCallback(response)
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return(
    <form>
      <div>
            title
        <input
          id="title"
          type="text"
          value={title}
          name="Username"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
            author
        <input
          id="author"
          type="text"
          value={author}
          name="Username"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
            url
        <input
          id="username"
          type="text"
          value={url}
          name="Username"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id="create-button" onClick={createBlog}>create</button>
    </form>
  )
}

export default NewBlog