import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';

import {
  phoneNumber,
  email,
  companyAddress,
  urlbc,
} from "../components/Constants";
const Contact = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, ); // Adjust the delay as needed

    return () => clearTimeout(timeout); // Clear timeout on component unmount
  }, []); // This will run only once when the component mounts

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    mobile_number: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    first_name: false,
    last_name: false,
    email: false,
    mobile_number: false,
    message: false,
  });

  const capitalizeFirstLetterEachWord = (str) => {
    return str.replace(/\b\w/g, (match) => match.toUpperCase());
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

     // Allow only letters and spaces for first_name and last_name fields
     if ((name === 'first_name' || name === 'last_name') && !/^[A-Za-z\s]*$/.test(value)) {
      return;
    }

    // Check if the input is numeric for the mobile_number field
    if (name === 'mobile_number' && !/^\d{0,18}$/.test(value)) {
      return;
    }

    // Capitalize the first letter of each word for name and last_name fields
    const formattedValue = name === 'first_name' || name === 'last_name'
      ? capitalizeFirstLetterEachWord(value)
      : value;

    setFormData({ ...formData, [name]: formattedValue });
    setFormErrors({ ...formErrors, [name]: false });
  };


  const validateForm = () => {
    const errors = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (!value) {
        errors[key] = true;
      } else if (key === 'email' && !value.includes('@')) {
        errors[key] = true;
      } else if (key === 'mobile_number' && !/^\d{9,18}$/.test(value)) {
        errors[key] = true;
      }
    });
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      // Form validation failed
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(`${urlbc}/send-email`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.text();
      console.log(result);

      // Check if the form submission was successful
      if (response.ok) {
        setFormSubmitted(true);
        // Show SweetAlert notification
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'Your message has been sent successfully.',
        });
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
    {/* Common Banner Area */}
    <div className="banner-wrap">
        <img src="images/contact-Us.webp" className="img-fluid" alt="Contact Us" />
      </div>
    {/* Contact Area */}
    <section id="contact_main_arae" className=" mb-2 p-tag-justify">
      <div className="container-fluid">
        <div className="row">
       
        </div>
        <div className="contact_main_form_area_two">
          <div className="row">
            <div className="col-lg-8">
              <div className="contact_left_top_heading">
              
                <h3>Need help?</h3>
                <p>
                We would be happy to hear from you, Please fill in the form below or mail us your requirements
                </p>
              </div>
              <div className="contact_form_two">
              
                <form onSubmit={handleSubmit} id="contact_form_content">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                      <input
            type="text"
            className={`form-control bg_input ${
              formErrors.first_name ? 'is-invalid' : ''
            }`}
                          placeholder="First name*"
                          required
                          name="first_name"
                          value={formData.first_name}
                          onChange={handleChange}
                        />
                        {formErrors.first_name && (
            <span className="invalid-feedback">First name is required.</span>
          )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                      <input
            type="text"
            className={`form-control bg_input ${
              formErrors.last_name ? 'is-invalid' : ''
            }`}
                          placeholder="Last name*"
                          required
                          name="last_name"
                          value={formData.last_name}
                          onChange={handleChange}
                        />
                        {formErrors.last_name && (
            <span className="invalid-feedback">Last name is required.</span>
          )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                      <input
            type="text"
            className={`form-control bg_input ${
              formErrors.email ? 'is-invalid' : ''
            }`}
                          placeholder="Email address*"
                          required
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        {formErrors.email && (
            <span className="invalid-feedback">Email is required.</span>
          )}
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                      <input
            type="text"
            className={`form-control bg_input ${
              formErrors.mobile_number ? 'is-invalid' : ''
            }`}
                          placeholder="Mobile number*"
                          required
                          name="mobile_number"
                          value={formData.mobile_number}
                          onChange={handleChange}
                          pattern="\d*" // Allow only numeric input
                        />
                        {formErrors.mobile_number && (
            <span className="invalid-feedback">Number is required.</span>
          )}
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <textarea
                          className={`form-control bg_input ${
                            formErrors.message ? 'is-invalid' : ''
                          }`}
                          rows={5}
                          placeholder="Message"
                          defaultValue={""}
                          required
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                        />
                        {formErrors.message && (
            <span className="invalid-feedback">Message is required.</span>
          )}
                      </div>
                    </div>
                    <div className="col-lg-12">
                    <div className="form-group">
                    <button
                      type="submit"
                      className={`btn btn_theme btn_md ${
                        formSubmitted ? 'disabled' : ''
                      }`}
                      disabled={formSubmitted || loading}
                      onClick={handleSubmit}
                    >
                      {loading ? 'Submitting...' : 'Send Message'}
                    </button>
                  </div>
                    </div>
                  </div>
                </form>

              </div>
            </div>
            <div className="col-lg-4">
              <div className="contact_two_left_wrapper">
                <h3>Contact details</h3>
                <div className="contact_details_wrapper">
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
                  <div className="contact_map_area mt-4">
                  <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2831.168087542928!2d-106.95752722393335!3d44.79776297107091!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5335fabc2a650d27%3A0x3092109ed30c1089!2s30%20N%20Gould%20St%20%234000%2C%20Sheridan%2C%20WY%2082801%2C%20USA!5e0!3m2!1sen!2sin!4v1703029884844!5m2!1sen!2sin" width="100%" height="450" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
                  <p><b>Head Office :</b> Zustravel LLC
30 N. Gould St Ste 4000, Sheridan, WY 82801</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
  
  )
}

export default Contact
