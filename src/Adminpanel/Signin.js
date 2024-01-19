import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'; // Import SweetAlert
import { adminpanelhome, companyName, urlbc } from "../components/Constants";

const Signin = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('TOKEN');
  const [userRole, setUserRole] = useState('');

  useEffect(() => {
    if (token) {
      navigate(`/${adminpanelhome}`); // Redirect to the home page if the user is signed in
    }
  }, [token, navigate]);

  const [name, setEmail] = useState("");
  const [password, setPassword] = useState("");

  

const handleSubmit = (e) => {
  const { name, password } = e.target.elements;
  const payload = { name: name.value, password: password.value };

  e.preventDefault();

  if (!payload.name || !payload.password) {
    Swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'User and password are required fields.',
    });
    return;
  }

  axios.post(`${urlbc}/login`, payload, {
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => {
      console.log(res.data);
      const token = res.data.token;
      console.log(token);
      console.log(res.data.role);

      if (res.data.code === 500) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'User Not Found',
        });
      }
      if (res.data.code === 404) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Password is Wrong',
        });
      }
      if (res.data.code === 200) {
        // Navigate to the home page after successful login
        navigate(`/${adminpanelhome}`);
        localStorage.setItem("TOKEN", res.data.token);
        localStorage.setItem("EMAIL", res.data.email);
        localStorage.setItem("USER_NAME", res.data.name);
        localStorage.setItem("ROLE", res.data.role);
      }
    })
    .catch((err) => {
      if (err.response) {
        console.log(err.response.data);
        console.log(err.response.status);
        console.log(err.response.headers);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Error: ${err.response.data.message}`,
        });
      } else if (err.request) {
        console.log(err.request);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No response received from the server.',
        });
      } else {
        console.log("Error", err.message);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: `Error: ${err.message}`,
        });
      }
    });
};


  useEffect(() => {
    // Fetch the user's role from localStorage upon component mount
    const storedUserRole = localStorage.getItem('ROLE');
    setUserRole(storedUserRole || ''); // Set the user's role in state
    console.log('check userrole', storedUserRole)
  }, []);
  

  return (
    <>
      <div className="back-col-all">
      <div className="container-fluid">
        <div
          className="row h-100 align-items-center justify-content-center"
          style={{ minHeight: "100vh" }}
        >
          <div className="col-12 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <div className="bg-secondary rounded p-2 p-sm-3 my-4 mx-3">
              <div className=" mb-3">
                <Link to="/" className="">
                  <h3 className="text-primary sign-t text-center">
                    {/* <i className="fa fa-user-edit me-2" /> */}
                    {companyName}
                  </h3>
                </Link>
              </div>
              <form onSubmit={handleSubmit}>
                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    name="name"
                    placeholder="User"
                    autoComplete="true"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label htmlFor="floatingInput">User Name</label>
                </div>
                <div className="form-floating mb-4">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    name="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                {userRole === 'superadmin' && (
        <div className="d-flex align-items-center justify-content-between mb-4">
          <Link to="/forgetpassword">Forgot Password</Link>
        </div>
      )}
                <button type="submit" className="btn btn-primary py-3 w-100 mb-4">
                  Sign In
                </button>
              </form>
              {/* <p className="text-center mb-0">
                Don't have an Account? <Link to="/signup">Sign Up</Link>
              </p> */}
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
};

export default Signin;
