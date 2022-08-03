import axios from 'axios'
import blogService from '../services/blogs'

const Login = (props) => {

    const handleLogin = async(event) => {
        event.preventDefault();
        try{
            const response = await axios.post('/api/login', {username: props.username, password: props.password});
            window.localStorage.setItem('loggedInUser', JSON.stringify(response.data))
            props.setUser(response.data);
            blogService.setToken(response.data.token);
            props.setUsername('');
            props.setPassword('');
            props.setMessage('Login successful');
            props.setIsError(false);
            setTimeout(() => {
                props.setMessage(null);
            }, 3000);
        } catch(err) {
            props.setMessage(err.message);
            props.setIsError(true);
            setTimeout(() => {
                props.setMessage(null);
            }, 3000);
        }
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