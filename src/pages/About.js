import { useEffect } from "react";
import { companyName } from "../components/Constants";
const Contact = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, ); // Adjust the delay as needed

    return () => clearTimeout(timeout); // Clear timeout on component unmount
  }, []); // This will run only once when the component mounts
  return (
    <>
      <div className="banner-wrap">
        <img src="images/about-us.webp" className="img-fluid" alt="About Us" />
      </div>

      <div className="content-secttion-in container-fluid p-tag-justify">
        <div className="row align-c">
          {/* <div className="col-md-12 text-center">
            <span className="mb-3 all-page-title">Explore New Horizons with {companyName}</span>
          </div> */}
          <div className="col-md-12">
            <span className="border">
              
              <p>
              {companyName} has wandered into the Travel industry to make travelling, enthusiastic. {companyName} is here to sell discounted airline tickets with distributed and unpublished charges. Our fundamental responsibility is to link you with different carriers in order to have real journeys with shifting outings and schedules, and specifically when you schedule your trip. {companyName} will treat you with the most widely used adaptable preferences from our end. 
              </p>
              <p>
              {companyName} is a satisfied gathering of professionals who work 24*7 to supply you with the most noteworthy steadfastness and ace help, with the least help and assured discount. Our staff is able to help you make adjustments to your reservations, drop your future credit and discount based on your travel needs. {companyName} has no drawbacks of its own and is pursuing a similar flight plan. Curve-based carriers offer cancellation and discounts on the same day without restriction for the least assistance costs.
              </p>
              <p>
            We'll offer the latest travel deals from hundreds of travel companies, and you'll pick the one you want. We partner with a number of travel companies so that you have a wide range of destinations, deals, and discounts. Only offers from reliable and established travel companies are used in our search engine. Scan and match rates from hundreds of travel companies with a single quick search. There are no added costs or undisclosed penalties. The price you see is just what you're paying for. We search both the biggest booking portals and small local systems to ensure that you get the lowest rates.

            </p>
            </span>
          </div>
        
        </div>
      </div>

     
    </>
  );
};

export default Contact;
