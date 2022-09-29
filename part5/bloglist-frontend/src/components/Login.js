import { useState } from "react"
import loginService from '../services/login'
import blogService from '../services/blogs'
import Notification from './Notification'


const LoginPage=({loginCallback})=>{

    const [username,setUsername]=useState('')
    const [password,setPassword]=useState('')
    // const [errorMessage,setErrorMessage]=useState(null)
    const [message,setMessage]=useState(null)
    const [type,setType]=useState(null)
    

    const LoginCallback=async (event)=>{
        event.preventDefault()
        // console.log("LoginCallback")
        try {
          const user = await loginService.login({
            username, password,
          })
          loginCallback(user)
          blogService.setToken(user.token)
          localStorage.setItem("login",JSON.stringify(user))
          setUsername('')
          setPassword('')
        } catch (exception) {
          setMessage("wrong username or password")
          setType("error")
          setTimeout(() => {
            setMessage(null)
            setType(null)
          }, 5000);
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
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

export default LoginPage