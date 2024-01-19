// EmailForm.jsx (React component)

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CustomerReceipt = () => {
    const [submitBookingData, setSubmitBookingData] = useState(null);

    useEffect(() => {
        // Define the API endpoint URL
        const apiUrl = "http://localhost:5000/submit-form";
    
        // Fetch data from the API using Axios in the useEffect hook
        axios
          .get(apiUrl)
          .then((response) => setSubmitBookingData(response.data))
          .catch((error) => console.error("Error fetching data: ", error));
      }, []);
  console.log('check api URL',submitBookingData)
    return (
      <>
        <div style={{ background: "#fff" }}>
  <div className="tem-section">
    <div style={{ backgroundColor: "#fff", padding: 10, textAlign: "left" }}>
      <table width="100%" cellPadding={0} cellSpacing={0}>
        <tbody>
          <tr>
            <td style={{ textAlign: "left", width: "50%" }}>
              <img
                src="https://www.farehold.com/media/images/logo.png"
                alt=""
                style={{ width: 130 }}
              />
            </td>
            <td style={{ textAlign: "right", width: "50%", fontSize: 16 }}>
              <b>
                Booking Reference No. : 
              </b>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="need" style={{ background: "#048c9b", textAlign: "right" }}>
      <p style={{ color: "#fff", fontSize: 16, padding: "0.5rem" }}>
        Need help, Our 24x7 Toll Free Support:{" "}
        <a style={{ textDecoration: "none" }} href="tel:+1-888-295-4144">
          <b style={{ color: "#fff" }}>+1-888-295-4144</b>
        </a>
      </p>
    </div>
    <div className="book-para">
      <p>
        Your Booking is <b>in progress</b> with booking reference number :{" "}
        <b>
          ${"{"}submitBookingData.randomNumber{"}"}
        </b>
      </p>
      <p>
        If any query please contact our customer support at{" "}
        <a href="tel:+1-888-295-4144">
          <b style={{ color: "#048c9b" }}>+1-888-295-4144</b>
        </a>{" "}
        or send us an email at{" "}
        <a href="mailto:support@farehold.com">
          <b style={{ color: "#048c9b" }}>support@farehold.com</b>
        </a>{" "}
        and one of our travel expert will be pleased to assist you.In Such
        unlikely event, if your tickets cannot be processed for any reason you
        will be notified via email or by telephone and your payment will NOT be
        processed.
      </p>
    </div>
    <div style={{ padding: "0rem 0.5rem", background: "#048c9b" }}>
      <div
        className="need"
        style={{ background: "#048c9b", textAlign: "left" }}
      >
        <p style={{ color: "#fff", fontSize: 18, padding: "0.5rem" }}>
          Traveler(s) Information
        </p>
      </div>
    </div>
    ${"{"}userInformationHTML{"}"}
  </div>
  <div className="col-12">
    <div className="bg-secondary rounded h-100">
      <div
        className="need"
        style={{ background: "#048c9b", textAlign: "left" }}
      >
        <p style={{ color: "#fff", fontSize: 18, padding: "0.5rem" }}>
          Flight Details
        </p>
      </div>
      <div className="table-responsive">
        <div style={{ overflowX: "auto" }}>
          ${"{"}flightDataHTML{"}"}
          <table
            width="100%"
            style={{ borderCollapse: "collapse", border: "1px solid #ccc" }}
          >
            <thead>
              <tr style={{ backgroundColor: "#f1f1f1", textAlign: "left" }}>
                <th style={{ padding: 8, border: "1px solid #ccc" }}>
                  Airline
                </th>
                <th style={{ padding: 8, border: "1px solid #ccc" }}>
                  Departure
                </th>
                <th style={{ padding: 8, border: "1px solid #ccc" }}>
                  Arrival
                </th>
                <th style={{ padding: 8, border: "1px solid #ccc" }}>
                  Flight Details
                </th>
                <th style={{ padding: 8, border: "1px solid #ccc" }}>Class</th>
                <th style={{ padding: 8, border: "1px solid #ccc" }}>
                  Duration
                </th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  </div>
  <div>
    <div className="need" style={{ background: "#048c9b", textAlign: "left" }}>
      <p style={{ color: "#fff", fontSize: 18, padding: "0.5rem" }}>
        Price Info
      </p>
    </div>
    <div style={{ width: "100%", overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr>
            <th
              style={{
                padding: 8,
                border: "1px solid #ccc",
                textAlign: "left"
              }}
            >
              Price
            </th>
            <th
              style={{
                padding: 8,
                border: "1px solid #ccc",
                textAlign: "right"
              }}
            >
              Amount
            </th>
          </tr>
        </thead>
        <tbody style={{ textAlign: "left" }}>
          <tr>
            <th style={{ padding: 8, border: "1px solid #ccc" }}>
              Base Amount
            </th>
            <td
              style={{
                padding: 8,
                border: "1px solid #ccc",
                textAlign: "right"
              }}
            >
              USD ${"{"}
              submitBookingData.fareDetails.travelerDetails[0].totalAmount{"}"}
            </td>
          </tr>
          <tr>
            <th style={{ padding: 8, border: "1px solid #ccc" }}>Main Cabin</th>
            <td
              style={{
                padding: 8,
                border: "1px solid #ccc",
                textAlign: "right"
              }}
            >
              ${"{"}submitBookingData.fareDetails.cabin ? "USD 89" : "No"{"}"}
            </td>
          </tr>
          <tr>
            <th style={{ padding: 8, border: "1px solid #ccc" }}>
              Taxes and Fees
            </th>
            <td
              style={{
                padding: 8,
                border: "1px solid #ccc",
                textAlign: "right"
              }}
            >
              USD ${"{"}
              submitBookingData.fareDetails.travelerDetails[0].taxAmount{"}"}
            </td>
          </tr>
          <tr>
            <th style={{ padding: 8, border: "1px solid #ccc" }}>
              Total Amount
            </th>
            <td
              style={{
                padding: 8,
                border: "1px solid #ccc",
                textAlign: "right"
              }}
            >
              USD ${"{"}submitBookingData.fareDetails.totalAmount{"}"}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="need" style={{ background: "#048c9b", textAlign: "left" }}>
      <p style={{ color: "#fff", fontSize: 18, padding: "0.5rem" }}>
        Terms &amp; Conditions
      </p>
    </div>
    <p>
      Please feel free to contact us to confirm your itinerary, or other special
      requests (Seats, Meals, Wheelchair, etc.) and luggage weight allowances (a
      number of airlines have recently made changes to the luggage weight
      limits) 72 hours prior to the departure date. We look forward to help you
      again with your future travel plans.
    </p>
    <p>
      1. This is non-refundable unless otherwise stated*
      <br />
      2. All fares are not guaranteed until ticketed*
    </p>
    <div className="need" style={{ background: "#048c9b", textAlign: "left" }}>
      <p style={{ color: "#fff", fontSize: 18, padding: "0.5rem" }}>
        Contact Info
      </p>
    </div>
    <div style={{ width: "100%", overflowX: "auto" }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead style={{ backgroundColor: "#f2f2f2" }}>
          <tr style={{ textAlign: "left" }}>
            <th style={{ padding: 8, border: "1px solid #ccc" }}>
              Agency Name
            </th>
            <th style={{ padding: 8, border: "1px solid #ccc" }}>Email Id </th>
            <th style={{ padding: 8, border: "1px solid #ccc" }}>
              Customer Care
            </th>
          </tr>
        </thead>
        <tbody>
          <tr style={{ textAlign: "left" }}>
            <td style={{ padding: 8, border: "1px solid #ccc" }}>Farehold</td>
            <td style={{ padding: 8, border: "1px solid #ccc" }}>
              <a
                style={{ color: "#048c9b" }}
                href="mailto:support@farehold.com"
              >
                support@farehold.com
              </a>
            </td>
            <td style={{ padding: 8, border: "1px solid #ccc" }}>
              <a style={{ color: "#048c9b" }} href="tel:">
                +1-888-295-4144
              </a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div className="need" style={{ background: "#048c9b", textAlign: "left" }}>
      <p style={{ color: "#fff", fontSize: 18, padding: "0.5rem" }}>Policy</p>
    </div>
    <p>
      We accept credit cards and debit cards issued in US, Canada and several
      other countries as listed in the billings section. We also accept AE/AP
      billing addresses.
      <br /> <br />
      1. Please note: your credit/debit card may be billed in multiple charges
      totaling the final total price. If your credit/debit card or other form of
      payment is not processed or accepted for any reason, we will notify you
      within 24 hours (it may take longer than 24 hours for non credit/debit
      card payment methods). Prior to your form of payment being processed and
      accepted successfully, if there is a change in the price of air fare or
      any other change, you may be notified of this change and only upon such
      notification you have the right to either accept or decline this
      transaction. If you elect to decline this transaction, you will not be
      charged.
      <br /> <br />
      2. Our Post Payment Price Guarantee: Upon successful acceptance and
      processing of your payment (credit/debit card), we guarantee that we will
      honor the total final quoted price of the airline tickets regardless of
      any changes or fluctuation in the price of air fare. Please note: all
      hotel, car rental and tour/activity bookings are only confirmed upon
      delivery of complete confirmation details to the email you provided with
      your reservation. In some cases, pre-payment may be required to receive
      confirmation.
      <br /> <br />
      In order to provide you with further protection, when certain transactions
      are determined to be high-risk by our systems, we will not process such
      transactions unless our credit card verification team has determined that
      it's safe to process them. In order to establish validity of such
      transactions, we may contact you or your bank.
    </p>
    <div className="need" style={{ background: "#048c9b", textAlign: "left" }}>
      <p style={{ color: "#fff", fontSize: 18, padding: "0.5rem" }}>
        Change/ Cancellation Policy
      </p>
    </div>
    <p>
      All travelers must confirm that their travel documents required are
      current and valid for their preferred destinations. The ticket(s) are
      refundable within 4 hours from the time of purchase ONLY for ticketed
      Airlines, at no extra cost. Once ticket is purchased, name changes are not
      allowed according to Airlines Policies, but some Specific Airlines allow
      minor corrections, usually involving 1-2 characters attracting a fees for
      this service. Prices do not include Baggage and Carry-On or other fees
      charged directly by the airline. Fares are not guaranteed until ticketed.
      Fare changes are subject to seat or class availability. All tickets are
      considered non-transferable &amp; non-endorsable.
    </p>
  </div>
</div>

      </>
    );
  };
export default CustomerReceipt;
