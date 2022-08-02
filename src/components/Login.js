import axios from 'axios'

const Login = (props) => {

    const handleLogin = (event) => {
        event.preventDefault();
        console.log(props.username)
        console.log(props.password)
        const result = axios.post('/api/login', {username: props.username, password: props.password});
        result.then(response => {
          console.log(response.data.token);
          props.setUser(response.data);
        })
        .catch( err => {
          console.log(err.message)
        })
      }

    return (
    <>
        <h1>log in to application</h1>
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