import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginPage from './components/Login'
import Notification from './components/Notification'
import NewBlog from './components/NewBlog'
import Togglable from './components/Togglable'
import { useSelector,useDispatch } from 'react-redux'
import { setNotification } from './reducers/notificationReducer'

const sortWay=(a,b) => {
  if(!a.likes){
    a.likes=0
  }else if(!b.likes){
    b.likes=0
  }
  return b.likes-a.likes
}


const App = () => {
  const { message,type }=useSelector(state => state.notification)
  const dispatch=useDispatch()
  const [blogs, setBlogs] = useState([])
  const [user,setUser]=useState(null)

  useEffect(() => {
    localStorage.getItem('login') && setUser(JSON.parse(localStorage.getItem('login')))
    // blogService.setToken(user.token)
  }, [])

  useEffect(() => {
    if(user){
      blogService.setToken(user.token)
    }
  },[user])

  useEffect(() => {
    blogService.getAll().then(blogs => {
      blogs=blogs.sort(sortWay)
      setBlogs( blogs )
    }
    )
    // console.log(blogs,'12312312321312blogs')
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

  const addCallback=(blog) => {
    const { title,author }=blog
    dispatch(setNotification({ message:`a new blog ${title} by ${author} added`,type:'info' },5))

    blogService.getAll().then(blogs => {
      blogs=blogs.sort(sortWay)
      setBlogs( blogs )
    }
    )
  }

  const refresh=() => {
    console.log('refresh')
    blogService.getAll().then(blogs => {
      blogs=blogs.sort(sortWay)
      setBlogs( blogs )
    }
    )
  }



  const NormalPage=() => {
    return(
      <div>
        <h2>blogs</h2>
        <div> {user.name} has logged in  <button onClick={logoutCallback}>logout</button></div>
        <Togglable buttonLabel={'create'}> <NewBlog addCallback={addCallback}/> </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} refresh={refresh} />
        )}
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
