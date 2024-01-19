import React, { useEffect, useState } from "react";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import axios from "axios";

import { useLocation } from "react-router-dom";
import { urlbc } from "../components/Constants";

const BookingDetail = (props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  // const [originalLocationState, setOriginalLocationState] = useState(null);

  const [originalLocationState, setOriginalLocationState] = useState(() => {
    // Retrieve originalLocationState from local storage on component mount
    const storedOriginalLocationState = localStorage.getItem('originalLocationState');
    return storedOriginalLocationState ? JSON.parse(storedOriginalLocationState) : null;
  });

  const [copied, setCopied] = useState(false);
  const [copiedphone, setCopiedphone] = useState(false);
  const [copiedemail, setCopiedemail] = useState(false);
  const [copiedsrdoc, setCopiedsrdoc] = useState(false);
  const [copiednm1, setCopiednm1] = useState(false);
  const [copiedDep, setCopiedDep] = useState(false);
  const [copiedRtn, setCopiedRtn] = useState(false);

  const [comments, setComments] = useState([]);
  // const yourBookingID = 'your_actual_booking_id'; // Replace with the actual booking ID

  const location = useLocation();

  const [apiData, setApiData] = useState(null);
  const [bookingData, setBookingData] = useState([]);




  useEffect(() => {
    const timeout = setTimeout(() => {
      window.scrollTo(0, 0);
    }, ); // Adjust the delay as needed

    return () => clearTimeout(timeout); // Clear timeout on component unmount
  }, []); // This will run only once when the component mounts


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

  // // console.log("BookingData check", bookingData);

  // useEffect(() => {
  //   // Update apiData if location.state changes
  //   setApiData(location.state || null);

  //   // Update originalLocationState only if it's not set
  //   if (!originalLocationState) {
  //     setOriginalLocationState(location.state || null);
  //   }
  // }, [location.state, originalLocationState]);

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };
  // console.log("Original Location State", originalLocationState);


  // useEffect(() => {
  //   const apiUrl = "http://localhost:5000/bookings";

  //   // Fetch data from the API using Axios in the useEffect hook
  //   axios
  //     .get(apiUrl)
  //     .then((response) => {
  //       setApiData(response.data);
  //       // Set the originalLocationState on page load
  //       if (!originalLocationState) {
  //         setOriginalLocationState(response.data.locationState || null);
  //         // Save originalLocationState to local storage
  //         localStorage.setItem('originalLocationState', JSON.stringify(response.data.locationState || null));
  //       }
  //     })
  //     .catch((error) => console.error("Error fetching data: ", error));
  // }, [originalLocationState]);

  // useEffect(() => {
  //   // Update apiData if location.state changes
  //   setApiData(location.state || null);

  //   // Update originalLocationState only if it's not set
  //   if (!originalLocationState) {
  //     // If location.state is available, set originalLocationState to it
  //     if (location.state) {
  //       setOriginalLocationState(location.state);
  //       // Save originalLocationState to local storage
  //       localStorage.setItem('originalLocationState', JSON.stringify(location.state));
  //     }
  //   }
  // }, [location.state, originalLocationState]);

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  // console.log("Original Location State", originalLocationState);



  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/bookings");
  //       setApiData(response.data);

  //       // If originalLocationState is not set or doesn't match the current location state, update it
  //       if (!originalLocationState || originalLocationState.id !== location.state?.id) {
  //         setOriginalLocationState(location.state || null);
  //         localStorage.setItem('originalLocationState', JSON.stringify(location.state || null));
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data: ", error);
  //     }
  //   };

  //   fetchData();
  // }, [location.state, originalLocationState]);

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  // console.log("Original Location State", originalLocationState);

  // useEffect(() => {
  //   // Update apiData if location.state changes
  //   setApiData(location.state || null);
  // }, [location.state]);


  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${urlbc}/bookings`);
        setApiData(response.data);

        // If location.state is available, set originalLocationState to it
        if (location.state) {
          setOriginalLocationState(location.state);
          localStorage.setItem('originalLocationState', JSON.stringify(location.state));
          console.log('check local value', localStorage.setItem('originalLocationState', JSON.stringify(location.state)))
        }
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, [location.state]);


  // //Comment code below
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:5000/fetchComments/${originalLocationState?.details._id}`);
  //       // console.log("Comments retrieved:", response.data);
  //       setComments(response.data.data); // Assuming the comments are in response.data.data
  //     } catch (error) {
  //       console.error("Error retrieving comments: ", error);
  //     }
  //   };
  //   // Fetch data when the component mounts
  //   fetchData();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);
  // // console.log('comment usestate datadddddddddd', comments)
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if originalLocationState and its details are defined before making the API call
        if (originalLocationState && originalLocationState.details && originalLocationState.details._id) {
          const response = await axios.get(`${urlbc}/fetchComments/${originalLocationState.details._id}`);
          // console.log("Comments retrieved:", response.data);
          setComments(response.data.data); // Assuming the comments are in response.data.data
        } else {
          console.warn("originalLocationState or its details are not defined");
        }
      } catch (error) {
        console.error("Error retrieving comments: ", error);
      }
    };
  
    // Fetch data when the component mounts and when originalLocationState changes
    fetchData();
  }, [originalLocationState]);
  




  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Log the current state for debugging purposes
  console.log("Location State:", location.state);
  console.log("Original Location State:", originalLocationState);


  
  // on click manage toggle code below
  // Function to toggle the visibility of a row
  const userInformation = originalLocationState?.details?.userInformation || {};
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


  const travelerData = Array.isArray(originalLocationState?.details?.userInformation)
    ? originalLocationState?.details.userInformation
    : [];
  // if (!location.state || !location.state.details) {
  //   return <div>Loading...</div>;
  // }
  console.log("location data", location.state);
  // console.log("Traveller Data", travelerData);

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

  // const formatDateAmedeus = (inputDate) => {
  //   const date = new Date(inputDate);
  //   const day = date.getDate().toString().padStart(2, "0");
  //   const month = new Intl.DateTimeFormat("en", { month: "short" })
  //     .format(date)
  //     .toUpperCase();
  //   const year = date.getFullYear().toString().slice(-2);

  //   return `${day}${month}${year}`;
  // };

  const formatDateAmedeus = (inputDate) => {
    try {
      // Try to create a Date object from the inputDate
      const date = new Date(inputDate);
  
      // Check if the date is invalid
      if (isNaN(date.getTime())) {
        throw new Error("Invalid date");
      }
  
      const day = date.getDate().toString().padStart(2, "0");
      const month = new Intl.DateTimeFormat("en", { month: "short" })
        .format(date)
        .toUpperCase();
      const year = date.getFullYear().toString().slice(-2);
  
      return `${day}${month}${year}`;
    } catch (error) {
      // Handle the error (e.g., log it, return a default value, etc.)
      console.error("Error formatting date:", error.message);
      return "Invalid Date";
    }
  };
  

  const emailWithReplacement = originalLocationState?.details?.emaiAndId.email
    .replace("@", "//")
    .replace("_", "//");

  const formattedCode = `SRCTCE-${emailWithReplacement}`;

  const phonewith = originalLocationState?.details?.emaiAndId.phone.trim();
  const cleanPhoneNumber = phonewith ? phonewith.replace(/[^0-9]/g, '') : '';
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
      // console.log('Content copied hhhhhhhhhhhhhhhhhhhhhhh:', cardInfo.innerText);
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
      // console.log('Content copied hhhhhhhhhhhhhhhhhhhhhhh:', cardInfo.innerText);
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
      // console.log('Content copied hhhhhhhhhhhhhhhhhhhhhhh:', cardInfo.innerText);
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
  



  // amadeus code work
  const shortDate = formatShortDate(originalLocationState?.details.flightData?.data?.[0]?.itineraries?.[0]?.segments?.[0]?.departure?.at);
  const shortDatertn = formatShortDate(originalLocationState?.details.flightData?.data?.[0]?.itineraries?.[1]?.segments?.[0]?.departure?.at);


