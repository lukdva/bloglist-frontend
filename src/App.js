import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Login from './components/Login'
import BlogList from './components/BlogList'
import Title from './components/Title'
import UserInfo from './components/UserInfo'
import BlogForm from './components/BlogForm'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');


  useEffect(() => {
    (async () => {
      const blogs = await blogService.getAll();
      setBlogs( blogs )
    })();
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser');
    if (loggedInUser)
    {
      const userObj = JSON.parse(loggedInUser);
      setUser(userObj);
      blogService.setToken(userObj.token);
    }
  }, [])

  return (
    <>
      {user === null &&
      <>
        <Title name = 'log in to application'/>
        <Login setUsername={setUsername} setPassword={setPassword} setUser={setUser} password={password} username={username}/>
      </>
      }
      
      { user !== null &&
        <>
          <Title name='blogs'/>
          <UserInfo setUser={setUser} user={user} />
          <Title name='create new'/>
          <BlogForm title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} blogs={blogs} setBlogs={setBlogs}/>
          <BlogList blogs={blogs} user={user} setUser={setUser} />
        </>
      }
    </>
  )
}

export default App
