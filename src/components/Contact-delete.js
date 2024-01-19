import { useEffect } from 'react';

const Contact = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, ); // Adjust the delay as needed

    return () => clearTimeout(timeout); // Clear timeout on component unmount
  }, []); // This will run only once when the component mounts

  
  return (
    <>
    {/* Common Banner Area */}
    <section id="common_banner" className='top-page'>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="common_bannner_text">
              <h2>Contact</h2>
              <ul>
                <li>
                  <a href="index.html">Home</a>
                </li>
                <li>
                  <span>
                    <i className="fas fa-circle" />
                  </span>
                  Contact
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* Contact Area */}
    <section id="contact_main_arae" className="section_padding">
      <div className="container">
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 col-12">
            <div className="section_heading_center">
              <h2>Contact with us</h2>
            </div>
          </div>
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
                <form action="!#" id="contact_form_content">
                  <div className="row">
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control bg_input"
                          placeholder="First name*"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control bg_input"
                          placeholder="Last name*"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control bg_input"
                          placeholder="Email address*"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control bg_input"
                          placeholder="Mobile number*"
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <textarea
                          className="form-control bg_input"
                          rows={5}
                          placeholder="Message"
                          defaultValue={""}
                          required
                        />
                      </div>
                    </div>
                    <div className="col-lg-12">
                      <div className="form-group">
                        <button type="submit" className="btn btn_theme btn_md">
                          Send message
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
                  <div className="contact_detais_item">
                    <h4>Help line</h4>
                    <h3>
                      <a href="tel:+1-828-229-7326">+1-828-229-7326</a>
                    </h3>
                  </div>
                  <div className="contact_detais_item">
                    <h4>Support mail</h4>
                    <h3>
                      <a href="mailto:support@domain.com">support@zustravel.com</a>
                    </h3>
                  </div>
                  <div className="contact_detais_item">
                    <h4>Contact hour</h4>
                    <h3>Mon-Sun : 24 hours</h3>
                  </div>
                  <div className="contact_map_area">
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
