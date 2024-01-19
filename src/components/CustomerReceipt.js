import React, { useState, useEffect } from "react";
import { phoneNumber, companyName, email } from "../components/Constants";
// import axios from 'axios';
import { useLocation } from "react-router-dom";
const CustomerReceipt = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);

  const location = useLocation();
  const [apiData, setApiData] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top-left corner of the page
  }, []);

  useEffect(() => {
    // Check if location.state is not null and has the 'result' property
    if (location.state && location.state.result) {
      setApiData(location.state.result);
    }
  }, [location.state]);

  const handlePrint = () => {
    window.print(); // Initiates the print dialog
  };

  console.log("check api", apiData);
  const userInformation = location.state?.result?.userInformation || {};
  const keys = Object.keys(userInformation);

  function formatDate(date) {
    // Example formatting, modify this according to your date format
    const formattedDate = new Date(date).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    return formattedDate;
  }
  function formatDate(dateTimeString) {
    const options = {
      weekday: "short",
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    const date = new Date(dateTimeString);
    return date.toLocaleString("en-US", options);
  }



  const capitalizeFirstLetter = (word) => {
    return word ? word.charAt(0).toUpperCase() + word.slice(1).toLowerCase() : "";
  };

  return (
    <>
      <div style={{ background: "#fff" }} className="container-fluid">
        <div className="tem-section">
          <div
            style={{ backgroundColor: "#fff", padding: 10, textAlign: "left" }}
          >
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
                  <td
                    style={{
                      textAlign: "right",
                      fontWeight: "bold",
                      width: "50%",
                      fontSize: 16,
                    }}
                  >
                    <b>Booking Reference No. : {apiData?.randomNumber}</b>  <button className="print-button" onClick={handlePrint}>Print Receipt</button> <a href="/" className="go-hm print-button" >Go To Home</a>

                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            className="need mb-3"
            style={{ background: "#048c9b", textAlign: "right" }}
          >
            <p style={{ color: "#fff", fontSize: 16, padding: "0.5rem" }}>
              Need help, Our 24x7 Toll Free Support:{" "}
              <a style={{ textDecoration: "none" }}>
                <b style={{ color: "#fff" }}>{phoneNumber}</b>
              </a>
            </p>
          </div>
          <div className="book-para">
            <p>
              Your Booking is <b>in progress</b> with booking reference number :{" "}
              <b>{apiData?.randomNumber}</b>
            </p>
            <p>
              If any query please contact our customer support at{" "}
              <a>
                <b style={{ color: "#000" }}>{phoneNumber}</b>
              </a>{" "}
              or send us an email at{" "}
              <a>
                <b style={{ color: "#000" }}>{email}</b>
              </a>{" "}
              and one of our travel expert will be pleased to assist you.In Such
              unlikely event, if your tickets cannot be processed for any reason
              you will be notified via email or by telephone and your payment
              will NOT be processed.
            </p>
          </div>
          <div style={{ padding: "0rem 0.5rem", background: "#048c9b" }}>
            <div
              className="need mb-3 mt-3"
              style={{ background: "#048c9b", textAlign: "left" }}
            >
              <p style={{ color: "#fff", fontSize: 18, padding: "0.5rem" }}>
                Travellers Details
              </p>
            </div>
          </div>

          <div className="col-12">
            <div className=" rounded h-100">
              <div style={{ overflowX: "auto" }}>
                <table
                  width="100%"
                  style={{
                    borderCollapse: "collapse",
                    border: "1px solid #000",
                  }}
                >
                  <thead>
                    <tr
                      style={{ backgroundColor: "#f1f1f1", textAlign: "left" }}
                    >
                      <th style={{ padding: "8px", border: "1px solid #000" }}>
                        Serial No.
                      </th>
                      <th style={{ padding: "8px", border: "1px solid #000" }}>
                        Traveller Type
                      </th>
                      <th style={{ padding: "8px", border: "1px solid #000" }}>
                        First Name
                      </th>
                      <th style={{ padding: "8px", border: "1px solid #000" }}>
                        Middle Name 
                      </th>
                      <th style={{ padding: "8px", border: "1px solid #000" }}>
                        Last Name
                      </th>
                      <th style={{ padding: "8px", border: "1px solid #000" }}>
                        Gender
                      </th>
                      <th style={{ padding: "8px", border: "1px solid #000" }}>
                        Date Of Birth
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {keys.map((key, index) => (
                      <>
                        <tr key={key}>
                          <td
                            style={{ padding: "8px", border: "1px solid #000" }}
                          >
                            {index + 1}
                          </td>
                          <td
                            style={{ padding: "8px", border: "1px solid #000" }}
                          >
                            {" "}
                            {key.startsWith("ADULT")
                              ? "Adt"
                              : key.startsWith("CHILD")
                              ? "Chd"
                              : key.startsWith("HELD_")
                              ? "Inf"
                              : ""}
                          </td>
                          <td style={{ padding: "8px", border: "1px solid #000" }}>
  {apiData?.userInformation[key].firstName
    .split(' ')
    .map(word => capitalizeFirstLetter(word))
    .join(' ')}
</td>

                          <td
                            style={{ padding: "8px", border: "1px solid #000" }}
                          >
                            {/* {apiData?.userInformation[key].middleName
                              ? apiData?.userInformation[key].middleName
                                  .charAt(0)
                                  .toUpperCase() +
                                apiData?.userInformation[key].middleName.slice(
                                  1
                                )
                              : ""} */}
{capitalizeFirstLetter(apiData?.userInformation[key].middleName)
  .split(' ')
  .map(word => capitalizeFirstLetter(word))
  .join(' ')}

                          </td>
                          <td
                            style={{ padding: "8px", border: "1px solid #000" }}
                          >
{capitalizeFirstLetter(apiData?.userInformation[key].lastName)
  .split(' ')
  .map(word => capitalizeFirstLetter(word))
  .join(' ')}

                          </td>

                          <td
                            style={{ padding: "8px", border: "1px solid #000" }}
                          >
                            <td>
                              {apiData?.userInformation[key].gender
                                ? apiData?.userInformation[key].gender
                                    .charAt(0)
                                    .toUpperCase() 
                                : ""}
                            </td>
                          </td>
                          <td
                            style={{ padding: "8px", border: "1px solid #000" }}
                          >
                            {apiData?.userInformation[key].date}
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        <div class="col-12">
          <div class=" rounded h-100">
            <div
              className="need mb-3 mt-3"
              style={{ background: "#048c9b", textAlign: "left" }}
            >
              <p style={{ color: "#fff", fontSize: 18, padding: "0.5rem" }}>
                Flight Details
              </p>
            </div>
            <div class="table-responsive">
              <div style={{ overflowX: "auto" }}>
                <table
                  width="100%"
                  style={{
                    borderCollapse: "collapse",
                    border: "1px solid #000",
                  }}
                >
                  <thead>
                    <tr
                      style={{ backgroundColor: "#f1f1f1", textAlign: "left" }}
                    >
                      <th style={{ padding: "8px", border: "1px solid #000" }}>
                        Airline
                      </th>
                      <th style={{ padding: "8px", border: "1px solid #000" }}>
                        Departure
                      </th>
                      <th style={{ padding: "8px", border: "1px solid #000" }}>
                        Arrival
                      </th>
                      <th style={{ padding: "8px", border: "1px solid #000" }}>
                        Flight Details
                      </th>
                      <th style={{ padding: "8px", border: "1px solid #000" }}>
                        Cabin
                      </th>
                      <th style={{ padding: "8px", border: "1px solid #000" }}>
                        Duration
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {location.state.result.flightData.data[0].itineraries.map(
                      (itinerary, itineraryIndex) =>
                        itinerary.segments.map((segment, segmentIndex) => {
                          const carrierCode = segment?.carrierCode;
                          const fullCarrierName = apiData?.flightData?.dictionaries?.carriers?.[carrierCode] || '';

      return (
        <tr key={segmentIndex}>
          <td
            style={{
              padding: "8px",
              border: "1px solid #000",
            }}
          >
            <img
              src={`https://cmsrepository.com/static/flights/flight/airlinelogo-png/${carrierCode?.toLowerCase()}.png`}
              style={{ width: "25px" }}
              alt="Airline Logo"
            />
            <br />
            {fullCarrierName &&
  fullCarrierName
    .split(" ")
    .map(word =>
      word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    )
    .join(" ")}

                            </td>

                            <td
                              style={{
                                padding: "8px",
                                border: "1px solid #000",
                              }}
                            >
                              <b> {segment.departure.iataCode}</b>
                              <br />
                              {formatDate(segment.departure.at)}
                              <br />
                            </td>
                            <td
                              style={{
                                padding: "8px",
                                border: "1px solid #000",
                              }}
                            >
                              <b> {segment.arrival.iataCode}</b>
                              <br />
                              {formatDate(segment.arrival.at)}
                            </td>
                            <td
                              style={{
                                padding: "8px",
                                border: "1px solid #000",
                              }}
                            >
                              {segment.carrierCode}&nbsp;{segment.number}
                              <br />
                            </td>
                            <td
                              style={{
                                padding: "8px",
                                border: "1px solid #000",
                              }}
                            >
                               {capitalizeFirstLetter(
    location.state.result.flightData.data[0].travelerPricings[0]
      .fareDetailsBySegment[0].cabin
  )}
                            </td>
                            <td
                              style={{
                                padding: "8px",
                                border: "1px solid #000",
                              }}
                            >
                              {itinerary.duration
                                ? itinerary.duration
                                    .slice(2) // Remove "pt" prefix
                                    .match(/(\d{1,2})([A-Z])/g) // Match groups of one or two digits followed by a capital letter
                                    .map((group) =>
                                      group.replace(/(\d+)([A-Z])/, "$1$2")
                                    ) // Add a space between hours and minutes
                                    .join(" ") // Join the groups with a space
                                : ""}
                            </td>
                          </tr>
                         );
                        })
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div
            className="need mb-3 mt-3"
            style={{ background: "#048c9b", textAlign: "left" }}
          >
            <p style={{ color: "#fff", fontSize: 18, padding: "0.5rem" }}>
              Customer Contact
            </p>
          </div>
          <div style={{ width: "100%", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ backgroundColor: "#f2f2f2" }}>
                <tr style={{ textAlign: "left" }}>
                  <th style={{ padding: 8, border: "1px solid #000" }}>
                    Email Id{" "}
                  </th>
                  <th style={{ padding: 8, border: "1px solid #000" }}>
                    Contact 
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ textAlign: "left" }}>
                  <td style={{ padding: 8, border: "1px solid #000" }}>
                    <a style={{ color: "#000" }}>
                    {apiData?.emaiAndId?.email}
                      </a>
                  </td>
                  <td style={{ padding: 8, border: "1px solid #000" }}>
                    <a style={{ color: "#000" }} href="tel:">
                    {apiData?.emaiAndId?.phone}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>                          

        <div>
          <div
            className="need mb-3 mt-3"
            style={{ background: "#048c9b", textAlign: "left" }}
          >
            <p style={{ color: "#fff", fontSize: 18, padding: "0.5rem" }}>
              Price Info
            </p>
          </div>
          <div style={{ width: "100%", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ backgroundColor: "#f2f2f2" }}></thead>
              <tbody style={{ textAlign: "left" }}>
                <tr>
                  <th style={{ padding: 8, border: "1px solid #000" }}>
                    Base Amount
                  </th>
                  <td
                    style={{
                      padding: 8,
                      border: "1px solid #000",
                      textAlign: "right",
                      fontWeight: "bold",
                    }}
                  >
                    USD {apiData?.fareDetails.travelerDetails[0].totalAmount}
                  </td>
                </tr>
                <tr>
                  <th style={{ padding: 8, border: "1px solid #000" }}>
                    Main Cabin
                  </th>
                  <td
                    style={{
                      padding: 8,
                      border: "1px solid #000",
                      textAlign: "right",
                      fontWeight: "bold",
                    }}
                  >
                {apiData?.fareDetails.cabinAmount ? `USD ${apiData?.fareDetails.cabinAmount}` : "No"}
                  </td>
                </tr>
                <tr>
                  <th style={{ padding: 8, border: "1px solid #000" }}>
                    Taxes and Fees
                  </th>
                  <td
                    style={{
                      padding: 8,
                      border: "1px solid #000",
                      textAlign: "right",
                      fontWeight: "bold",
                    }}
                  >
                    USD {apiData?.fareDetails.travelerDetails[0].taxAmount}
                  </td>
                </tr>
                <tr>
                  <th style={{ padding: 8, border: "1px solid #000" }}>
                    Total Amount
                  </th>
                  <td
                    style={{
                      padding: 8,
                      border: "1px solid #000",
                      textAlign: "right",
                      fontWeight: "bold",
                    }}
                  >
                    USD {apiData?.fareDetails.totalAmount}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            className="need mb-3 mt-3"
            style={{ background: "#048c9b", textAlign: "left" }}
          >
            <p style={{ color: "#fff", fontSize: 18, padding: "0.5rem" }}>
              Terms &amp; Conditions
            </p>
          </div>
          <p>
            Please feel free to contact us to confirm your itinerary, or other
            special requests (Seats, Meals, Wheelchair, etc.) and luggage weight
            allowances (a number of airlines have recently made changes to the
            luggage weight limits) 72 hours prior to the departure date. We look
            forward to help you again with your future travel plans.
          </p>
          <p>
            1. This is non-refundable unless otherwise stated*
            <br />
            2. All fares are not guaranteed until ticketed*
          </p>
          
          <div
            className="need mb-3 mt-3"
            style={{ background: "#048c9b", textAlign: "left" }}
          >
            <p style={{ color: "#fff", fontSize: 18, padding: "0.5rem" }}>
              Contact Info
            </p>
          </div>
          <div style={{ width: "100%", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ backgroundColor: "#f2f2f2" }}>
                <tr style={{ textAlign: "left" }}>
                  <th style={{ padding: 8, border: "1px solid #000" }}>
                    Agency Name
                  </th>
                  <th style={{ padding: 8, border: "1px solid #000" }}>
                    Email Id{" "}
                  </th>
                  <th style={{ padding: 8, border: "1px solid #000" }}>
                    Customer Care
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ textAlign: "left" }}>
                  <td style={{ padding: 8, border: "1px solid #000" }}>
                    {companyName}
                  </td>
                  <td style={{ padding: 8, border: "1px solid #000" }}>
                    <a style={{ color: "#000" }}>{email}</a>
                  </td>
                  <td style={{ padding: 8, border: "1px solid #000" }}>
                    <a style={{ color: "#000" }} href="tel:">
                      {phoneNumber}
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div
            className="need mb-3 mt-3"
            style={{ background: "#048c9b", textAlign: "left" }}
          >
            <p style={{ color: "#fff", fontSize: 18, padding: "0.5rem" }}>
              Policy
            </p>
          </div>
          <p>
            We accept credit cards and debit cards issued in US, Canada and
            several other countries as listed in the billings section. We also
            accept AE/AP billing addresses.
            <br /> <br />
            1. Please note: your credit/debit card may be billed in multiple
            charges totaling the final total price. If your credit/debit card or
            other form of payment is not processed or accepted for any reason,
            we will notify you within 24 hours (it may take longer than 24 hours
            for non credit/debit card payment methods). Prior to your form of
            payment being processed and accepted successfully, if there is a
            change in the price of air fare or any other change, you may be
            notified of this change and only upon such notification you have the
            right to either accept or decline this transaction. If you elect to
            decline this transaction, you will not be charged.
            <br /> <br />
            2. Our Post Payment Price Guarantee: Upon successful acceptance and
            processing of your payment (credit/debit card), we guarantee that we
            will honor the total final quoted price of the airline tickets
            regardless of any changes or fluctuation in the price of air fare.
            Please note: all hotel, car rental and tour/activity bookings are
            only confirmed upon delivery of complete confirmation details to the
            email you provided with your reservation. In some cases, pre-payment
            may be required to receive confirmation.
            <br /> <br />
            In order to provide you with further protection, when certain
            transactions are determined to be high-risk by our systems, we will
            not process such transactions unless our credit card verification
            team has determined that it's safe to process them. In order to
            establish validity of such transactions, we may contact you or your
            bank.
          </p>
          <div
            className="need mb-3 mt-3"
            style={{ background: "#048c9b", textAlign: "left" }}
          >
            <p style={{ color: "#fff", fontSize: 18, padding: "0.5rem" }}>
              Change/ Cancellation Policy
            </p>
          </div>
          <p className="pb-5">
            All travelers must confirm that their travel documents required are
            current and valid for their preferred destinations. The ticket(s)
            are refundable within 4 hours from the time of purchase ONLY for
            ticketed Airlines, at no extra cost. Once ticket is purchased, name
            changes are not allowed according to Airlines Policies, but some
            Specific Airlines allow minor corrections, usually involving 1-2
            characters attracting a fees for this service. Prices do not include
            Baggage and Carry-On or other fees charged directly by the airline.
            Fares are not guaranteed until ticketed. Fare changes are subject to
            seat or class availability. All tickets are considered
            non-transferable &amp; non-endorsable.
          </p>
        </div>
      </div>
    </>
  );
};
export default CustomerReceipt;
