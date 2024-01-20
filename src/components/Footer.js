import React from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import {
  phoneNumber,
  companyName,
  email,
  companyAddress,
} from "../components/Constants";
const Footer = () => {
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      window.scrollTo({
        top: section.offsetTop,
        behavior: "smooth",
      });
    }
  };
  const isHomePage = location.pathname === "/"; // Check if it's the home page

  return (
    <>
      {/* Footer  */}
      <footer id="footer_area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="footer_heading_area">
                <h5>Company</h5>
              </div>
              <div className="footer_link_area">
                <p>
                  {companyName} has wandered into the Travel industry to make
                  travelling, enthusiastic. {companyName} is here to sell
                  discounted airline tickets with distributed and unpublished
                  charges.
                </p>
              </div>
            </div>
            <div className="col-lg-2 offset-lg-1 col-md-6 col-sm-6 col-12">
              <div className="footer_heading_area">
                <h5>Useful Links</h5>
              </div>
              <div className="footer_link_area">
                <ul>
                  <li>
                    <Link to="/about">About Us</Link>
                  </li>
                  <li>
                    <Link to="/faqs">FAQ</Link>
                  </li>
                  <li>
                    <Link to="/privacy">Privacy Policy</Link>
                  </li>
                  <li>
                    <Link to="/terms-condition">Terms & Conditions </Link>
                  </li>
                  <li>
                    <Link to="/refund-policy">Refund Policy</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="footer_heading_area">
                <h5>Top Destinations</h5>
              </div>
              <div className="footer_link_area">
                <ul>
                  <li>
                    {isHomePage ? (
                      <a
                        href="#home_one_banner"
                        onClick={() => scrollToSection("home_one_banner")}
                      >
                        Flights to Denmark
                      </a>
                    ) : (
                      <Link to="/">Flights to Denmark</Link>
                    )}
                  </li>

                  <li>
                    {isHomePage ? (
                      <a
                        href="#home_one_banner"
                        onClick={() => scrollToSection("home_one_banner")}
                      >
                        Flights to London
                      </a>
                    ) : (
                      <Link to="/">Flights to London</Link>
                    )}
                  </li>
                  <li>
                    {isHomePage ? (
                      <a
                        href="#home_one_banner"
                        onClick={() => scrollToSection("home_one_banner")}
                      >
                        Flights to Switzerland
                      </a>
                    ) : (
                      <Link to="/">Flights to Switzerland</Link>
                    )}
                  </li>
                  <li>
                    {isHomePage ? (
                      <a
                        href="#home_one_banner"
                        onClick={() => scrollToSection("home_one_banner")}
                      >
                        Flights to New York
                      </a>
                    ) : (
                      <Link to="/">Flights to New York</Link>
                    )}
                  </li>

                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-12">
              <div className="footer_heading_area">
                <h5>Need any help?</h5>
              </div>
              <div className="footer_first_area">
                <div className="footer_inquery_area ft-ad">
                <i class="fa-solid fa-headset"></i> 
                  <h3>
                  <Link to="tel:+00-123-456-789">{phoneNumber}</Link>
                  </h3>
                </div>
                <div className="footer_inquery_area ft-ad">
                <i class="fa-regular fa-envelope"></i>  
                  <h3>
                    <Link to="mailto:support@domain.com">{email}</Link>
                  </h3>
                </div>
                <div className="footer_inquery_area ft-ad">
                <i class="fa-solid fa-map-location-dot"></i> 
                  <h3>
                    <Link to="mailto:support@domain.com">{companyAddress}</Link>
                  </h3>
                </div>
               
              </div>
            </div>
          </div>
        </div>
      </footer>
      <div className="copyright_area">
        <div className="container">
          <div className="row align-items-center">
            <div className="co-lg-6 col-md-6 col-sm-12 col-12">
              <div className="copyright_left">
                <p>Copyright © 2022 All Rights Reserved.</p>
              </div>
            </div>
            <div className="co-lg-6 col-md-6 col-sm-12 col-12">
              <div className="copyright_right">
                <img src="images/cards.png" alt="img" />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="go-top">
        <i className="fas fa-chevron-up" />
        <i className="fas fa-chevron-up" />
      </div>
    </>
  );
};

export default Footer;
