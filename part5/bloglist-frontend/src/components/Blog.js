import { useEffect, useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog,refresh }) => {
  // console.log(blog,'blogblogblog')
  const [newblog,setBlog]=useState(blog)
  const [showAll,setShowAll]=useState(false)
  useEffect(() => {
    setBlog(blog)
  },[blog])
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const deleteBlog=async () => {
    if(window.confirm(`Are you sure to delete ${blog.title}?`)){
      await blogService.remove(blog.id)
      // setBlog(null)
      refresh()
    }

  }

  const addLike=async () => {
    const newBlog={ ...newblog,likes:newblog.likes+1 }
    await blogService.update(blog.id,newBlog)
    setBlog(newBlog)
  }



  return(
    <div style={blogStyle} className="blog">
      {!showAll? (   <div >
        <p>{newblog.title}</p> <p>{newblog.author}</p> <button onClick={() => setShowAll(!showAll)}>view</button>
      </div> )
        : ( <div>
          <div>{newblog.title} {newblog.author} <button onClick={() => setShowAll(!showAll)}>hide</button></div>
          <div>{newblog.url}</div>
          <div>likes {newblog.likes} <button onClick={addLike}>like</button></div>
          <div>{newblog.user && newblog.user.name }</div>
          <button onClick={deleteBlog}>DELETE</button>
        </div>) }
    </div>

  )

}

export default Blog