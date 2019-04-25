import React, {useState} from 'react';
import { Redirect } from 'react-router-dom';

import axios from 'axios';

const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirm, setPasswordConfirm] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isMatch, setIsMatch] = useState(true);

    const handleSubmit = () => {
      setIsMatch(true);
      if (password !== passwordConfirm) {
          setIsMatch(false);
          return
      }
      setIsLoading(true);
      setIsError(false);
      axios.post("http://localhost:3001/api/v1/users/signup", {
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
              <input
                value={passwordConfirm}
                onChange={e => setPasswordConfirm(e.target.value)}
                placeholder="Confirm Password"
                type="password"
                name="password_confirm"
                required
              />
              <button type="submit">Register</button>
            </form>
          {!isMatch && <div>Password's must match</div>}
          {isLoading && <div>Loading ... </div> }
          {isError && <div>Something went wrong ...</div>}  
        </div>
    )
}

export default RegisterPage;