const flightData = originalLocationState?.details?.flightData?.data?.[0];
// console.log('flightData:', flightData);
if (!flightData) {
  return <div>No flight data</div>;
}
const itineraries = flightData.itineraries?.[0];
// console.log('itineraries:', itineraries);
if (!itineraries) {
  return <div>No itineraries</div>;
}
const segments = itineraries.segments;
// console.log('segments:', segments);
const lastSegment = segments?.[segments.length - 1];
// console.log('lastSegment:', lastSegment);
if (!lastSegment) {
  return <div>No segments</div>;
}
const iataCode = lastSegment.arrival?.iataCode;
// console.log('iataCode:', iataCode);
if (!iataCode) {
  return <div>No iataCode in the last segment</div>;
}



const flightDataarrival = originalLocationState?.details.flightData?.data?.[0];
// console.log('flightData:', flightDataarrival);
if (!flightDataarrival) {
  return <div>No flight data</div>;
}

const itinerariesarrival = flightDataarrival.itineraries?.[1] || flightDataarrival.itineraries?.[0];
// console.log('itineraries:', itinerariesarrival);
if (!itinerariesarrival) {
  return <div>No itineraries</div>;
}

const segmentsarrival = itinerariesarrival.segments;
// console.log('segments:', segmentsarrival);
const lastSegmentarrval = segmentsarrival?.[segmentsarrival.length - 1];
// console.log('lastSegment:', lastSegmentarrval);
if (!lastSegmentarrval) {
  return <div>No segments</div>;
}

