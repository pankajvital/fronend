import {React, useState,useEffect} from 'react'
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';
import { urlbc } from '../components/Constants';
const Edit = () => {
  
    const navigate = useNavigate(); // Use the navigate function from react-router-dom
    const token = localStorage.getItem('TOKEN')
  useEffect(()=>{
    if(!token){
      navigate('/signin')
    }
  })
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit=(e)=>{
      e.preventDefault()
      console.log(user, email, password)
      if (!user || !email || !password) {
        alert("Name, email, and password are required fields.");
        return;
      }
      axios.post(`${urlbc}/signup`,
      {
        name:user,
        email:email,
        password:password
      })
      .then(res=>{
        console.log(res.data)
        if(res.data.code === 200){
          navigate('/Signin')
        }
        if(res.data.code === 400){
          alert(`User already exists`)
        }
   
      }).catch(err =>{
        console.log(err)
      })
      
    }
  return (
    <>
      <div className="container-fluid">
        <div
          className="row h-100 align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <div className="bg-secondary rounded p-4 p-sm-5 my-4 mx-3">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <Link to="index.html" className="">
                  <h3 className="text-primary">
                    <i className="fa fa-user-edit me-2" />
                    Company Name
                  </h3>
                </Link>
                <h3>Edit</h3>
              </div>
              <div className="form-floating mb-3">
                <input
                  className="form-control"
                  id="floatingInput"
                  type="text" placeholder="Name" name='user'
                  value={user} onChange={(e)=>setUser(e.target.value)}
                />
                <label htmlFor="floatingInput">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  value={email} required placeholder="Email" onChange={(e)=>setEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-4">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  value={password} placeholder="Password" onChange={(e)=>setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="d-flex align-items-center justify-content-between mb-4">
                <div className="form-check">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    id="exampleCheck1"
                  />
                  <label className="form-check-label" htmlFor="exampleCheck1">
                    Check me out
                  </label>
                </div>
                <Link to="">Forgot Password</Link>
              </div>
              <button type="submit" onClick={handleSubmit} className="btn btn-primary py-3 w-100 mb-4">
                Sign In
              </button>
              <p className="text-center mb-0">
                Don't have an Account? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Edit
