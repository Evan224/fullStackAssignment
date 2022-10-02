import { useState } from 'react'
import loginService from '../services/login'
import blogService from '../services/blogs'
import Notification from './Notification'
import { useDispatch,useSelector } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'


const LoginPage=({ loginCallback }) => {
  const { message,type }=useSelector(state => state.notification)
  const dispatch=useDispatch()

  const [username,setUsername]=useState('')
  const [password,setPassword]=useState('')


  const LoginCallback=async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      loginCallback(user)
      blogService.setToken(user.token)
      localStorage.setItem('login',JSON.stringify(user))
      setUsername('')
      setPassword('')
    } catch (exception) {
      dispatch(setNotification({ message:'wrong username or password',type:'error' },5))
    }
  }

  return(
    <div>
      <h2>Log in to application</h2>
      <Notification message={message} type={type}/>
      <form onSubmit={LoginCallback}>
        <div>
            username
          <input
            id="username"
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
            password
          <input
            id="password"
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button id="login-button"  type="submit">login</button>
      </form>
    </div>
  )
}

export default LoginPage