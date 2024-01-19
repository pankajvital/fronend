import { useEffect } from "react";
import { companyName } from "../components/Constants";
export const Refund = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, ); // Adjust the delay as needed

    return () => clearTimeout(timeout); // Clear timeout on component unmount
  }, []); // This will run only once when the component mounts
  return (
    <>
    <div className="banner-wrap">
        <img src="images/refund-policy.png" className="img-fluid" alt="Refund Policy" />
      </div>
      <div className="about-book-shadow container-fluid p-tag-justify">
      <div className="content-secttion-in">
      {/* <div className="col-md-12 text-center">
            <span className="mb-3 all-page-title">Cancel and Refund</span>
          </div> */}
        <span className="border">
          {/* <h2 className="mb-3">Cancel and Refund</h2> */}
          <p>
          Most of the airline tickets and service fees charged for booking the same are non-refundable after 24 hours of booking.For cancelling a flight booking, we would require an email requesting cancellation from the email address used at the time of the booking. We can accept refund requests only if the following conditions have been met:
</p>
          <ul>
            <li>You have applied for a cancellation and refund with us and if the fare rules provide for cancellation and refunds</li>
            <li>You are not a "no show" ( most "no show" bookings are in-eligible for any waiver from suppliers for refund processing ) and</li>
            <li>We are able to secure waivers from suppliers to process this requested cancellation and refund.</li>
          </ul>
          <p>
          We are unable to provide a specific time line for how long it may take for this requested refund to be processed. All refund requests are processed in a sequential format. Once you have provided our customer service agent with your cancellation request, we will then send you an email notification that your request has been received. This notification does not automatically qualify you for a refund. This only provides you with an acknowledgement of your request and provides you with a tracking number. Upon receipt of your request we will work with the suppliers such as airlines, HOTELS, car-rental companies to generate a waiver based on airline and other supplier rules and notify you of the supplier decision. Our services fees associated with the original travel reservation or booking are not refundable. Please note that we are dependent on the suppliers for receiving the requested refunds. 


          </p>
          <p>
          Once the refund has been approved by the supplier it may take additional time for this to appear on your credit card statement. Generally, all suppliers will charge a penalty for refund. This entire process may take 60-90 days from receipt of your request to receiving credit on your statement. Apart from the airlines and other suppliers refund penalties, {companyName} will charge a post-ticketing services fee, as applicable. All refund fees are charged on per ticket per person basis. These fees will only be assessed if a refund has been authorized by the supplier or a waiver has been received and when the airline/supplier rules permit such refunds. If such refund is not processed by the supplier, we will refund you our post-ticketing service fees applicable to your agent assisted refund request , but not our booking fees for the original travel reservation or booking.
          </p>
          <p>
          Limitation of liability neither {companyName}, our affiliates nor our partners nor any of our or their respective officers, directors, employees or agents shall have any responsibility or liability for any claim, loss, injury, damage, delay, travel cancellation, accident, cost or expense (including, without limitation, attorneys' fees and costs of suit), nor for any incidental, indirect, special, punitive, exemplary, or consequential damages or damages (including, without limitation, for loss of or damage to revenue, profits, savings, goodwill or data) (collectively, "Losses and damages"), directly or indirectly arising out of or related to (I) these terms of agreement, including, without limitation the privacy policy; (ii) the program; (iii) any failure, delay or decision by us in administering the program; (iv) any unauthorized use of your account or any breach of security beyond our reasonable control; (v) any offer, representation, statement or claim about the program; or (vi) the purchase, redemption for or use of any goods. The foregoing limitations of liability shall apply whether the alleged liability is based on contract, negligence, tort, strict liability or any other basis, even if we or our affiliates or our or their representatives have been advised of or should have known of the possibility of such losses and damages, and without regard to the success or effectiveness of other remedies.


          </p>
          <p>
          No warranty the program and the points are provided "As-is," without warranty or representation of any kind. We disclaim all warranties and representations of any kind whatsoever, whether written or oral, express, implied, statutory, or arising by operation of law, course of dealing, course of performance, or usage of trade, including, but not limited to, implied warranties of merchantability, fitness for a particular purpose, title, and non-infringement, with respect to the program and the points.

          </p>
          
        </span>
      </div>
    </div>
    </>
  );
};

export default Refund
