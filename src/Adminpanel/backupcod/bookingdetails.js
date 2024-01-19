import React, { useEffect, useState } from "react";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import axios from "axios";

import { useLocation } from "react-router-dom";

const BookingDetail = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [copied, setCopied] = useState(false);
  const [copiedphone, setCopiedphone] = useState(false);
  const [copiedemail, setCopiedemail] = useState(false);
  const [copiedsrdoc, setCopiedsrdoc] = useState(false);
  const [copiednm1, setCopiednm1] = useState(false);
  const [copiedDep, setCopiedDep] = useState(false);
  const [copiedRtn, setCopiedRtn] = useState(false);



  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  // const toggleSidebar = () => {
  //   // Check if location.state is null before toggling the sidebar
  //   if (location.state === null) {
  //     // Fetch data from the API using Axios
  //     axios
  //       .get("http://localhost:5000/bookings")
  //       .then((response) => {
  //         setBookingData(response.data);
  //         setIsSidebarOpen(!isSidebarOpen);
  //       })
  //       .catch((error) => console.error("Error fetching data: ", error));
  //   } else {
  //     // If location.state is not null, update apiData and toggle the sidebar
  //     setIsSidebarOpen(!isSidebarOpen);
  //   }
  // };

  const location = useLocation();

  const [apiData, setApiData] = useState(null);
  const [bookingData, setBookingData] = useState([]);

  useEffect(() => {
    // Update apiData if location.state changes
    setApiData(location.state || null);
  }, [location.state]);

  console.log("apidata check:", apiData);

  // useEffect(() => {
  //   // Define the API endpoint URL
  //   const apiUrl = "http://localhost:5000/bookings";

  //   // Fetch data from the API using Axios in the useEffect hook
  //   axios
  //     .get(apiUrl)
  //     .then((response) => setBookingData(response.data))
  //     .catch((error) => console.error("Error fetching data: ", error));
  // }, []);

  



  useEffect(() => {
    // Fetch data from the API only if location.state is initially null
    if (location.state === null) {
      const apiUrl = "http://localhost:5000/bookings";
  
      axios
        .get(apiUrl)
        .then((response) => setBookingData(response.data))
        .catch((error) => console.error("Error fetching data: ", error));
    }
  }, [location.state]);

  console.log("BookingData check", bookingData);

  // on click manage toggle code below
  // Function to toggle the visibility of a row
  const userInformation = location.state?.details?.userInformation || {};
  const keys = Object.keys(userInformation);

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


  function formatDateDepAmadeus(dateTimeString) {
    const date = new Date(dateTimeString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('en-US', { month: 'short' }).toUpperCase();
    return `${day}${month}`;
  }
  
  // Example usage:
  // const formattedDateDepAmadeus = formatDateDepAmadeus(location.state.flightData?.data[0]
  //   ?.itineraries?.[0]?.segments?.[0]?.arrival
  //   ?.at);
  // console.log(formattedDateDepAmadeus); // Output: 17JAN


  const travelerData = Array.isArray(location.state?.details?.userInformation)
    ? location.state.details.userInformation
    : [];
  // if (!location.state || !location.state.details) {
  //   return <div>Loading...</div>;
  // }
  console.log("location data", location.state);
  console.log("Traveller Data", travelerData);

  const formatDateTime = (timestamp) => {
    const options = {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(timestamp).toLocaleDateString("en-US", options);
  };

  const formatDateAmedeus = (inputDate) => {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, "0");
    const month = new Intl.DateTimeFormat("en", { month: "short" })
      .format(date)
      .toUpperCase();
    const year = date.getFullYear().toString().slice(-2);

    return `${day}${month}${year}`;
  };

  const emailWithReplacement = location.state.details.emaiAndId.email
    .replace("@", "//")
    .replace("_", "//");

  const formattedCode = `SRCTCE-${emailWithReplacement}`;

  const phonewith = location.state.details.emaiAndId.phone.trim();
  const cleanPhoneNumber = phonewith.replace(/[^0-9]/g, ""); // Remove non-numeric characters
  // const onlyphoned = phonewith.replace(/[^0-9]/g, '');
  const onlyphoned = `${cleanPhoneNumber}`;

  const formattedCodefour = `SRCTCM-${cleanPhoneNumber}`;




  const handleBulknm1CopyClick = () => {
    const combinedText = keys
      .map((key, index) => {
        const rowId = `nm1copy${index}`;
        const rowElement = document.getElementById(rowId);
  
        if (rowElement) {
          return rowElement.innerText;
        }
  
        return '';
      })
      .join('\n');
  
    navigator.clipboard.writeText(combinedText);
    setCopiednm1(true);
  
    // Reset the copied state after a short delay
    setTimeout(() => {
      setCopiednm1(false);
    }, 2000);
  };
  


  const handleBulkCopyClick = () => {
    const combinedText = keys
      .map((key, index) => {
        const rowId = `srdoccopy${index}`;
        const rowElement = document.getElementById(rowId);
  
        if (rowElement) {
          return rowElement.innerText;
        }
  
        return '';
      })
      .join('\n');
  
    navigator.clipboard.writeText(combinedText);
    setCopiedsrdoc(true);
  
    // Reset the copied state after a short delay
    setTimeout(() => {
      setCopiedsrdoc(false);
    }, 2000);
  };
  
  

  const handleDepCopyClick = () => {
    const cardInfo = document.getElementById('depcopy');

    if (cardInfo) {
      navigator.clipboard.writeText(cardInfo.innerText);
      // console.log('Content copied hhhhhhhhhhhhhhhhhhhhhhh:', cardInfo.innerText);
      setCopiedDep(true);

      // Reset the copied state after a short delay
      setTimeout(() => {
        setCopiedDep(false);
      }, 2000);
    }
  };
  const handleRtnCopyClick = () => {
    const cardInfo = document.getElementById('rtncopy');

    if (cardInfo) {
      navigator.clipboard.writeText(cardInfo.innerText);
      // console.log('Content copied hhhhhhhhhhhhhhhhhhhhhhh:', cardInfo.innerText);
      setCopiedRtn(true);

      // Reset the copied state after a short delay
      setTimeout(() => {
        setCopiedRtn(false);
      }, 2000);
    }
  };


  const handleemailCopyClick = () => {
    const cardInfo = document.getElementById('emailcopy');

    if (cardInfo) {
      navigator.clipboard.writeText(cardInfo.innerText);
      console.log('Content copied hhhhhhhhhhhhhhhhhhhhhhh:', cardInfo.innerText);
      setCopiedemail(true);

      // Reset the copied state after a short delay
      setTimeout(() => {
        setCopiedemail(false);
      }, 2000);
    }
  };


//// below code of handlephone
  const handleHandeCopyClick = () => {
    const cardInfo = document.getElementById('phonecopy');

    if (cardInfo) {
      navigator.clipboard.writeText(cardInfo.innerText);
      console.log('Content copied hhhhhhhhhhhhhhhhhhhhhhh:', cardInfo.innerText);
      setCopiedphone(true);

      // Reset the copied state after a short delay
      setTimeout(() => {
        setCopiedphone(false);
      }, 2000);
    }
  };


  const handleCardCopyClick = () => {
    const cardInfo = document.getElementById('creditCardInfo');

    if (cardInfo) {
      navigator.clipboard.writeText(cardInfo.innerText);
      console.log('Content copied hhhhhhhhhhhhhhhhhhhhhhh:', cardInfo.innerText);
      setCopied(true);

      // Reset the copied state after a short delay
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }
  };

  const handleCopyClick = (content) => {
    navigator.clipboard.writeText(content);
    setCopied(true);

    // Reset the copied state after a short delay
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };



  function formatShortDate(dateTimeString) {
    const date = new Date(dateTimeString);
    
    // Get day and month names
    const day = date.getDate().toString().padStart(2, '0');
    const monthNames = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    const month = monthNames[date.getMonth()];
  
    // Combine day and month
    return `${day}${month}`;
  }
  
  // Example usage
  const shortDate = formatShortDate(location.state.details.flightData?.data?.[0]?.itineraries?.[0]?.segments?.[0]?.departure?.at);
  const shortDatertn = formatShortDate(location.state.details.flightData?.data?.[0]?.itineraries?.[1]?.segments?.[0]?.departure?.at);
  
 

const flightData = location.state.details.flightData?.data?.[0];
console.log('flightData:', flightData);
if (!flightData) {
  return <div>No flight data</div>;
}
const itineraries = flightData.itineraries?.[0];
console.log('itineraries:', itineraries);
if (!itineraries) {
  return <div>No itineraries</div>;
}
const segments = itineraries.segments;
console.log('segments:', segments);
const lastSegment = segments?.[segments.length - 1];
console.log('lastSegment:', lastSegment);
if (!lastSegment) {
  return <div>No segments</div>;
}
const iataCode = lastSegment.arrival?.iataCode;
console.log('iataCode:', iataCode);
if (!iataCode) {
  return <div>No iataCode in the last segment</div>;
}





const flightDataarrival = location.state.details.flightData?.data?.[0];
console.log('flightData:', flightDataarrival);
if (!flightDataarrival) {
  return <div>No flight data</div>;
}

const itinerariesarrival = flightDataarrival.itineraries?.[1] || flightDataarrival.itineraries?.[0];
console.log('itineraries:', itinerariesarrival);
if (!itinerariesarrival) {
  return <div>No itineraries</div>;
}

const segmentsarrival = itinerariesarrival.segments;
console.log('segments:', segmentsarrival);
const lastSegmentarrval = segmentsarrival?.[segmentsarrival.length - 1];
console.log('lastSegment:', lastSegmentarrval);
if (!lastSegmentarrval) {
  return <div>No segments</div>;
}

const iataCodearrival = lastSegmentarrval.arrival?.iataCode;
console.log('iataCode:', iataCodearrival);
if (!iataCodearrival) {
  return <div>No iataCode in the last segment</div>;
}

// If you reached this point, it means all conditions passed
// return <div>Page can access</div>;

console.log("apidata fffffffffffffffffffffff check:", apiData ? apiData.details : null);


  return (
    <>
      <div className="container-fluid position-relative d-flex p-0">
      <Sidebar isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
        <div className={`content ${isSidebarOpen ? "open" : ""}`}>
          <TopNavbar toggleSidebar={toggleSidebar} />
          <div className="container-fluid pt-3 px-3">
            <div className="row g-2">
              <div className="col-12 mb-2">
                <div className="bg-secondary details-col-sp rounded h-100 p-2">
                  <div className="details-ref-np">
                  <h5 className="mb-2"><b style={{color:'#000'}}>Booking Ref# {location.state.details.randomNumber}</b></h5>
                  <h5><b>Date: {location.state.details?.deviceInfo?.currentDate
                                    ? new Date(
                                        location.state.details.deviceInfo.currentDate
                                      ).toLocaleString("en-US", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                      })
                                    : "N/A"}</b> </h5>
                  </div>
                  <h6 className="mb-1 details-title">User Information </h6>
                  <div className="table-responsive mybookingdetail-table">
                    <table className="table table-bordered my-hm-table">
                      <thead className="details-thead">
                        <tr>
                          <th scope="col">S.No.</th>
                          <th scope="col">Traveller </th>
                          <th scope="col">First Name</th>
                          <th scope="col">Middle Name</th>
                          <th scope="col">Last Name</th>
                          <th scope="col">Gender</th>
                          <th scope="col">Date of Birth</th>

                          <th scope="col">Email</th>
                          <th scope="col">Phone</th>
                        </tr>
                      </thead>
                      <tbody className="detail-body">
                        {keys.map((key, index) => (
                          <>
                            <tr key={key}>
                              <td>{index + 1}</td>
                              <td>
                                {key.startsWith("ADULT")
                                  ? "Adt"
                                  : key.startsWith("CHILD")
                                  ? "Chd"
                                  : key.startsWith("HELD_")
                                  ? "Inf"
                                  : ""}
                              </td>

                              <td>
                              {userInformation[key].firstName}

                              </td>
                              <td>
                              {userInformation[key].middleName}
                              </td>
                              <td>
                              {userInformation[key].lastName}

                              </td>
                              <td>
                                {userInformation[key].gender
                                  ? userInformation[key].gender
                                      .charAt(0)
                                      .toUpperCase()
                                  : ""}
                              </td>
                              <td>{userInformation[key].date}</td>
                              {/* Render email and phone only for the first iteration */}
                              {index === 0 ? (
                                <>
                                  <td>
                                    {location.state.details.emaiAndId.email}
                                  </td>
                                  <td>{onlyphoned}</td>
                                </>
                              ) : (
                                <>
                                  <td>- - - - - -</td>
                                  <td>- - - - - -</td>
                                </>
                              )}
                            </tr>
                          </>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-12 mb-2">
                <div className="bg-secondary details-col-sp rounded h-100 p-2">
                  <h6 className="mb-1 details-title">Flight Information </h6>
                  <div className="table-responsive mybookingdetail-table">
                    <table className="table table-bordered my-hm-table">
                      <thead className="details-thead">
                        <tr>
                          <th scope="col">Airline</th>
                          <th scope="col">Departure</th>
                          <th scope="col">Arrival</th>
                          <th scope="col">Class</th>
                          <th scope="col">Cabin</th>
                          <th scope="col">Trip </th>
                        </tr>
                      </thead>
                      <tbody className="detail-body">
                        {location.state.details.flightData.data[0].itineraries.map(
                          (itinerary, itineraryIndex) =>
                            itinerary.segments.map((segment, segmentIndex) => (
                              <tr key={segmentIndex}>
                                {/* <td>{itineraryIndex + 1}</td> */}
                                <td>
                                  {segment.carrierCode}&nbsp;{segment.number}
                                  <br />
                                </td>
                                <td>
                                  <b> {segment.departure.iataCode}</b>:{" "}
                                  {formatDate(segment.departure.at)}
                                  <br />
                                </td>
                                <td>
                                  <b> {segment.arrival.iataCode}</b>:{" "}
                                  {formatDate(segment.arrival.at)}
                                </td>
                                <td>
                                  {location.state.details.flightData.data[0]
                                    .travelerPricings[0].fareDetailsBySegment[0]
                                    .class || ""}
                                </td>
                                {itineraryIndex === 0 ? (
                                  <>
                                    <td>
                                      {location.state.details.flightData.data[0].travelerPricings[0].fareDetailsBySegment[0].cabin.charAt(
                                        0
                                      ) || ""}
                                    </td>
                                    <td>
                                      {location.state &&
                                      location.state.details &&
                                      location.state.details.flightData &&
                                      location.state.details.flightData.tripType
                                        ? location.state.details.flightData.tripType
                                            .charAt(0)
                                            .toUpperCase()
                                        : ""}
                                    </td>
                                  </>
                                ) : (
                                  <>
                                    <td>- - - - - -</td>
                                    <td>- - - - - -</td>
                                  </>
                                )}
                              </tr>
                            ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-12 mb-2 col-sm-12">
                <div className="bg-secondary details-col-sp rounded h-100 p-2">
                  <h6 className="mb-1 details-title">Fare Details</h6>
                  <div className="table-responsive mybookingdetail-table">
                    <table className="table table-bordered my-hm-table">
                      <thead className="details-thead">
                        <tr>
                          <th scope="col">Base Amount</th>
                          <th scope="col">Main Cabin</th>
                          <th scope="col">Markup</th>
                          <th scope="col">Taxes and Fees</th>
                          <th scope="col">Total Amount</th>
                        </tr>
                      </thead>
                      <tbody className="detail-body">
                        <tr>
                          <td>
                            $
                            {
                              location.state.details.fareDetails
                                .travelerDetails[0].totalAmount
                            }
                          </td>
                          <td>
                            $
                            {location.state.details.fareDetails.cabinAmount
                              ? `${location.state.details.fareDetails.cabinAmount}`
                              : "No"}
                          </td>
                          <td>$800</td>
                          <td>
                            $
                            {
                              location.state.details.fareDetails
                                .travelerDetails[0].taxAmount
                            }
                          </td>
                          <td>
                            ${location.state.details.fareDetails.totalAmount}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-12 mb-2">
                <div className="bg-secondary details-col-sp rounded h-100 p-2">
                  <h6 className="mb-1 details-title">Card Information</h6>
                  <div className="table-responsive mybookingdetail-table">
                    <table className="table table-bordered my-hm-table">
                      <thead className="details-thead">
                        <tr>
                          <th scope="col">First Name</th>
                          <th scope="col">Middle Name</th>
                          <th scope="col">Last Name</th>
                          <th scope="col">Card Number</th>
                          <th scope="col">Expiration</th>
                          <th scope="col">CVV</th>
                          <th scope="col">Card Type</th>
                        </tr>
                      </thead>

                      <tbody className="detail-body">
                        <tr>
                          <td>
                          {location.state.details.creditCardData.firstName}

                          </td>
                          <td>
                          {location.state.details.creditCardData.middleName}

                          </td>

                          <td>
                          {location.state.details.creditCardData.lastName}

                          </td>
                          <td>
                            {location.state.details.creditCardData.cardNumber}
                          </td>
                          <td>
                            {
                              location.state.details.creditCardData
                                .expirationMonth
                            }
                            /
                            {location.state.details.creditCardData.expirationYear.slice(
                              2
                            )}
                          </td>

                          <td>{location.state.details.creditCardData.cvv}</td>
                          <td>
                            {location.state.details.creditCardData.cardType}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-12 mb-2">
                <div className="bg-secondary details-col-sp rounded h-100 p-2">
                  <h6 className="mb-1 details-title">Billing Address</h6>
                  <div className="table-responsive mybookingdetail-table">
                    <table className="table table-bordered my-hm-table">
                      <thead className="details-thead">
                        <tr>
                          <th scope="col">Billing Address</th>
                       
                        </tr>
                      </thead>
                      <tbody className="detail-body">
                        <tr>
                          <td>
                            {location.state.details.billingCard.billingAddress
                              .charAt(0)
                              .toUpperCase() +
                              location.state.details.billingCard.billingAddress.slice(
                                1
                              )},{location.state.details.billingCard.city},{location.state.details.billingCard.state},{location.state.details.billingCard.postalCode},{location.state.details.billingCard.country}
                              
                              
                              
                          </td>
                         
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

             

<div className="col-12 col-md-12 mb-2">
  <div className="bg-secondary w-100 details-col-sp rounded h-100 p-2">
    <h6 className="mb-1 details-title">Comments</h6>
    <>
      {(location.state?.details?.comments ?? []).length > 0 ? (
        <div className="row">
          {location.state.details.comments
            .slice(1)
            .map((comment, index) => (
              <div className="col-md-3 mt-2" key={index}>
                <div className="comment-wrap">
                  <p>S.No: {index + 1}</p>
                  <p>{comment.content}</p>
                  <p>{formatDateTime(comment.timestamp)}</p>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <p>No comments available.</p>
      )}
    </>
  </div>
</div>


              <div className="col-12 mb-2">
                <div className="bg-secondary details-col-sp rounded h-100 p-2">
                  <h6 className="mb-1 details-title">Device Information</h6>
                  <div className="table-responsive mybookingdetail-table">
                    <table className="table table-bordered my-hm-table">
                      <thead className="details-thead">
                        <tr>
                          <th scope="col">Browser</th>
                          <th scope="col">Computer Name</th>
                          <th scope="col">Current Date</th>
                          <th scope="col">Device Type</th>
                          <th scope="col">IP Address</th>
                        </tr>
                      </thead>
                      <tbody className="detail-body">
                        <tr>
                          <td>{location.state.details.deviceInfo.browser}</td>
                          <td>
                            {location.state.details.deviceInfo.computerName}
                          </td>
                          <td>
                            {formatDate(
                              location.state.details.deviceInfo.currentDate
                            )}
                          </td>
                          <td>
                            {location.state.details.deviceInfo.deviceType}
                          </td>
                          <td>{location.state.details.deviceInfo.ipAddress}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className="col-12 mb-2">
                <div className="bg-secondary details-col-sp rounded h-100 p-2">
                  <h6 className="mb-1 details-title">Amadeus Command</h6>
                  <div className="table-responsive mybookingdetail-table">


                  <table className="table table-bordered my-hm-table mt-3">
                        <h6><b>Dep</b></h6>
                        <tbody className="detail-body">
                          {location.state.details.flightData?.data?.[0]?.itineraries?.[0]?.segments?.[0] && (
                             <tr className="amedeus-comman-tr">
                              <>
                              <div id="depcopy" className="amedeus-comman">
                                AN{shortDate}{location.state.details.flightData?.data?.[0]?.itineraries?.[0]?.segments?.[0]?.departure?.iataCode}
                                {iataCode}/A{location.state.details.flightData?.data?.[0]?.itineraries?.[0]?.segments?.[0]?.carrierCode}{location.state.details.flightData?.data?.[0]?.itineraries?.[0]?.segments?.[0]?.number},{location.state.details.flightData?.data?.[0]?.itineraries?.[0]?.segments?.[1]?.carrierCode}{location.state.details.flightData?.data?.[0]?.itineraries?.[0]?.segments?.[1]?.number},{location.state.details.flightData?.data?.[0]?.itineraries?.[0]?.segments?.[2]?.carrierCode}{location.state.details.flightData?.data?.[0]?.itineraries?.[0]?.segments?.[2]?.number}
                                <span className="copy-btn" onClick={handleDepCopyClick}>
        <i class="fa-regular fa-copy"></i> {copiedDep ? 'Copied!' : ''} 
      </span>
                              </div>
                              </>
                            </tr>
                          )}
                        </tbody>
                      

                    </table>




                      <table className="table table-bordered my-hm-table mt-3">
                        <h6><b>Rtn</b></h6>
                        <tbody className="detail-body">
                          {location.state.details.flightData?.data?.[0]?.itineraries?.[1]?.segments?.[0] && (
                            <tr className="amedeus-comman-tr">
                              <>
                              <div id="rtncopy" className="amedeus-comman">
                               AN{shortDatertn}{location.state.details.flightData?.data?.[0]?.itineraries?.[1]?.segments?.[0]?.departure?.iataCode}{iataCodearrival}/A{location.state.details.flightData?.data?.[0]?.itineraries?.[1]?.segments?.[2]?.carrierCode}
                                {location.state.details.flightData?.data?.[0]?.itineraries?.[1]?.segments?.[0]?.number},{location.state.details.flightData?.data?.[0]?.itineraries?.[1]?.segments?.[1]?.carrierCode}{location.state.details.flightData?.data?.[0]?.itineraries?.[1]?.segments?.[1]?.number},{location.state.details.flightData?.data?.[0]?.itineraries?.[1]?.segments?.[2]?.carrierCode}{location.state.details.flightData?.data?.[0]?.itineraries?.[1]?.segments?.[2]?.number}
                                <span className="copy-btn" onClick={handleRtnCopyClick}>
                                <i class="fa-regular fa-copy"></i> {copiedRtn ? 'Copied!' : ''} 
                              </span>
                              </div>
                              </>
                            </tr>
                          )}
                        </tbody>
                      

                    </table>
                    

                  <table className="table table-bordered my-hm-table mt-3">
                      <tbody className="detail-body">
                        <tr className="amedeus-comman-tr">
                        
                            <>
                              <div id="emailcopy" className="amedeus-comman" >
                                {formattedCode}
                                <span className="copy-btn" onClick={handleemailCopyClick}>
                                <i class="fa-regular fa-copy"></i> {copiedemail ? 'Copied!' : ''} 
                              </span>
                              </div>
                            </>
                     
                        </tr>
                      </tbody>
                    </table>

                    <table className="table table-bordered mt-3 my-hm-table">
                      <tbody className="detail-body">
                        <tr className="amedeus-comman-tr">
                          {keys.map((key, index) => (
                            <>
                              <div id={`nm1copy${index}`} className="amedeus-comman" key={key}>
                                {/* <td> */}
                                NM1
                                {userInformation[key].lastName
                                  ? userInformation[key].lastName
                                      .charAt(0)
                                      .toUpperCase() +
                                    userInformation[key].lastName.slice(1)
                                  : ""}
                                /
                                {userInformation[key].firstName
                                  ? userInformation[key].firstName
                                      .charAt(0)
                                      .toUpperCase() +
                                    userInformation[key].firstName.slice(1)
                                  : ""}{" "}
                                {userInformation[key].middleName
                                  ? userInformation[key].middleName
                                      .charAt(0)
                                      .toUpperCase() +
                                    userInformation[key].middleName.slice(1)
                                  : ""}
                                  {index === 0 && ( // Show copy icon only for the first row
        <span className="copy-btn" onClick={handleBulknm1CopyClick}>
          <i className="fa-regular fa-copy"></i> {copiednm1 ? 'Copied!' : ''}
        </span>
      )}
                              </div>
                            </>
                          ))}
                        </tr>
                      </tbody>
                    </table>
                    {/* 2 */}
                    <table className="table table-bordered my-hm-table mt-3">
                      <tbody className="detail-body">
                      <tr className="amedeus-comman-tr">
                        {keys.map((key, index) => (
                          <div id={`srdoccopy${index}`} className="amedeus-comman" key={key}>
                            SRDOCS-----
                            {formatDateAmedeus(userInformation[key].date)}-
                            {userInformation[key].gender
                              ? userInformation[key].gender.charAt(0).toUpperCase()
                              : ""}
                            --
                            {userInformation[key].lastName
                              ? userInformation[key].lastName.charAt(0).toUpperCase() +
                                userInformation[key].lastName.slice(1)
                              : ""}
                            /
                            {userInformation[key].firstName
                              ? userInformation[key].firstName.charAt(0).toUpperCase() +
                                userInformation[key].firstName.slice(1)
                              : ""}
                            {" "}
                            {userInformation[key].middleName
                              ? userInformation[key].middleName.charAt(0).toUpperCase() +
                                userInformation[key].middleName.slice(1)
                              : ""}
                            /P
                            {index === 0 && ( // Show copy icon only for the first row
                              <span className="copy-btn" onClick={handleBulkCopyClick}>
                                <i className="fa-regular fa-copy"></i> {copiedsrdoc ? 'Copied!' : ''}
                              </span>
                            )}
                          </div>
                        ))}
                      </tr>



                      </tbody>
                    </table>
                    {/* 3 */}
                    <table className="table table-bordered my-hm-table mt-3">
                      <tbody className="detail-body">
                        <tr className="amedeus-comman-tr">
                        
                            <>
                              <div id="emailcopy" className="amedeus-comman" >
                                {formattedCode}
                                <span className="copy-btn" onClick={handleemailCopyClick}>
                                <i class="fa-regular fa-copy"></i> {copiedemail ? 'Copied!' : ''} 
                              </span>
                              </div>
                            </>
                     
                        </tr>
                      </tbody>
                    </table>

                    {/* 4 */}
                    <table className="table table-bordered my-hm-table mt-3">
                      <tbody className="detail-body" id="phoneinfo">
                      <tr className="amedeus-comman-tr d-flex">
        <>
      <div id="phonecopy" className="amedeus-comman">
        {formattedCodefour}
        <span className="copy-btn" onClick={handleHandeCopyClick}>
        <i class="fa-regular fa-copy"></i> {copiedphone ? 'Copied!' : ''} 
      </span>
      </div> 
      </>
    </tr>
                      </tbody>
                    </table>

                    {/* 5 */}
                    <table className="table table-bordered my-hm-table mt-3">
                      <tbody className="detail-body">
                        <tr className="amedeus-comman-tr d-flex">
                          {/* <td>NM1</td> */}
                          {/* {keys.map((key, index) => ( */}
                          <>
                            <div className="amedeus-comman" id="creditCardInfo">
                              {/* <td> */}
                              FPCC
                              {(() => {
                                const cardType =
                                  location.state.details.creditCardData
                                    .cardType;

                                if (cardType === "Mastercard") {
                                  return "CA"; // Display 'CA' for MasterCard
                                } else if (cardType === "Visa") {
                                  return "VI"; // Display 'VI' for Visa
                                } else if (cardType === "Discover") {
                                  return "DS"; // Display 'DS' for Discover
                                } else if (cardType === "American Express") {
                                  return "AX"; // Display 'AX' for American Express
                                } else {
                                  return "Unknown"; // Display 'Unknown' if the card type is not recognized
                                }
                              })()}
                              {location.state.details.creditCardData.cardNumber.replace(
                                /\s/g,
                                ""
                              )}
                              /
                              {
                                location.state.details.creditCardData
                                  .expirationMonth
                              }
                              {location.state.details.creditCardData.expirationYear.slice(
                                2
                              )}    

                              <span className="copy-btn" onClick={handleCardCopyClick}>
                             <i class="fa-regular fa-copy"></i> {copied ? 'Copied!' : ''} 
                            </span>
                            </div>
                          </>
                          {/* ))} */}
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default BookingDetail;