const iataCodearrival = lastSegmentarrval.arrival?.iataCode;
// console.log('iataCode:', iataCodearrival);
if (!iataCodearrival) {
  return <div>No iataCode in the last segment</div>;
}

// console.log('apid data dfasdfsdafdsf', apiData.)

  return (
    <>
      <div className="container-fluid position-relative d-flex p-0">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div className={`content ${isSidebarOpen ? "open" : ""}`}>
          <TopNavbar toggleSidebar={toggleSidebar} />
          <div className="container-fluid pt-3 px-3">
            <div className="row g-2">
              <div className="col-12 mb-2">
                <div className="bg-secondary details-col-sp rounded h-100 p-2">
                  <div className="details-ref-np">
                  <h5 className="mb-2"><b style={{color:'#000'}}>Booking Ref# {originalLocationState?.details?.randomNumber}</b></h5>
                  <h5><b>Date: {originalLocationState?.details?.deviceInfo?.currentDate
                                    ? new Date(
                                        originalLocationState?.details.deviceInfo.currentDate
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
                                    {originalLocationState?.details.emaiAndId.email}
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
                        {originalLocationState?.details.flightData.data[0].itineraries.map(
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
                                  {originalLocationState?.details.flightData.data[0]
                                    .travelerPricings[0].fareDetailsBySegment[0]
                                    .class || ""}
                                </td>
                                {itineraryIndex === 0 ? (
                                  <>
                                    <td>
                                      {originalLocationState?.details.flightData.data[0].travelerPricings[0].fareDetailsBySegment[0].cabin.charAt(
                                        0
                                      ) || ""}
                                    </td>
                                    <td>
                                      {originalLocationState &&
                                      originalLocationState?.details &&
                                      originalLocationState?.details.flightData &&
                                      originalLocationState?.details.flightData.tripType
                                        ? originalLocationState?.details.flightData.tripType
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
                              originalLocationState?.details.fareDetails
                                .travelerDetails[0].totalAmount
                            }
                          </td>
                          <td>
                            $
                            {originalLocationState?.details.fareDetails.cabinAmount
                              ? `${originalLocationState?.details.fareDetails.cabinAmount}`
                              : "No"}
                          </td>
                          <td>$800</td>
                          <td>
                            $
                            {
                              originalLocationState?.details.fareDetails
                                .travelerDetails[0].taxAmount
                            }
                          </td>
                          <td>
                            ${originalLocationState?.details.fareDetails.totalAmount}
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
                          {originalLocationState?.details.creditCardData.firstName}

                          </td>
                          <td>
                          {originalLocationState?.details.creditCardData.middleName}

                          </td>

                          <td>
                          {originalLocationState?.details.creditCardData.lastName}

                          </td>
                          <td>
                            {originalLocationState?.details.creditCardData.cardNumber}
                          </td>
                          <td>
                            {
                              originalLocationState?.details.creditCardData
                                .expirationMonth
                            }
                            /
                            {originalLocationState?.details.creditCardData.expirationYear.slice(
                              2
                            )}
                          </td>

                          <td>{originalLocationState?.details.creditCardData.cvv}</td>
                          <td>
                            {originalLocationState?.details.creditCardData.cardType}
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
                          <th scope="col">Card Holders Address</th>
                       
                        </tr>
                      </thead>
                      <tbody className="detail-body">
                        <tr>
                          <td>
                            {originalLocationState?.details.billingCard.billingAddress
                              .charAt(0)
                              .toUpperCase() +
                              originalLocationState?.details.billingCard.billingAddress.slice(
                                1
                              )},{originalLocationState?.details.billingCard.city},{originalLocationState?.details.billingCard.state},{originalLocationState?.details.billingCard.postalCode},{originalLocationState?.details.billingCard.country}
                              
                              
                              
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
      {(comments ?? []).length > 0 ? (
        <div className="row">
          {comments
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
                          <th scope="col">DeviceType</th>
                          <th scope="col">IP Address</th>
                        </tr>
                      </thead>
                      <tbody className="detail-body">
                        <tr>
                          <td>{originalLocationState?.details.deviceInfo.browser}</td>
                          <td>
                            {originalLocationState?.details.deviceInfo.computerName}
                          </td>
                          <td>
                            {formatDate(
                              originalLocationState?.details.deviceInfo.currentDate
                            )}
                          </td>
                          <td>
                            {originalLocationState?.details.deviceInfo.deviceType}
                          </td>
                          <td>{originalLocationState?.details.deviceInfo.ipAddress}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>


              {/* amadeus code start */}
              <div className="col-12 mb-2">
                <div className="bg-secondary details-col-sp rounded h-100 p-2">
                  <h6 className="mb-1 details-title">Amadeus Command</h6>
                  <div className="table-responsive mybookingdetail-table">


                  <table className="table table-bordered my-hm-table mt-3">
                        <h6><b>Dep</b></h6>
                        <tbody className="detail-body">
                          {originalLocationState.details.flightData?.data?.[0]?.itineraries?.[0]?.segments?.[0] && (
                             <tr className="amedeus-comman-tr">
                              <>
                              <div id="depcopy" className="amedeus-comman">
                                AN{shortDate}{originalLocationState?.details?.flightData?.data?.[0]?.itineraries?.[0]?.segments?.[0]?.departure?.iataCode}
                                {iataCode}/A{originalLocationState?.details?.flightData?.data?.[0]?.itineraries?.[0]?.segments?.[0]?.carrierCode}{originalLocationState?.details?.flightData?.data?.[0]?.itineraries?.[0]?.segments?.[0]?.number},{originalLocationState?.details?.flightData?.data?.[0]?.itineraries?.[0]?.segments?.[1]?.carrierCode}{originalLocationState?.details?.flightData?.data?.[0]?.itineraries?.[0]?.segments?.[1]?.number},{originalLocationState?.details?.flightData?.data?.[0]?.itineraries?.[0]?.segments?.[2]?.carrierCode}{originalLocationState?.details?.flightData?.data?.[0]?.itineraries?.[0]?.segments?.[2]?.number}
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
                          {originalLocationState?.details?.flightData?.data?.[0]?.itineraries?.[1]?.segments?.[0] && (
                            <tr className="amedeus-comman-tr">
                              <>
                              <div id="rtncopy" className="amedeus-comman">
                               AN{shortDatertn}{originalLocationState?.details?.flightData?.data?.[0]?.itineraries?.[1]?.segments?.[0]?.departure?.iataCode}{iataCodearrival}/A{originalLocationState?.details?.flightData?.data?.[0]?.itineraries?.[1]?.segments?.[2]?.carrierCode}
                                {originalLocationState?.details?.flightData?.data?.[0]?.itineraries?.[1]?.segments?.[0]?.number},{originalLocationState?.details?.flightData?.data?.[0]?.itineraries?.[1]?.segments?.[1]?.carrierCode}{originalLocationState?.details?.flightData?.data?.[0]?.itineraries?.[1]?.segments?.[1]?.number},{originalLocationState?.details?.flightData?.data?.[0]?.itineraries?.[1]?.segments?.[2]?.carrierCode}{originalLocationState?.details?.flightData?.data?.[0]?.itineraries?.[1]?.segments?.[2]?.number}
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
                                originalLocationState?.details?.creditCardData
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
                              {originalLocationState?.details.creditCardData.cardNumber.replace(
                                /\s/g,
                                ""
                              )}
                              /
                              {
                                originalLocationState?.details.creditCardData
                                  .expirationMonth
                              }
                              {originalLocationState?.details.creditCardData.expirationYear.slice(
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
              {/* amadeus code end */}


            </div>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default BookingDetail;
