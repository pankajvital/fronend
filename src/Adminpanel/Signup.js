import { React, useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { adminpanelurl, companyName, urlbc } from "../components/Constants";

const Signup = () => {
  const navigate = useNavigate(); // Use the navigate function from react-router-dom
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("agent");
  const [userRole, setUserRole] = useState("");
  

  
   useEffect(() => {
    // Check the role on page load
    const userRole = localStorage.getItem('ROLE');
    setRole(userRole);

    if (userRole !== 'superadmin') {
      navigate('/404'); // Redirect to signin if not superadmin
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user, email, password);
    if (!user || !email || !password) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Name, email, and password are required fields.',
      });
      return;
    }
  
    try {
      const response = await axios.post(`${urlbc}/signup`, {
        name: user,
        email: email,
        password: password,
        role: role,
      });
  
      console.log(response.data);
      if (response.data.code === 200) {
        // Successful user creation
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'User created successfully.',
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            navigate(`/${adminpanelurl}`);
          }
        });
      } else if (response.data.code === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'User already exists',
        });
      }
    } catch (error) {
      console.error('Error:', error.response.data);
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Bad request - User already exists or invalid data provided',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'An error occurred, please try again later.',
        });
      }
    }
  
    console.log('Role:', role);
  };
  
  
  return (
    <>
      <div className="back-col-all"> 
      <div className="container-fluid">
        <div
          className="row h-100 align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <div className="bg-secondary rounded p-3 p-sm-3 my-4 mx-3">
              <div className="d-flex align-items-center justify-content-between mb-3">
                <Link to="index.html" className="">
                  <h3 className="text-primary sign-t">
                    {companyName}
                  </h3>
                </Link>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="floatingText"
                  placeholder="Name"
                  onChange={(e) => setUser(e.target.value)}
                />
                <label htmlFor="floatingText">Username</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  type="email"
                  className="form-control"
                  id="floatingInput"
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <label htmlFor="floatingInput">Email address</label>
              </div>
              <div className="form-floating mb-4">
                <input
                  type="password"
                  className="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <label htmlFor="floatingPassword">Password</label>
              </div>
              <div className="form-floating mb-3">
                <select
                  className="form-select"
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                >
                  <option value="agent">Agent</option>
                  <option value="supervisor">Supervisor</option>
                  <option value="superadmin">Superadmin</option>
                </select>
                <label htmlFor="floatingRole">Select Role</label>
              </div>

              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-primary py-3 w-100 mb-4"
              >
                Sign Up
              </button>
              
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Signup;
