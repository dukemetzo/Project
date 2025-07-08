import { fetchData } from "../../main.js";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RegisterForm = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    password: '',
    password2: ''
  });

  const {username, password, password2} = user;

  const onChange = (e) => setUser({...user, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();

    fetchData("/user/register", 
    {
      "username": username,
      "password": password
    },
    "POST")
    .then((data) => {
      if(!data.message) {
        localStorage.setItem('username', data.username);
        localStorage.setItem('userId', data._id);
        navigate("/profile");
      }
    })
    .catch((error) => {
      console.log(`Error! ${error.message}`)
    });
  };

  return (
    <div className="container-md">
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input 
            type="text" 
            className="form-control" 
            id="username"
            name='username'
            placeholder="jdoe123"
            onChange={onChange}
            value={username}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password"
            name='password'
            onChange={onChange}
            value={password}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password2" className="form-label">Confirm Password</label>
          <input 
            type="password" 
            className="form-control" 
            id="password2"
            name='password2'
            onChange={onChange}
            value={password2}
            required
          />
        </div>
        <input type="submit" className="btn btn-primary" value="Register"/>
      </form>
    </div>
  );
}

export default RegisterForm;