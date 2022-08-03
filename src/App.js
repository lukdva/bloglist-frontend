import { useState, useEffect } from 'react'
import blogService from './services/blogs'
import Login from './components/Login'
import BlogList from './components/BlogList'
import Title from './components/Title'
import UserInfo from './components/UserInfo'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);


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
        <Notification msg={message} error={isError}/>
        <Login setUsername={setUsername} setPassword={setPassword} setUser={setUser} password={password} username={username} setMessage={setMessage} setIsError={setIsError}/>
      </>
      }
      
      { user !== null &&
        <>
          <Title name='blogs'/>
          <Notification msg={message} error={isError}/>
          <UserInfo setUser={setUser} user={user} />
          <Title name='create new'/>
          <BlogForm title={title} setTitle={setTitle} author={author} setAuthor={setAuthor} url={url} setUrl={setUrl} blogs={blogs} setBlogs={setBlogs} setMessage={setMessage} setIsError={setIsError}/>
          <BlogList blogs={blogs} user={user} setUser={setUser} />
        </>
      }
    </>
  )
}

export default App
