import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({name: "", email: "", password:"", cpassword:""}
  );
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const {name, email, password} = credentials;
    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({name, email, password}),
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      // Save the auth token and redirect
      localStorage.setItem('token', json.authtoken);
      navigate("/");
      props.showAlert("Account created successfully", "success");
    }
    else{
      props.showAlert("Invalid credentials", "danger");
    }
}
const onChange = (e) => {
  setCredentials({ ...credentials, [e.target.name]: e.target.value });
};

  return (
    <div className="container mt-3 my-3">
      <h2>Create your iNotebook account</h2>
      <div className="mb-2">It's quick and easy.</div>
      <form onSubmit={handleSubmit} className="mb-3">
        <div className="col-md-4 mb-3 my-4">
          <label htmlFor="fname" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name" 
            onChange={onChange}
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="email" className="form-label">
            Email Address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email" 
            onChange={onChange}
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password" 
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="col-md-4 mb-3">
          <label htmlFor="cpassword" className="form-label">
            Confirm Password
          </label>
          <input
            type="password"
            className="form-control"
            id="cpassword"
            name="cpassword" 
            onChange={onChange}
            minLength={5}
            required
          />
        </div>
        <div className="col-12">
          <button style={{fontWeight: "bold"}} className="btn btn-primary my-3" type="submit">
            Signup
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
