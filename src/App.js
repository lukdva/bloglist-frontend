import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Login from './components/Login'
import BlogList from './components/BlogList'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  return (
    <>
      {user === null &&
      <Login setUsername={setUsername} setPassword={setPassword} setUser={setUser} password={password} username={username}/>
      }
      {user !== null &&
      <BlogList blogs={blogs} user={user} />
      }
    </>
  )
}

export default App
