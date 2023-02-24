import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password:""});
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ email: credentials.email, password: credentials.password }),
        });
        const json = await response.json();
        console.log(json);
        if(json.success){
          // Save the auth token and redirect
          localStorage.setItem('token', json.authtoken);
          props.showAlert("Logged in successfully", "success");
          navigate("/");
        }
        else{
          
      props.showAlert("Invalid detials", "danger");
        }
    }
    const onChange = (e) => {
      setCredentials({ ...credentials, [e.target.name]: e.target.value });
    };
  return (
    <div className="mt-3 my-3">
      <h2>Login to your account</h2>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="col-md-4 mb-3 my-4">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={credentials.email}
            onChange={onChange}
            id="email"
            name="email"
          />
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            onChange={onChange}
            name="password"
            id="password"
          />
        </div>
          <button style={{fontWeight: "bold"}} type="submit" className="btn btn-primary my-3">Login</button>
      </form>
    </div>
  );
};

export default Login;
