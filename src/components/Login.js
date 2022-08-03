import axios from 'axios'
import blogService from '../services/blogs'

const Login = (props) => {

    const handleLogin = async(event) => {
        event.preventDefault();
        console.log(props.username)
        console.log(props.password)
        const response = await axios.post('/api/login', {username: props.username, password: props.password});
        window.localStorage.setItem('loggedInUser', JSON.stringify(response.data))
        console.log(response.data.token);
        props.setUser(response.data);
        blogService.setToken(response.data.token);
        props.setUsername('');
        props.setPassword('');
        
        // .catch( err => {
        //   console.log(err.message)
        // })
      }

    return (
    <>
        <form onSubmit={handleLogin}>
            <div>
                username 
                <input 
                    type="text"
                    name="Username"
                    value={props.username}
                    onChange = {({target}) => {props.setUsername(target.value)}}
                 ></input> 
            </div> 
            <div>
                password 
                <input
                    type="password"
                    name="Password"
                    value={props.password}
                    onChange = {({target}) => {props.setPassword(target.value)}}
                ></input> 
            </div> 
            <button type="submit">login</button>
        </form>
    </> 
    )
    }
  
  export default Login