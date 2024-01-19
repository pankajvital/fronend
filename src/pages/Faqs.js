import { useEffect } from "react";
import { companyName, phoneNumber} from "../components/Constants";
export const Faqs = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, ); // Adjust the delay as needed

    return () => clearTimeout(timeout); // Clear timeout on component unmount
  }, []); // This will run only once when the component mounts
  return (
    <>
      <div className="banner-wrap">
        <img src="images/faq-banner.jpg" className="img-fluid" alt="faq" />
      </div>
      
      <div className="faqs mt-4 container-fluid">
      <div class="accordion" id="accordionExample">
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingOne">
      <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
      How do I review/confirm my reservation?
      </button>
    </h2>
    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
      <div class="accordion-body p-tag-justify">
      After you have completed the online request you will receive a booking reference code. It is a 11 character code that will be made up of both letters and numbers. You can monitor the progress of your request by visiting our informational websites. please visit https://www.zustravel.com/. Once the airline has fully confirmed and issued your tickets you will receive a second and final email confirming your request. If you did not receive a final confirmation, it may be because your internet provider has blocked it as possible spam. Please take a moment to check your spam/junk folder.

      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingTwo">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
      What if I typed in the wrong airport?
      </button>
    </h2>
    <div id="collapseTwo" class="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
      <div class="accordion-body p-tag-justify">
      Most airlines allow us to make a change on the Departure and arrival airports of a reservation. For any changes to the reservation, kindly contact our Help Desk on Toll free number {phoneNumber} and the representatives will check on the airline penalties and rules for your specific ticket

      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingThree">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
      What if I typed in the wrong name(s)?
      </button>
    </h2>
    <div id="collapseThree" class="accordion-collapse collapse" aria-labelledby="headingThree" data-bs-parent="#accordionExample">
      <div class="accordion-body p-tag-justify">
      Names on a Reservation can never be changed or altered for any reason. You can contact our Help desk on Toll free number {phoneNumber} and our representatives will check with the airlines if any amendments can be done.
      </div>
    </div>
  </div>
  <div class="accordion-item">
    <h2 class="accordion-header" id="headingFour">
      <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
      What if I have not received my confirmation email with My Booking reference code?

      </button>
    </h2>
    <div id="collapseFour" class="accordion-collapse collapse" aria-labelledby="headingFour" data-bs-parent="#accordionExample">
      <div class="accordion-body p-tag-justify">
      Once you have completed the online request you will instantaneously receive an email acknowledging your request which will include a booking reference number. If you don’t receive it within few minutes you may have entered your email incorrectly or your email server has routed the email to a spam/junk folder. It is suggested to call our Help Desk on our Toll free number {phoneNumber} if you don’t receive an email after making your request.

      </div>
    </div>
  </div>
</div>
      </div>
      
    </>
  );
};
export default Faqs;
