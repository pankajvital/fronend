import { React, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { adminpanelhome, companyName, urlbc} from "../components/Constants";

const Sidebar = ({ isSidebarOpen }) => {
  const location = useLocation();
  const role = localStorage.getItem("ROLE");

  const [data, setData] = useState({});
  // window.addEventListener('beforeunload', function (e) {
  //   localStorage.clear();
  // });

  // // Check if user is logged in when they revisit the page
  // window.addEventListener('load', function (e) {
  //   const isLoggedIn = localStorage.getItem('loggedIn');
  //   if (!isLoggedIn) {
  //   }
  // });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${urlbc}/users`); // Replace with your backend's URL
        console.log("check", response.data); // Logging the fetched data to the console
        const result = response.data;

        // Filter data to get only superadmin users
        const superadminData = result.filter(
          (user) => user.role === "superadmin"
        );
        setData(superadminData[0]); // Set data for editing
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Call the fetchData function
  }, []);
  console.log(role);

  
  return (
    <>
      {/* <div className="sidebar pe-4 pb-3"> */}
      <div id="admin-sidebar">
      <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
        <nav className="navbar navbar-admin bg-secondary navbar-dark">
          <Link to="/admin" className="navbar-brand mx-4 mb-2">
             <h3 className="text-primary side-t">
                    {/* <i className="fa fa-user-edit me-2" /> */}
                    <b>{companyName}</b>
                  </h3>
          </Link>
          {/* <div className="d-flex align-items-center ms-4 mb-4">
            <div className="position-relative">
              <img
                className="rounded-circle"
                src="img/user.jpg"
                alt=""
                style={{ width: 40, height: 40 }}
              />
              <div className="bg-success rounded-circle border border-2 border-white position-absolute end-0 bottom-0 p-1" />
            </div>
            <div className="ms-3">
              <h6 className="mb-0">
                {localStorage.getItem("USER_NAME")
                  ? localStorage
                      .getItem("USER_NAME")
                      .replace(/\b\w/g, (match) => match.toUpperCase())
                  : "N/A"}
              </h6>
              <span>
                {localStorage.getItem("ROLE")
                  ? localStorage
                      .getItem("ROLE")
                      .replace(/\b\w/g, (match) => match.toUpperCase())
                  : "N/A"}
              </span>
            </div>
          </div> */}
          <div className="navbar-nav w-100">
            {/* // role is agent  */}
            { (role === "agent" || role === "supervisor") && (
              <>
                <Link
  to={`/${adminpanelhome}`}
  className={`nav-item nav-link admin-nav-link ${
    location.pathname === `/${adminpanelhome}` ? "active" : ""
  }`}
>
                  <i className="fa fa-tachometer-alt me-2" />
                  Dashboard
                </Link>

                <div className="nav-item dropdown">
                  <Link
                    to="/#"
                    className={`nav-item nav-link admin-nav-link dropdown-toggle dropdown-toggle-admin ${
                      location.pathname === "/booking" ? "active" : ""
                    }`}
                    data-bs-toggle="dropdown"
                  >
                    <i className="far fa-file-alt me-2" />
                    Bookings
                  </Link>
                  <div className="dropdown-menu bg-transparent border-0">
                    <Link to="/booking" className="dropdown-item dropdown-item-admin">
                      All
                    </Link>
                    <Link to="/pending" className="dropdown-item dropdown-item-admin">
                      Pending
                    </Link>
                    <Link to="/cancel" className="dropdown-item dropdown-item-admin">
                      Cancelled
                    </Link>
                    <Link to="/issue" className="dropdown-item dropdown-item-admin">
                      Issued
                    </Link>
                  </div>
                </div>
                {/* Add other agent-related links here */}
              </>
            )}

            {/* // role is super admin */}

            {(role === "superadmin") && (
              <>
                <Link
  to={`/${adminpanelhome}`}
  className={`nav-item nav-link admin-nav-link ${
    location.pathname === `/${adminpanelhome}` ? "active" : ""
  }`}
>
                  <i className="fa fa-tachometer-alt me-2" />
                  Dashboard
                </Link>

                <div className="nav-item dropdown">
                  <Link
                    to="/#"
                    className={`nav-item nav-link admin-nav-link dropdown-toggle dropdown-toggle-admin ${
                      location.pathname === "/booking" ? "active" : ""
                    }`}
                    data-bs-toggle="dropdown"
                  >
                    <i className="far fa-file-alt me-2" />
                    Bookings
                  </Link>
                  <div className="dropdown-menu bg-transparent border-0">
                    <Link to="/booking" className="dropdown-item dropdown-item-admin">
                      All
                    </Link>
                    <Link to="/white" className="dropdown-item dropdown-item-admin">
                      Unassign
                    </Link>
                    <Link to="/pending" className="dropdown-item dropdown-item-admin">
                      Pending
                    </Link>
                    <Link to="/cancel" className="dropdown-item dropdown-item-admin">
                      Cancelled
                    </Link>
                    <Link to="/issue" className="dropdown-item dropdown-item-admin">
                      Issued
                    </Link>
                  </div>
                </div>

                <div className="nav-item dropdown">
                  <Link
                    to="/#"
                    className="nav-link dropdown-toggle dropdown-toggle-admin"
                    data-bs-toggle="dropdown"
                  >
                    <i className="far fa-file-alt me-2" />
                    Users
                  </Link>
                  <div className="dropdown-menu bg-transparent border-0">
                    <Link to="/agents" className="dropdown-item dropdown-item-admin">
                      Agents
                    </Link>
                    <Link to="/signup" className="dropdown-item dropdown-item-admin">
                      Sign Up
                    </Link>
                  </div>
                </div>
                <Link
                  to="/markup-sheet"
                  className={`nav-item nav-link admin-nav-link ${
                    location.pathname === "/markup-sheet" ? "active" : ""
                  }`}
                >
                  <i className="fa fa-table me-2" />
                  Markup Sheet
                </Link>
                <Link
                  to="/website"
                  className={`nav-item nav-link admin-nav-link ${
                    location.pathname === "/website" ? "active" : ""
                  }`}
                >
                  <i className="fa fa-table me-2" />
                  Website
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
      </div>
      
    </>
  );
};

export default Sidebar;
