import React, { useEffect, useState } from "react";
import axios from "axios";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { adminpanelurl, urlbc } from "../components/Constants";
const TopNavbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("TOKEN");
  const role = localStorage.getItem("ROLE");
  const [data, setData] = useState({});

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${urlbc}/users`); // Replace with your backend's URL
        console.log('check', response.data); // Logging the fetched data to the console
        const result = response.data;

        // Filter data to get only superadmin users
        const superadminData = result.filter(user => user.role === 'superadmin');
        setData(superadminData[0]); // Set data for editing
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Call the fetchData function
  }, []);
  return (
    <>
      <nav className="navbar admin-navbar navbar-expand bg-secondary navbar-dark sticky-top px-4 py-0">
            <Link
              to="/"
              className="navbar-brand d-flex d-lg-none me-4"
            >
              <h2 className="text-primary mb-0">
                <i className="fa fa-user-edit" />
              </h2>
            </Link>
            <Link to="#" className="sidebar-toggler flex-shrink-0" onClick={toggleSidebar}>
              <i className="fa fa-bars" />
            </Link>
          
            <div className="navbar-nav align-items-center ms-auto">
              
              <div className="nav-item dropdown">
                <Link
                  to="/"
                  className="nav-link dropdown-toggle"
                  data-bs-toggle="dropdown"
                >
                  <img
                    className="rounded-circle me-lg-2"
                    src="images/user.jpg"
                    alt=""
                    style={{ width: 40, height: 40 }}
                  />
                  <span className="d-none d-lg-inline-flex">
                  {localStorage.getItem("USER_NAME") ? 
                  localStorage.getItem("USER_NAME").replace(/\b\w/g, (match) => match.toUpperCase()) 
                  : "N/A"}
                  </span>
                </Link>
                <div className="dropdown-menu dropdown-menu-end bg-secondary border-0 rounded-0 rounded-bottom m-0">
                {role === 'superadmin' && (
  <Link to="/profile" className="dropdown-item">
    My Profile
  </Link>
)}
                  <Link
                    to={`/${adminpanelurl}`}
                    onClick={() => {
                      localStorage.clear();
                      navigate(`/${adminpanelurl}`);
                    }}
                    className="dropdown-item"
                  >
                    Log Out
                  </Link>
                </div>
              </div>
            </div>
          </nav>
    </>
  );
};

export default TopNavbar;
