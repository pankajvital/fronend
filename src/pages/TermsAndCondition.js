import { useEffect } from "react";
import { phoneNumber, companyName, email} from "../components/Constants";
export const TermsAndCondition = () => {
  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, ); // Adjust the delay as needed

    return () => clearTimeout(timeout); // Clear timeout on component unmount
  }, []); // This will run only once when the component mounts
  return (
    <>
      <div className="banner-wrap">
        <img src="images/terms-contidion.webp" className="img-fluid" alt="TermsAndCondition" />
      </div>

      <div className="about-book-shadow container-fluid p-tag-justify">
        <span className="border">
          <div className="content-secttion-in">
          {/* <div class="content-secttion-in text-center">
            <span className="mb-3 all-page-title">Terms & Conditions</span>
          </div> */}
            <p>
              <strong>
                {companyName} is trading name of {companyName} based us is 30.N Gould
                St Ste 4000,Sheridan,WY 82801. Ph:{phoneNumber}
              </strong>{" "}
              Use of the Site is governed by the following Terms &amp;
              Conditions. By using the Site, whether to review information or to
              book travel reservations (through this Site or over telephone with
              our customer service team), or for any other purpose, you agree to
              these Terms &amp; Conditions. If you do not agree with any part of
              these Terms &amp; Conditions, you must not use the Site or make
              travel reservations with us. We reserve the right to amend these
              Terms &amp; Conditions at any time without prior notice. All
              amended terms automatically take effect when these Terms &amp;
              Conditions are updated. Your continued use of the Site following
              the posting of changes to the Terms &amp; Conditions will mean you
              accept those changes. Please return to this page periodically to
              review any changes.
            </p>
            <p>
              All statements made in these Terms &amp; Conditions related to {companyName} are also made on behalf of our affiliates,
              subsidiaries and parent companies, including all disclaimers.
            </p>
            <h3>Introduction</h3>
            <p>
              Shopping online at {companyName} is statistically safer than using
              your credit card at a restaurant or department store. Technical
              experts point out that online purchases without human intervention
              are far safer than traditional credit card transactions because
              the information is immediately encrypted into a scrambled message
              that can only be decrypted by an authorized computer.
            </p>
            <p>
              You will join millions of other customers who have safely shopped
              over the Internet. We're certain after successfully shopping
              online at {companyName}, you will be on your way to appreciating
              the convenience and security of shopping from home.
            </p>
            <p>
              The Fair Credit Billing Act states that your credit card provider
              cannot make you pay in excess of $50.00 of fraudulent charges.
            </p>
            <h3>Service Help</h3>
            <p>
              For quick answers to your questions you can call our customer
              service team 24/7 on {phoneNumber}, email us on {email}. You can write to us at:
            </p>
            <p>
              {companyName}&nbsp;
              <br />
              30.N Gould St Ste 4000,Sheridan,WY 82801.
              <br />
              Ph:{phoneNumber}
            </p>
            <h3>General Disclaimer</h3>
            <p>
              {companyName} shall not be liable for failure of travel service
              suppliers, including but not limited to airlines to perform the
              services offered by such suppliers. {companyName}, in providing
              travel management services, does not guarantee or insure the
              services to be provided by any supplier, the financial position of
              such suppliers or the reimbursement to you from any loss
              experienced as a result of the financial condition of such
              supplier. In the event that a supplier defaults prior to providing
              the service to you for which payment has been made, the sole
              recourse for refund shall be with the defaulting supplier, from
              insurance covering such defaults if any or from other responsible
              third party unless such was caused by {email}.
            </p>
            <p>
              In those situations in which a supplier defaults prior to
              providing services you may pursue any recourse against the
              supplier for refund, which may be permitted by law or statute.
              {companyName} warrants that it provides the highest standards of
              service in the trade and will use appropriate info in selecting
              suppliers so as to protect you from such default.
            </p>
            <p>
              Except as expressly stated herein, {companyName} assumes no
              responsibility for actions relating to travel services beyond the
              control of {companyName} or its employees. {companyName} is not
              responsible or liable for any act, error, omission, injury, loss,
              accident, damage, delay, nonperformance, irregularity, or any
              consequence thereof, which may be occasioned through neglect, or
              default or any other act or inaction of any supplier of Travel
              products. {companyName} shall not be liable for any fluctuation in
              price or change in schedule or equipment or accommodations for any
              travel service, which occurs subsequent to payment for such
              service.
            </p>
            <p>
              {companyName} acts as a service bureau that provides value added
              service to retail travel agents and consumers. {companyName} has no
              control over and assumes no liability for the actions of the
              suppliers from whom it obtains Travel products.
            </p>
            <p>
              Once tickets have been issued there may be a penalty involved for
              refunds. We do not have control over printed prices on the
              tickets, although some tickets may have BT (Bulk fare) printed on
              them, some may have a specific value on them, which may be
              different (lower or higher) than the fare collected.
            </p>
            <p>
              Discounts offered may vary depending on a number of factors
              including Airlines utilized, class of service, destination, time
              of year (low, mid or high season), advance notice provided,
              minimum stay requirements fulfilled and flight load.
            </p>
            <p>
              {companyName} does not guarantee, endorse, validate or promote
              other advertiser products and services that are advertised on this
              web Site.
            </p>
            <h3>Limitations of Liability/Disclaimer</h3>
            <p>
              Information contained in the Site (including text, graphics, links
              or other material) are provided on an "as is," and "where
              available" basis.{companyName} makes no representation or warranty,
              express or implied, to you or another person or entity as to the
              accuracy, results, timeliness, completeness, merchantability,
              fitness for any particular purpose with respect to the Site or any
              related materials, products, services, or information. Under no
              circumstances, including, but not limited to, negligence, shall
              we, and/or our providers or distributors, be liable for any
              damages to, or viruses that may infect, your computer equipment or
              other property on account of your access to, use of, or browsing
              on the Site, or your downloading of any materials, data, text,
              images, video, audio, or other information from the Site. In no
              event shall we, and/or our providers or distributors, be liable
              for any injury, loss, claim, damage, or any special, punitive,
              indirect, incidental, or consequential damages of any kind
              (including, but not limited to, lost profits or lost savings),
              whether based in contract, tort, strict liability, or otherwise,
              that arise out of or are in any way connected with the use, or the
              inability to use, the Site or the services or materials on the
              Site, even if advised of the possibility of such damages. In no
              event shall our aggregate liability, or that of our providers or
              distributors, exceed the total charges set forth in the itinerary
              giving rise to any such liability. Any claim or cause of action
              arising from, or relating to, your access and use of, or purchase
              of products and/or services from, the Site must be brought within
              one (1) year from the date on which such claim or action arose or
              accrued or purchase was completed. Applicable law may not allow
              the limitation or exclusion of liability of incidental or
              consequential damages, so the above limitation or exclusion may
              not apply to you. Your use of the Site shall be at your own risk.
              We are acting as an intermediary or as an agent for providers of
              travel-related products and/or services by promoting, selling or
              accepting reservations or bookings for such products and/or
              services (such as air and ground transportation, HOTEL
              ACCOMMODATIONS, meals, tours, cruises, travel insurance, etc.).
            </p>
            <h3>Indemnification</h3>
            <p>
              All Users agree to protect and indemnify {companyName}, its
              affiliates, and/or their respective suppliers and any of their
              officers, directors, employees and agents from and against any
              claims, causes of action, demands, recoveries, losses, damages,
              fines, penalties or other costs or expenses of any kind or nature
              including but not limited to reasonable legal and accounting fees,
              brought by:
            </p>
            <ul>
              <li>
                you or on your behalf in excess of the liability described
                above; or
              </li>
              <li>by third parties as a result of</li>
              <li>
                your breach of these Terms and Conditions, notices or documents
                referenced on the Site;
              </li>
              <li>
                your violation of any law or the rights of a third party; or
              </li>
              <li>your use of the Site</li>
            </ul>
            <h3>Release</h3>
            <p>
              If you have a dispute with travel service suppliers, including but
              not limited to airlines, HOTELS, cruise lines, railroads, car
              rental agencies, tour operators and consolidators to perform the
              services offered by such suppliers, you release us (and our
              officers, directors, agents, subsidiaries, joint ventures and
              employees) from claims, demands and damages (actual and
              consequential) of every kind and nature, known and unknown,
              arising out of or in any way connected with such disputes.
            </p>
            <h3>Privacy</h3>
            <p>
              The Transportation Security Administration of the U.S. Department
              of Homeland Security requires us to collect information from you
              for purposes of watch list screening, under the authority of 49
              U.S.C. section 114, and the Intelligence Reform and Terrorism
              Prevention Act of 2004. Providing this information is voluntary;
              however, if it is not provided, you may be subject to additional
              screening or denied transport or authorization to enter a sterile
              area. TSA may share information you provide with law enforcement
              or intelligence agencies or others under its published system of
              records notice. For more on TSA Privacy policies, or to view the
              system of records notice and the privacy impact assessment, please
              see TSA's Web site at www.tsa.gov
            </p>
            <p>
              Please review our Privacy Policy, which also governs your visit to
              this Site to understand our practices. The {companyName} Privacy
              Policy will provide a description of how we use and protect your
              personal information. If you object to your information being
              transferred or used in this way please do not use our
              services.Protecting Your SecurityTo ensure that your credit, debit
              or charge card is not being used without your consent, we may
              validate your name, address and contact number supplied by you
              during the booking process against appropriate third party
              databases. By accepting these terms and conditions you agree and
              authorize us to carry out such verification checks as stated
              herein. In performing these checks, you acknowledge and concur
              that such personal information you provide to us may be disclosed
              to a registered Credit Reference Agency which may keep a record of
              such information in whole or in part. You can rest assured that
              this verification process is performed for the sole purpose to
              verify and confirm your identity, and that this process does not
              perform a credit check, and your credit rating will not be
              affected whatsoever. All information provided by you to us is
              securely processed in strict accordance with the Data Protection
              Act of 1998.
            </p>
            <h3>Site Usage &amp; Ticket Purchase</h3>
            <p>
              You warrant that you are at least 18 years of age and possess the
              legal authority to enter into this agreement and to use the Site
              in accordance with all terms and conditions herein. You agree to
              be financially responsible for all of your use of the Site (as
              well as for use of your account by others). You are responsible
              for any bookings made by persons under your direction or control.
              You also warrant that all information supplied by you or on your
              behalf, or by members of your household in using the Site is true
              and accurate. Further you also confirm that the traveler is not an
              unaccompanied minor. Without limitation, any exploratory, false,
              or fraudulent reservation or any reservation in anticipation of
              demand is prohibited. You agree that the travel services
              reservations facilities of the Site shall be used only to make
              legitimate reservations or purchases for you or for another person
              for whom you are legally authorized to act. You understand that
              overuse or abuse of the travel services reservation facilities of
              the Site may result in you being denied access to such facilities.
            </p>
            <p>All offers, prices, and conditions of sale may be subject to:</p>
            <ul>
              <li>change without notice.</li>
              <li>
                advance purchase, eligibility, seating, or other limitations.
              </li>
              <li>
                travel days, dates, blackout dates, stopovers, and/or
                waitlisting restrictions.
              </li>
              <li>
                reservation validation limitations of up to one year (if any
                extension permitted, penalties/restrictions may apply); and/or
              </li>
              <li>other conditions/restrictions.</li>
              <li>Availability. Lower prices may be available.</li>
              <li>
                If your itinerary involves an ultimate destination or stop in a
                country other than the country of departure, the provisions of a
                treaty known as the "Warsaw Convention" may be applicable to
                your entire trip, including any portion entirely within the
                country of origin or destination. The Warsaw Convention governs
                and may limit the liability of certain air carriers for death of
                or personal injury to passengers and/or loss of or damage to
                baggage.
              </li>
            </ul>
            <p>
              A reservation is not complete until confirmed/ticketed. To protect
              our customers, we verify with the credit/debit card company that
              the billing address and credit card verification number you
              provided to us is accurate and that your debit/charge will be
              accepted. Until such information is verified, the fare is subject
              to change. We are not responsible for any transaction that is
              declined based upon a credit/debit card that is declined by the
              issuing company or a travel provider or if, for any reason, the
              debit/credit card billing address and/or credit card verification
              number cannot be verified in a timely manner, nor are we
              responsible for any changes in fare or any other charges that may
              occur during our verification process. At times when the fare
              selected is not available an approval code may have been taken on
              your credit card, if the transaction is not completed the approval
              code may block your available credit for a time period until the
              bank removes the block.
            </p>
            <h3>Prohibited Activities</h3>
            <p>
              You agree that the travel services reservations facilities of the
              Site shall be used only to make legitimate reservations or
              purchases for you or for another person for whom you are legally
              authorized to act. You understand that overuse or abuse of the
              travel services reservation facilities of the Site may result in
              you being denied access to such facilities. You may not use this
              Site for any commercial purpose. You agree you will not access,
              monitor or copy any content or information of this Site using any
              robot, spider, scraper or other automated means or any manual
              process for any purpose without our written permission. You agree
              that you will not violate the restrictions in any robot exclusion
              headers on this Site, or bypass or circumvent other measures
              employed to prevent or limit access to this Site. You agree you
              will not you modify, copy, distribute, transmit, display, perform,
              reproduce, publish, license, create derivative works from,
              transfer, or sell or re-sell any information, content, graphics,
              software, products, or services obtained from or through this Site
              or call center. You agree you will not use a frame or border
              environment around the Site, or other framing technique to enclose
              any portion or aspect of the Site, or mirror or replicate any
              portion of the Site, and that you will not sell, offer for sale,
              transfer, or license any portion of the Site in any form to any
              third parties.
            </p>
            <p>
              You agree you will not use any device, software, or routine that
              interferes, or attempts to interfere, with the normal operation of
              our Site, or take any action that impose an unreasonable load on
              our equipment. You will not disguise the origin of the information
              you transmit through the Site, whether to navigate the Site, make
              a travel reservation or booking, or post any content.You must not
              misuse the Site by knowingly introducing viruses, trojans, worms,
              logic bombs or other material which is malicious, offensive,
              defamatory or technologically harmful. You must not attempt to
              gain unauthorized access to the Site, the server on which the Site
              is stored or any server, computer or database connected to the
              Site.
            </p>
            <p>
              You must not attack the Site via a denial-of-service attack or a
              distributed denial-of service attack. We will not be liable for
              any loss or damage caused by a distributed denial-of-service
              attack, viruses or other technologically harmful material that may
              infect your computer equipment, computer programs, data or other
              proprietary material due to your use of the Site or to your
              downloading of any material posted on it, or on any website linked
              to it.
            </p>
            <p>
              We reserve the right to cancel your {companyName} account and
              terminate your use of the Site if you violate any of the above
              prohibitions.
            </p>
            <h3>Booking Process</h3>
            <p>
              For your convenience, our use of the following terms in these
              Terms &amp; Conditions shall have the meaning below:
            </p>
            <p>
              "Service Element" - a singular product or service listed on the
              Site that can be booked independently of any other service. (e.g.:
              flight).
            </p>
            <p>
              "Travel Supplier" - a vendor of one or more Service Elements.
              (e.g.: airlines). {companyName} does not act as principal but makes
              arrangements with third-party vendor Travel Suppliers for Service
              Elements, all as defined above.
            </p>
            <p>
              "Booking" - a negotiation process with the Travel Supplier carried
              out by you while using this Site for the purpose of obtaining one
              or more Service Elements that may result in a contract with the
              Travel Supplier at the time we receive full payment and accept
              your offer.
            </p>
            <p>
              In order to complete a Booking the following steps are taken to
              ensure its validity:
            </p>
            <p>
              When we place Service Elements on our Site, we are inviting you to
              make an offer for their purchase. You do not make this offer until
              you press "Book" on the payment page (entitled "Review Trip
              Details and Book") of the Site.
            </p>
            <p>
              Once you have done so you have made {companyName} an offer (which
              cannot be withdrawn if you change your mind) to purchase the
              relevant Service Element(s) from the relevant Travel Supplier(s)
              (your "Booking"). We are free to accept your offer on behalf of
              the relevant Travel Supplier or to reject it, at our sole
              discretion.
            </p>
            <p>
              The {companyName} email confirmation is NOT the contractual
              acceptance of the Booking, but merely an acknowledgement that we
              have received your offer. We will need to check the availability
              of the relevant Service Element(s).
            </p>
            <p>
              If the relevant Service Element is available, your Booking will be
              processed. The contract pertaining to the relevant Booking is
              formed when payment in full has been received.
            </p>
            <p>
              The contract between you and the relevant Travel Supplier will
              relate only to those Service Elements confirmed by email with
              ticket numbers in case of air.
            </p>
            <p>
              The terms of your Booking (such as price, availability and/or
              dates of travel) are not guaranteed until the contract is formed
              between you and the Travel Supplier and a ticket has been issued
              and confirmed by the Travel Supplier. Please note that once you
              have completed the Booking stage you can only cancel or change the
              details (such as names or destinations) of your Booking at our
              sole discretion and in accordance with these Terms &amp;
              Conditions.
            </p>
            <p>
              These Booking processes will apply to any of our individual
              Service Element's Terms &amp; Conditions set out below. We reserve
              the right to change the Booking process at any time, with changes
              automatically taking effect from the date such changes are posted
              on the Site.
            </p>
            <p>
              At all times throughout your trip a government-issued photo ID is
              required for security checks at airports as deemed necessary by
              the relevant Travel Suppliers.
            </p>
            <p>
              In addition to the required government-issued ID as stated above,
              proof of citizenship (Passport) is required for international
              travel (for most countries outside of the United States). Please
              note that it is your sole responsibility to ensure that you meet
              the passport, visa, and/or health requirements of the countries
              you wish to visit and those that you transit (even if it is for a
              simple flight change). Many countries require that your passport
              should be valid for a minimum period from the date of arrival into
              that country. For any questions regarding what the applicable
              minimum period is and any other conditions or passport/visa
              requirements for travel, you should contact the corresponding
              local consulate of the countries to which you are travelling.
            </p>
            <p>
              Neither {companyName} nor its affiliates accept any responsibility,
              and you will not be entitled to any refunds whatsoever, if you are
              denied boarding, delayed or deported due to non-fulfillment of the
              above.
            </p>
            <ul>
              <li>
                Government entry/exit fees may apply, depending on your
                destination.
              </li>
              <li>
                These are your sole responsibility and will be additional to
                your Booking charges.
              </li>
              <li>
                All travelers on your Booking (if more than one passenger) must
                travel on the same itinerary. Individual passengers cannot be
                added to, and/or deleted from your Booking.
                <br />
                {companyName} reserves the right to correct errors in any
                advertised price and, if applicable, give you an option to
                either cancel the Booking or allow {companyName} to collect an
                amount equal to any increase in price from your provided credit
                or debit card, prior to your departure.
              </li>
              <li>
                Each Service Element listed in your Booking is provided by the
                respective Travel Supplier.
              </li>
              <li>
                Frequent miles may or may not be available for any portion of
                your Booking. You must check this with the relevant Travel
                Supplier.
              </li>
            </ul>
            <p>
              Once you have made your Booking, you cannot transfer or change the
              name(s) or destination(s) listed in your Booking.
            </p>
            <p>
              Your Booking will be fulfilled on the delivery date set out in
              your ticket information email or, if no delivery date is
              specified, then on the date the ticket is issued, unless there are
              exceptional circumstances.
            </p>
            <p>
              The terms of this agreement incorporate by reference the terms of
              each airline's contract of carriage. Passengers may inspect the
              full text of the contract of carriage at the each airline's
              airport or city ticket offices. Passengers have the right, upon
              request to the airlines, to receive free of charge by mail or
              other delivery service the full text of the contract of carriage.
              The incorporated terms of the contract of carriage may include:
              (1) Limits on the airline's liability for personal injury or death
              of passengers, and for loss, damage, or delay of goods and
              baggage, including fragile or perishable goods; (2) Claim
              restrictions, including time periods within which passengers must
              file a claim or bring an action against the airline for its acts
              or omissions or those of its agents; (3) Rights of the airline to
              change terms of the contract; (4) Rules about reconfirmation of
              reservations, CHECK-IN times, and refusal to carry; (5) Rights of
              the airline and limitations concerning delay or failure to perform
              service, including schedule changes, substitution of alternate
              airline or aircraft, and rerouting.Pricing, Taxes/Fees, and
              Payment:Our total prices include all taxes and fees applicable to
              airfare in your Booking, unless stated otherwise in your ticket
              information email or in these Terms &amp; Conditions. Additional
              fuel surcharges, security, baggage, seat reservation, and other
              applicable service charges may apply which will be charged by the
              relevant Travel Supplier at time of check-in. You are solely
              responsible for any such additional charges due to the Travel
              Supplier. If you have any questions about such charges, please
              contact the relevant Travel Supplier directly.
            </p>
            <p>
              Payment must be made in full with a valid credit or debit card at
              the time of Booking. {companyName} accepts all major credit or
              debit cards with a verifiable billing address. You hereby
              authorize {companyName} and its authorized third party to process
              the charge to the credit or debit card you provide to us for the
              total amount of your Booking.
            </p>
            <p>
              You may be required by the relevant Travel Supplier(s) to present
              a valid credit or debit card at the time of CHECK-IN at the hotel
              and/or at the pick-up location of the car rental company to
              provide confirmation of authorized card usage and/or to secure any
              additional charges. The cardholder must be a traveler listed on
              your Booking.
            </p>
            <p>All offers, prices, and conditions of sale may be subject to:</p>
            <ul>
              <li>change without notice;</li>
              <li>
                advance purchase, eligibility, seating, or other limitations;
              </li>
              <li>
                travel days, dates, minimum or maximum stays, holidays, seasons,
                blackout dates, stopovers, and/or waitlisting restrictions;
              </li>
              <li>
                reservation validation limitations of up to one year (if any
                extension permitted, penalties/restrictions may apply);
              </li>
              <li>other conditions/restrictions; and availability.</li>
            </ul>
            <p>
              If your itinerary involves an ultimate destination or stop in a
              country other than the country of departure, the provisions of a
              treaty known as the "Warsaw Convention" may be applicable to your
              entire trip, including any portion entirely within the country of
              origin or destination. The Warsaw Convention governs and may limit
              the liability of certain air carriers for death of or personal
              injury to passengers and/or loss of or damage to baggage.
            </p>
            <p>
              A reservation is not complete until confirmed/ticketed. To protect
              our customers, we verify with the credit/debit card company that
              the billing address and credit card verification number you
              provided to us is accurate and that your debit/charge will be
              accepted. Until such information is verified, the fare is subject
              to change. We are not responsible for any transaction that is
              declined based upon a credit/debit card that is declined by the
              issuing company or a travel provider or if, for any reason, the
              debit/credit card billing address and/or credit card verification
              number cannot be verified in a timely manner, nor are we
              responsible for any changes in fare or any other charges that may
              occur during our verification process. In the event the fare
              selected is not available an approval code may have been issued on
              your credit card. If the transaction is not completed the approval
              code may temporarily credit the amount from your bank account.
            </p>
            <h3>Advice to International Passengers</h3>
            <p>
              Passengers embarking upon a journey involving an ultimate
              destination or a stop in a country other than the country of
              departure are advised that the provisions of treaties known as the
              Montreal Convention and the Warsaw Convention may be applicable to
              their entire journey including the portion entirely within the
              countries of departure and destination. The Conventions govern and
              in most cases limits the liability of carriers to passengers for
              death or personal injury. Additional protection can usually be
              obtained by purchasing insurance from a private company. Such
              insurance is not affected by any limitation of the carrier's
              liability under the Montreal Convention or Warsaw Convention. For
              further information please consult your airline or insurance
              company representative.
            </p>
            <h3>Links</h3>
            <p>
              The Site provides links to other websites as a convenience to you,
              we do not endorse nor are we responsible for the contents of other
              websites. If you decide to access other websites you do so at your
              own risk.
            </p>
            <h3>Changes to Flights Already Purchased</h3>
            <p>
              All changes made to the itinerary are restricted as well as
              subject to airline fare rules, whichever is more restrictive; most
              of our tickets hotels/cars/packages/cruises do not allow any date
              or name changes after the booking is completed. {companyName} does
              not guarantee, and shall not be responsible for, any bookings or
              reservations made or confirmed to you if the original itinerary
              has been changed by the supplier pursuant to customer's request.
            </p>
            <h3>Cancel and Exchange</h3>
            <p>
              Most of our airline tickets are 100% non-refundable. In certain
              cases where the airline may allow cancellations, a credit may be
              valid towards a future ticket purchase by the same traveler on the
              same airline. Usually the credit issued by the airline supplier
              has a specific expiration date, after which it cannot be used. We
              encourage you to discuss additional restrictions attached to your
              credit with a customer service agent. All such bookings where the
              cancellation may be permitted must be cancelled prior to the
              scheduled departure time of the first flight segment by calling
              our customer service center. We do not guarantee any cancellation.
              When you are ready to make your new booking and wish to use your
              airline credit, you will be required to the pay fare difference
              (if any), applicable airline penalties and any applicable
              {companyName} post-ticketing fees. All such changes are governed by
              each airlines' fare rules, policies and procedures, which are not
              under our control.
            </p>
            <p>
              No additional representation is made for our exchange fees except
              that an agent will assist you in locating your desired new flights
              and attempt to re-book the new flights based on availability and
              other factors.
            </p>
            <h3>Multiple Airline Itineraries</h3>
            <p>
              If your itinerary includes flights operated by more than one
              airline, please read infofully each such airline's terms and
              conditions, which can be found on each such airline's website.
              Each such airline will have its own restrictions, rules and fees.
              If one of these flights is affected by an airline change (e.g.
              cancellation or rescheduling) that causes a Customer to make
              changes to the other flight, the Customer may be responsible for
              any fees or ticket cost incurred for making changes to the
              unaffected flight. Such airlines may charge their own fees for
              changes, refunds, or if exchanges are requested. You are
              responsible for complying with each airline's terms and
              conditions, which may differ (for example, CHECK-IN times and
              limits on baggage size/weight). It is advisable you print your
              outbound and return portions of your e-ticket confirmation for all
              flights prior to travelling. You may be asked for proof of your
              return ticket at check-in.
            </p>
            <h3>Cancel and Refund</h3>
            <p>
              Most of our airline tickets are non-refundable after 24 hours of
              booking. For cancelling a flight booking, we would require an
              email requesting cancellation from the email address used at the
              time of the booking. We can accept refund requests only if the
              following conditions have been met:
            </p>
            <ul>
              <li>
                you have applied for a cancellation and refund with us and if
                the fare rules provide for cancellation and refunds
              </li>
              <li>
                you are not a "no show" ( most "no show" bookings are
                in-eligible for any waiver from suppliers for refund processing
                ) and
              </li>
              <li>
                we are able to secure waivers from suppliers to process this
                requested cancellation and refund.
              </li>
            </ul>
            <p>
              We are unable to provide a specific time line for how long it may
              take for this requested refund to be processed. All refund
              requests are processed in a sequential format. Once you have
              provided our customer service agent with your cancellation
              request, we will then send you an email notification that your
              request has been received. This notification does not
              automatically qualify you for a refund. This only provides you
              with an acknowledgement of your request and provides you with a
              tracking number. Upon receipt of your request we will work with
              the suppliers such as airlines, HOTELS, car-rental companies to
              generate a waiver based on airline and other supplier rules and
              notify you of the supplier decision. Our services fees associated
              with the original travel reservation or booking are not
              refundable. Please note that we are dependent on the suppliers for
              receiving the requested refunds. Once the refund has been approved
              by the supplier it may take additional time for this to appear on
              your credit card statement. Generally, all suppliers will charge a
              penalty for refund. This entire process may take 60-90 days from
              receipt of your request to receiving credit on your statement.
              Apart from the airlines and other suppliers refund penalties,
              {companyName} will charge a post-ticketing services fee, as
              applicable. All refund fees are charged on per ticket per person
              basis. These fees will only be assessed if a refund has been
              authorized by the supplier or a waiver has been received and when
              the airline/supplier rules permit such refunds. If such refund is
              not processed by the supplier, we will refund you our
              post-ticketing service fees applicable to your agent assisted
              refund request , but not our booking fees for the original travel
              reservation or booking.
            </p>
            <p>
            Limitation of liability neither {companyName}, our affiliates nor
              Our partners nor any of our or their respective officers,
              Directors, employees or agents shall have any responsibility or
              Liability for any claim, loss, injury, damage, delay, travel
              Cancellation, accident, cost or expense (including, without
              Limitation, attorneys' fees and costs of suit), nor for any
              Incidental, indirect, special, punitive, exemplary, or
              Consequential damages or damages (including, without limitation,
              For loss of or damage to revenue, profits, savings, goodwill or
              Data) (collectively, "Losses and damages"), directly or indirectly
              Arising out of or related to (I) these terms of agreement,
              Including, without limitation the privacy policy; (ii) the
              Program; (iii) any failure, delay or decision by us in
              Administering the program; (iv) any unauthorized use of your
              Account or any breach of security beyond our reasonable control;
              (v) any offer, representation, statement or claim about the
              Program; or (vi) the purchase, redemption for or use of any goods.
              The foregoing limitations of liability shall apply whether the
              Alleged liability is based on contract, negligence, tort, strict
              Liability or any other basis, even if we or our affiliates or our
              Or their representatives have been advised of or should have known
              Of the possibility of such losses and damages, and without regard
              To the success or effectiveness of other remedies.
            </p>
            <p>
            No warranty the program and the points are provided "As-is,"
              Without warranty or representation of any kind. We disclaim all
              Warranties and representations of any kind whatsoever, whether
              Written or oral, express, implied, statutory, or arising by
              Operation of law, course of dealing, course of performance or
              Usage of trade, including, but not limited to, implied warranties
              Of merchantability, fitness for a particular purpose, title, and
              Non-infringement, with respect to the program and the points.
            </p>
            <h3>No Waiver</h3>
            <p>
              No failure on the part of {companyName} to enforce any part of
              these Terms and Conditions shall constitute a waiver of any of
              {companyName}'s rights under these Terms and Conditions, whether
              for past or future actions on the part of any person. Neither the
              receipt of any funds by {companyName} nor the reliance of any
              person on {companyName} actions shall be deemed to constitute a
              waiver of any part of these Terms and Conditions. Only a specific,
              written waiver signed by an authorized representative of
              {companyName} shall have any legal effect whatsoever.
            </p>
            <h3>Disputes</h3>
            <p>
              Any dispute relating in any way to your visit to this Site shall
              be submitted to confidential arbitration in the State of New York.
              Before resorting to this alternative, we strongly encourage you to
              first contact us directly to seek a resolution by emailing us at {email} Arbitration under this agreement shall be
              conducted under the rules then prevailing of the American
              Arbitration Association. The arbitrator's award shall be binding
              and may be entered as a judgment in any court of competent
              jurisdiction. To the fullest extent permitted by applicable law,
              no arbitration under this Agreement shall be joined to an
              arbitration involving any other party subject to this Agreement,
              whether through class arbitration proceedings or otherwise. To the
              extent you have in any manner violated or threatened to violate
              the Site's intellectual property rights, {companyName} may seek
              injunctive or other appropriate relief in any state or federal
              court in the state of New York, and you consent to exclusive
              jurisdiction and venue in such courts. For resolution of dispute,
              you may contact an Arbitrator who will listen to both sides, weigh
              the evidence, and make a decision regarding the dispute.
            </p>
            <h3>Privacy</h3>
            <p>
              Please review our Privacy Policy, which also governs this Program.
              {companyName} Privacy Policy will provide a description of how we
              use and protect your personal information. If you object to your
              information being transferred or used in this way please do not
              use our services.
            </p>
            <h3>Discount of Airfares</h3>
            <p>
              In accordance with the US Airline Deregulation Act, Open Sky
              Agreements, and subsequent codifications, discounting on air
              tickets is now legal. Due to our large volume, and numerous
              purchasing sources, we are allowed to bring you many published air
              fare prices for less than the carriers' published price. The value
              of discount may vary based on fare type, availability,
              seasonality, referral source and destinations.
            </p>
            <h3>Fare Changes and Post Payment Price Guarantee</h3>
            <p>
              Prior to your form of payment being processed and accepted
              successfully, if there is a change in the price of air fare or any
              other change, you may be notified of this change and only upon
              such notification you have the right to either accept or decline
              this transaction. If you elect to decline this transaction, you
              will not be charged.
            </p>
            <p>
              Our Post Payment Price Guarantee: Upon successful acceptance and
              processing of your payment (credit/debit card), we guarantee that
              we will honor the total final quoted price of the airline tickets
              regardless of any changes or fluctuation in the price of air fare.
            </p>
            <h3>Payment Acceptance Policy</h3>
            <p>
              We accept credit cards and debit cards issued in US, UK, Canada
              and several other countries as listed in the billings section. We
              also accept AE/AP billing addresses.
            </p>
            <p>
              Please note: your credit/debit card may be billed in multiple
              charges totaling the final total price. If your credit/debit card
              or other form of payment is not processed or accepted for any
              reason, we will notify you within 24 hours (it may take longer
              than 24 hours for non credit/debit card payment methods). Prior to
              your form of payment being processed and accepted successfully, if
              there is a change in the price of air fare or any other change,
              you may be notified of this change and only upon such notification
              you have the right to either accept or decline this transaction.
              If you elect to decline this transaction, you will not be charged.
            </p>
            <p>
              Our Post Payment Price Guarantee: Upon successful acceptance and
              processing of your payment (credit/debit card), we guarantee that
              we will honor the total final quoted price of the airline tickets
              regardless of any changes or fluctuation in the price of air fare.
            </p>
            <p>
              We provide a 100% Safe and Secure Credit card transaction
              guarantee. Please view our 100% Safe Purchase Guarantee on Credit
              Card usage on our site.
            </p>
            <p>
              In order to provide you further safety, when certain transactions
              are determined to be high-risk by our systems, we will not process
              such transactions unless our credit card verification team has
              determined that it's safe to process them. In order to establish
              validity of such transactions, we may contact you or your bank.
            </p>
            <h3>Credit/Debit Card Payment Terms</h3>
            <ul>
              <li>
                All credit cards must have verifiable US, Canadian or other
                countries' billing address.
              </li>
              <li>All bookings and fares are not guaranteed until ticketed.</li>
              <li>
                When you submit your credit or debit card for a purchase, we
                request an authorization for the amount of your anticipated
                transaction (placing a temporary "hold" on the funds). If for
                some reason we are unable to CONFIRM YOUR BOOKING, you will not
                be charged and we will request that such hold be released by
                your credit or debit card bank; until then, funds subject to the
                hold will not be available to you for other purposes.
              </li>
              <li>
                If your credit card is declined for any reason, we will notify
                you within 24 hours, simply submitting the credit card does not
                automatically guarantee ticketing.
              </li>
              <li>
                {companyName} bears no responsibility in the event your credit or
                debit card is not approved or charged. There can be many reasons
                why your credit or debit card may not have been approved or
                charged. Examples of these maybe: Airline could not confirm the
                booking, fare increased since payment information was submitted
                and prior to ticketing or sufficient funds not available on the
                credit card. In such instances where the fare may have
                increased, you will be provided with alternate options and you
                have the right to cancel the booking at no cost to you. When the
                booking is ticketed at the cost originally quoted to you the
                ticket becomes non-refundable and non-cancellable.
              </li>
              <li>
                {companyName} uses stringent safety measures for credit card
                payment processing. Fraudulent transactions, if any, are
                reported to airport security, airlines and other federal and
                state law enforcement.
              </li>
              <li>
                You agree to be liable for any and all credit card payments and
                you agree not to dispute charges after the purchase has been
                made and your tickets and/or other products have been delivered
                by email confirmation or have been shipped to you. You agree to
                reimburse {companyName} in cases of charge back or credit card
                disputes where you have genuinely purchased a service on our
                website.
              </li>
              <li>
                Most credit card transactions over the phone to our Customer
                Service Department are recorded and are available as evidence in
                case of any dispute.
              </li>
              <li>
                Online credit card transactions are authorized at the time a
                user or anyone acting on their behalf accepts these terms and
                conditions and continues with the purchase.
              </li>
              <li>
                In order to provide you further safety, when certain
                transactions are determined to be high risk by our systems, we
                will not process such transactions unless our credit card
                verification team has determined that it's safe to process them.
                In order to establish validity of such transactions, we may
                contact you or your bank.
              </li>
            </ul>
            <h3>Credit Card Declines</h3>
            <p>
              At the time of processing your transaction if your credit card
              declines, we will make all efforts to notify you by way of an
              email message within 3 business days. The transaction will not be
              processed if your credit card has declined. The FARE and any other
              BOOKING DETAILS are NOT GUARANTEED.If there is a fare change then
              you have a right to cancel the booking at no cost to you. There
              will be no service fees charged for this.
            </p>
            <h3>Termination</h3>
            <p>
              We reserve the right, in our sole discretion, and without
              liability, to terminate your access to all or part of the Site,
              with or without notice, for any reason or no reason.
            </p>
            <h3>Severability</h3>
            <p>
              These terms and conditions are severable. If any provision is
              determined to be unenforceable or invalid, such provision shall
              nonetheless be enforced fully permitted by applicable law, and
              such determination shall not affect the validity and
              enforceability of any other remaining provisions.
            </p>
            <h3>No Waiver</h3>
            <p>
              No failure on the part of {companyName} to enforce any part of
              these Terms and Conditions shall constitute a waiver of any of
              {companyName}'s rights under these Terms and Conditions, whether
              for past or future actions on the part of any person. Neither the
              receipt of any funds by {companyName} nor the reliance of any
              person on {companyName}'s actions shall be deemed to constitute a
              waiver of any part of these Terms and Conditions. Only a specific,
              written waiver signed by an authorized representative of
              {companyName} shall have any legal effect whatsoever.
            </p>
            <h3>Data Scraping</h3>
            <p>
              If you abuse this Site with numerous scans, data scraping, or
              screen scraping, we reserve the right to terminate your access to
              this Site immediately.
            </p>
            <h3>Seats, Meals, Frequent Flyer &amp; Other Requests</h3>
            <p>
              Please note your seat, meals, frequent flyer &amp; other special
              requests are a request only. The airline reserves the right to
              apply any revisions to the requested seat allocation without
              notification. All requests should be verified with the Airline. We
              do not guarantee you will be assigned the seat you have requested.
              We also do not guarantee that your meal, frequent flyer &amp;
              other special requests will be sent to and confirmed by the
              airline. It is therefore recommended you contact your airline
              directly to confirm these requests. Click here to view the List of
              Airlines and Phone numbers.
            </p>
            <h3>Baggage Policy on Connecting Flights</h3>
            <p>
              When there are two or more airlines involved for connecting
              flights then you may have to reclaim your bags at the connecting
              airport and CHECK-IN again to continue your journey. You are also
              advised that in these cases if you have excess baggage, you must
              pay any excess baggage fee assessed by each airline. Most airlines
              now charge baggage fees even for the first bag checked-In, we
              recommend traveling light to reduce these costs. To locate the
              fees on baggage CHECK-IN by airlines, please visit our "Baggage
              Fees" page or look for a link baggage fees on our website. Baggage
              fees range from 15 USD up to 100 USD or more depending on the size
              and weight of the bag and is per checked bag. These fees are to be
              paid directly to airline upon using such service. We try to keep
              the baggage fees table updated but we recommend you contact the
              airline directly for the latest fees on check baggage and policy
              as it relates to baggage.
            </p>
            <h3>Baggage Liability</h3>
            <p>
              For flights within the U.S., federal rules require any limit on an
              airline's baggage liability to be at least $3,300 per passenger.
              For international travel (including domestic portions of
              international journeys) different liability limitations apply to
              the loss, delay, or damage to baggage. If the Montreal Convention
              applies, the limit is 1,131 Special Drawing Rights (approximately
              $1700) per passenger unless a higher value is declared in advance
              and additional charges are paid. If the Warsaw Convention applies,
              the limit is approximately $9.07 per pound ($20.00 per kilogram)
              for checked baggage and $400 per passenger for unchecked baggage
              unless a higher value is declared in advance and additional
              charges are paid. Excess valuation may not be declared on certain
              types of valuable articles. Airlines assume no liability for
              fragile or perishable articles. Further information may be
              obtained from the airline.
            </p>
            <h3>Baggage Policy and Fees</h3>
            <p>
              If you have excess baggage, you must pay any excess baggage fee
              assessed by each airline. Most airlines now charge baggage fees
              even for the first bag checked-In, we recommend traveling light to
              reduce these costs. To locate the fees on baggage check-in by
              airlines, please visit our "Baggage Fees" page or look for a link
              baggage fees on our website. A baggage fee range from 15 USD up to
              50 USD or more depending on the size and weight of the bag and is
              per checked bag. These fees are to be paid directly to airline
              upon using such service. We try to keep the baggage fees table
              updated but we recommend you contact the airline directly for the
              latest fees on check baggage and policy as it relates to baggage.
            </p>
            <h3>Overbooking of Flights</h3>
            <p>
              Airline flights may be overbooked, and there is a slight chance
              that a seat will not be available on a flight for which a person
              has a confirmed reservation. If the flight is overbooked, no one
              will be denied a seat until airline personnel first ask for
              volunteers willing to give up their reservation in exchange for
              compensation of the airline's choosing. If there are not enough
              volunteers, the airline may deny boarding to other persons in
              accordance with its boarding priority. With few exceptions,
              including failure to comply with the carrier's CHECK-IN deadline
              (which are available upon request from the air carrier), persons
              denied boarding involuntarily are entitled to compensation from
              the airline. The complete rules for the payment of compensation
              and each airline's boarding priorities are available at all
              airport ticket counters and boarding locations. Some airlines do
              not apply these consumer protections to travel from some foreign
              countries, although other consumer protections may be available.
              Check with the airline or call us for details.
            </p>
          </div>
        </span>
      </div>
    </>
  );
};

export default TermsAndCondition;
