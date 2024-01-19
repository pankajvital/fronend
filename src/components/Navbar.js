import React from "react";
import { Outlet, Link } from "react-router-dom";
import { phoneNumber } from "./Constants";
// import About from '../pages/About'
const Navbar = () => {
  return (
    <>
      <div id="top-links" className="ftsl-navbar  rounded sticky-top">
        <nav className="navbar p-0 navbar-expand-lg frontnavbar  navbar-light">
          <div className="container-fluid">
            <Link to="/" className="navbar-brand p-0">
              <img
                // src="images/logo.png"
                src="images/logo.png"
                alt=""
                className="img-fluid logo"
              />
            </Link>
            <button
              type="button"
              className="navbar-toggler me-0"
              data-bs-toggle="collapse"
              data-bs-target="#navbarCollapse"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse mynavbar-collapse" id="navbarCollapse">
              <div className="top-form"></div>
              <div className="navbar-nav ms-auto">
                <Link to="/" className="nav-item nav-link mynav-link">
                  Home
                </Link>

                <Link to="/about" className="nav-item nav-link mynav-link">
                  About Us
                </Link>
                
                <Link className="nav-item nav-link mynav-link" to="/privacy">Privacy Policy</Link>
                <Link className="nav-item nav-link mynav-link" to="/terms-condition">Terms & Conditions </Link>
                <Link to="/contact" className="nav-item nav-link mynav-link">
                  Contact Us
                </Link>
                <Link className="nav-item nav-link mynav-link call-nav" to={`tel:${phoneNumber}`}>
                <i class="fa-solid fa-headset" aria-hidden="true"></i>{phoneNumber}</Link>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <Outlet />
    </>
  );
};

export default Navbar;
