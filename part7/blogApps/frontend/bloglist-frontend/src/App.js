import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginPage from './components/Login'
import Notification from './components/Notification'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import { useSelector,useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'
import { initializeBlogs } from './reducers/blogReducer'

// const sortWay=(a,b) => {
//   if(!a.likes){
//     a.likes=0
//   }else if(!b.likes){
//     b.likes=0
//   }
//   return b.likes-a.likes
// }


const App = () => {
  const { message,type }=useSelector(state => state.notification)
  const blogs =useSelector(state => {
    return state.blogs})

  const dispatch=useDispatch()
  const [user,setUser]=useState(null)

  useEffect(() => {
    localStorage.getItem('login') && setUser(JSON.parse(localStorage.getItem('login')))
  }, [])

  useEffect(() => {
    if(user){
      blogService.setToken(user.token)
    }
  },[user])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [])

  const logoutCallback=() => {
    localStorage.removeItem('login')
    setUser(null)
  }

  const loginCallback=(user) => {
    setUser(user)
    blogService.setToken(user.token)
    dispatch(setNotification({ message:'logged successfully!!!',type:'info' },5))
  }

  // const addCallback=(blog) => {
  //   const { title,author }=blog
  //   dispatch(setNotification({ message:`a new blog ${title} by ${author} added`,type:'info' },5))

  //   dispatch(initializeBlogs())
  // }

  if(!blogs){
    return null
  }
  const NormalPage=() => {
    return(
      <div>
        <h2>blogs</h2>
        <div> {user.name} has logged in  <button onClick={logoutCallback}>logout</button></div>
        <Togglable buttonLabel={'create'}> <NewBlog /> </Togglable>
        {blogs.map(blog => {
          return <Blog key={blog.id} blog={blog}/>})}
      </div>
    )
  }
  return (
    <div>
      <Notification message={message} type={type}/>
      {!user && <LoginPage loginCallback={loginCallback}></LoginPage>}
      {user && <><NormalPage></NormalPage></> }

    </div>
  )
}

export default App
