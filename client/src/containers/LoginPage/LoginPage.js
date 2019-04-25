import React, {useState} from 'react';
import { Redirect } from 'react-router-dom'

import axios from 'axios';

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = () => {
      setIsLoading(true);
      setIsError(false);
      axios.post("http://localhost:3001/api/v1/users/login", {
        email: email,
        password: password
      })
        .then(res => {
          setIsLoading(false);
          console.log(res);
          localStorage.setItem('token', res.data.token);
          localStorage.setItem('user', res.data.user);
          localStorage.setItem('expirationDate', new Date(new Date().getTime() + (3600 * 1000)))
          setIsSuccess(true);
        })
        .catch(err => {
          setIsLoading(false);
          setIsError(true);
          setIsSuccess(false);
        })
    }

    return (
        <div>
          {isSuccess && <Redirect to="/secure"/>}
          <h3>Login</h3>
            <form onSubmit={e => {handleSubmit(); e.preventDefault()}}>
              <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Email address"
                type="email"
                name="email"
                required
              />
              <input
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Password"
                type="password"
                name="password"
                required
              />
              <button type="submit">Login</button>
            </form>
          {isLoading && <div>Loading ... </div> }
          {isError && <div>Something went wrong ...</div>}  
        </div>
    )
}

export default LoginPage;