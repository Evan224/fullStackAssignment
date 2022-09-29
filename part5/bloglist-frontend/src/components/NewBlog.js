import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'

const NewBlog=({ addCallback,blog }) => {
  const [title,setTitle]=useState('')
  const [author,setAuthor]=useState('')
  const [url,setUrl]=useState('')

  const createBlog=async (event) => {
    event.preventDefault()
    let blogObject={
      title:title,
      author:author,
      url:url,
    }
    await console.log(blog)
    try{
       const response=await blogService.create(blogObject)

    }catch{
      console.log('error')
    }
    addCallback({title:blog.title})
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
          type="text"
          value={title}
          name="Username"
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
            author
        <input
          type="text"
          value={author}
          name="Username"
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
            url
        <input
          type="text"
          value={url}
          name="Username"
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button onClick={createBlog}>create</button>
    </form>
  )
}

export default NewBlog