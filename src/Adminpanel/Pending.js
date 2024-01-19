import React, { useEffect, useState } from "react";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import axios from "axios";
import Pagination from "./Pagination";
import { Link, useNavigate } from "react-router-dom";
import { urlbc } from "../components/Constants";
// import ExcelUpload from "./ExcelUpload";

const Pending = () => {
  const [bookingData, setBookingData] = useState([]);
  const [rowVisibility, setRowVisibility] = useState({});
  const [textareaContent, setTextareaContent] = useState({});

  //// below pagination code
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 7; // Number of results to display per page


  const [circleColors, setCircleColors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false); // State to manage processing state
  const [bookingColor, setBookingColor] = useState('');



  const [pnr, setPnrFilter] = useState("");
  const [agentName, setAgentName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");



  
  const [buttonText, setButtonText] = useState("Accept");
  const [userName, setUserName] = useState("");
  const [buttonClicked, setButtonClicked] = useState(false);
  const [data, setData] = useState({
    acceptAgent: "",
  });

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // //Calculate the total number of pages based on the data length
  const totalPages = Math.ceil(bookingData.length / resultsPerPage);



  //// Define a function to handle page changes
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const acceptButtonColor = userName ? 'yellow' : 'white';
  
  const handleAcceptClick = (data, index, globalIndex) => {
    const savedUserName = localStorage.getItem("USER_NAME") || "";
  
    if (userName === "") {
      setUserName(savedUserName);
      setButtonText("Release");
      setButtonClicked(true);
  
      setCircleColors((prevColors) => ({
        ...prevColors,
        [globalIndex]: savedUserName ? 'yellow' : 'white',
      }));
  
      const postData = {
        acceptAgent: savedUserName,
        bookingColor:'yellow'
      };
  
      axios
        .post(`${urlbc}/saveAccept/${index}`, postData)
        .then((response) => {
          console.log("Data saved:", response.data);
          data.acceptAgent = savedUserName;
          data.bookingColor = 'yellow';
          setBookingColor(response.data)
          // data.bookingColor = "black";
          // console.log("color check", bookingColor)
          // localStorage.setItem("SAVED_COLORS", JSON.stringify(circleColors)); // Update localStorage after state is set
        })
        .catch((error) => {
          console.error("Error saving data: ", error);
        });
    } else {
      setUserName("");
      setButtonText("Accept");
      setButtonClicked(true);
  
      setCircleColors((prevColors) => ({
        ...prevColors,
        [globalIndex]: 'white',
      }));
  
      const postData = {
        acceptAgent: "",
        bookingColor: "white"
      };
  
      axios
        .post(`${urlbc}/saveAccept/${index}`, postData)
        .then((response) => {
          console.log("Data saved:", response.data);
          data.acceptAgent = "";
          // localStorage.setItem("SAVED_COLORS", JSON.stringify(circleColors)); // Update localStorage after state is set
        })
        .catch((error) => {
          console.error("Error saving data: ", error);
        });
    }
  };

   
  const handleCancelClick = (data, index, globalIndex) => {
    const savedUserName = localStorage.getItem("USER_NAME") || "";
  
    const newCircleColors = { ...circleColors };
    newCircleColors[globalIndex] = savedUserName ? 'red' : 'white';
    setCircleColors(newCircleColors);
  
    const postData = {
      acceptAgent: savedUserName,
      bookingColor: 'red'
    };
  
    axios.post(`${urlbc}/cancel-form`, data)
      .then((responseSubmitForm) => {
        console.log('Email sent:', responseSubmitForm.data);
  
        axios.post(`${urlbc}/saveCancel/${index}`, postData)
          .then((response) => {
            console.log("Cancel data saved:", response.data);
            data.acceptAgent = savedUserName;
  
            console.log("Received index:", globalIndex);
  
            localStorage.setItem("SAVED_COLORS", JSON.stringify(newCircleColors));
  
            // Update any necessary state or logic upon successful save
          })
          .catch((error) => {
            console.error("Error saving cancel data: ", error);
          });
      })
      .catch((error) => {
        console.error("Error sending email: ", error);
      });
  };

  const handleIssuedClick = (data, index, globalIndex) => {
    const savedUserName = localStorage.getItem("USER_NAME") || "";
  
    // Clone the existing circleColors object
    const newCircleColors = { ...circleColors };
    // Update the color based on the presence of a saved username
    newCircleColors[globalIndex] = savedUserName ? 'green' : 'white';
    // Update state with the new circle colors
    setCircleColors(newCircleColors);
  
    const postData = {
      acceptAgent: savedUserName,
      bookingColor: 'green'
    };
  
    // First Axios POST request to '${urlbc}/succus-form'
    axios.post(`${urlbc}/succes-form`, data)
      .then((responseSubmitForm) => {
        console.log('Email sent:', responseSubmitForm.data);
  
        // Second Axios POST request to '${urlbc}/saveIssue/${index}'
        axios.post(`${urlbc}/saveIssue/${index}`, postData)
          .then((response) => {
            console.log("Cancel data saved:", response.data);
            // Update the data object with the saved username
            data.acceptAgent = savedUserName;
  
            console.log("Received index:", globalIndex); // Before the findOneAndUpdate
  
            // Update localStorage with the new circle colors
            localStorage.setItem("SAVED_COLORS", JSON.stringify(newCircleColors));
  
            // Perform any necessary state or logic updates upon successful save
            // ...
  
          })
          .catch((error) => {
            console.error("Error saving cancel data: ", error);
          });
      })
      .catch((error) => {
        console.error("Error sending email: ", error);
      });
  };
  
  useEffect(() => {
    // Fetch booking data from the server
    axios.get('${urlbc}/bookings')
      .then(response => {
        // Filter the data to show only bookings with the "yellow" color
        const yellowBookings = response.data.filter(booking => booking.bookingColor === 'yellow');
        
        // Update state with fetched yellow bookings data
        setBookingData(yellowBookings);
  
        // Set colors based only on fetched yellow bookings data
        const colors = {};
        yellowBookings.forEach((booking, index) => {
          colors[index] = 'yellow'; // Set color to yellow for yellow bookings
        });
        setCircleColors(colors);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  useEffect(() => {
    // Set the initial button text based on whether userName is empty or not
    if (userName !== "") {
      setButtonText("Release");
    } else {
      setButtonText("Accept");
    }

    // Define the API endpoint URL
    const apiUrl = "${urlbc}/bookings/pending";

    // Fetch data from the API using Axios in the useEffect hook
    axios
      .get(apiUrl)
      .then((response) => setBookingData(response.data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, [userName]);

  console.log("BookingData check", bookingData);

  // Function to handle textarea content changes
  const handleTextareaChange = (index, content) => {
    setTextareaContent({
      ...textareaContent,
      [index]: content,
    });
  };

  const saveTextareaContent = (index) => {
    const nameComment = localStorage.getItem("USER_NAME");
    const contentToSave = `Name: ${nameComment} - ${textareaContent[index]}`;

    // Create an object to send to the server with the concatenated content
    const dataToSave = {
      comments: contentToSave,
    };

    // Send a POST request to save the content
    axios
      .post(`${urlbc}/saveComment/${index}`, dataToSave)
      .then((response) => {
        // Handle the response from the server
        console.log("Data saved:", response.data);
      })
      .catch((error) => {
        // Handle errors
        console.error("Error saving data: ", error);
      });
  };


  

  const navigate = useNavigate();
  const handleDataSelection= (index) => {
    // setBookingData(index)
    // console.log("User-Selected Booking:", details);
      navigate("/bookingdetails", { state: { details: bookingData[index]}});
  }


  // on click manage toggle code below
  // Function to toggle the visibility of a row
  const toggleRowVisibility = (index) => {
    setRowVisibility((prevVisibility) => ({
      ...prevVisibility,
      [index]: !prevVisibility[index],
    }));
  };
  // Function to check if a row should be visible
  const isRowVisible = (index) => {
    return rowVisibility[index] || false;
  };

  //// below code of formateDate of Depart/Arrival
  function formatDateTime(dateTimeStr) {
    if (!dateTimeStr) {
      return "N/A";
    }

    const options = {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };

    const formattedDateTime = new Date(dateTimeStr).toLocaleString(
      "en-US",
      options
    );

    return formattedDateTime;
  }

  const filterBookings = (booking) => {
    const filterPnr = pnr ? pnr.trim().toLowerCase() : '';
  const filterAgentName = agentName ? agentName.trim().toLowerCase() : '';
  const filterLastName = lastName ? lastName.trim().toLowerCase() : '';
  const filterEmail = email ? email.trim().toLowerCase() : '';
  const filterPhone = phone ? phone.trim() : '';
  
    const bookingPnr = (booking.randomNumber || '').toString().toLowerCase();
    const bookingAgentName = (booking.acceptAgent || '').toString().toLowerCase();

    // const bookingLastName = ((booking.creditCardData || {}).firstName || '').toString().toLowerCase();
    const bookingLastName = (
      ((booking.userInformation?.ADULT_0 || {}).firstName || '') +
      ' ' +
      ((booking.userInformation?.ADULT_0 || {}).lastName || '') +

      ((booking.creditCardData || {}).firstName || '') +
  ' ' +
  ((booking.creditCardData || {}).lastName || '')

    ).toString().toLowerCase();

    

    const bookingEmail = ((booking.emaiAndId || {}).email || '').toString().toLowerCase();
    const bookingPhone = ((booking.emaiAndId || {}).phone || '').toString();
  
    const pnrMatches = !filterPnr || bookingPnr.includes(filterPnr);
    const agentNameMatches = !filterAgentName || bookingAgentName.includes(filterAgentName);
    const lastNameMatches = !filterLastName || bookingLastName.includes(filterLastName);
    const emailMatches = !filterEmail || bookingEmail.includes(filterEmail);
    const phoneMatches = !filterPhone || bookingPhone.includes(filterPhone);
  
    return pnrMatches && agentNameMatches && lastNameMatches && emailMatches && phoneMatches;
  };


  const handleButtonClick = () => {
    navigate("/customer-receipt", { state: { result: data}});
  };



  return (
    <>
      <div className="container-fluid position-relative d-flex p-0">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div className={`content ${isSidebarOpen ? "open" : ""}`}>
          <TopNavbar toggleSidebar={toggleSidebar} />
          <div className="container-fluid pt-4 px-4">
            <div className="row g-4">
              <div className="col-12">
                <div className="bg-secondary rounded h-100 p-4">
                  <h6 className="mb-4">Booking</h6>
                  <div>
                    <div className="row">
                      <div className="col-md-12">
                        <input
                          type="text"
                          placeholder="PNR"
                          value={pnr}
                          onChange={(e) => setPnrFilter(e.target.value)}
                        />
                        <input
                          type="text"
                          placeholder="Agent Name"
                          value={agentName}
                          onChange={(e) => setAgentName(e.target.value)}
                        />
                        <input
                          type="text"
                          placeholder="Name / Card Holder"
                          value={lastName}//// it is searchng firstname, lastname and even card name
                          onChange={(e) => setLastName(e.target.value)}
                        />
                        <input
                          type="text"
                          placeholder="Email Id"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                          type="text"
                          placeholder="Phone No"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="table-responsive">
                    
                  <table className="table table-bordered my-hm-table">
                    <thead>
                      <tr>
                        <th scope="col">Product</th>
                        <th scope="col">PNR/Cont#</th>
                        <th scope="col">Depart/Arrival</th>
                        <th scope="col">Customer Info</th>
                        <th scope="col">Booking Date</th>
                        <th scope="col">Customer Details</th>
                        <th scope="col">Total</th>
                        <th scope="col">Request Seat/Charge</th>
                        <th scope="col">Comments</th>
                      </tr>
                    </thead>

                    <tbody>
                      {bookingData 
                      .filter(filterBookings)  // Ap
                        .slice(
                          (currentPage - 1) * resultsPerPage,
                          currentPage * resultsPerPage
                        )
                        .map((data, index,) => {
                          const originalIndex = bookingData.indexOf(data);
                          // const globalIndex =
                          //   (currentPage - 1) * resultsPerPage + index;
                            // const globalIndex = bookingData.indexOf(data) + (currentPage - 1) * resultsPerPage;
                            // const globalIndex = originalIndex + (currentPage - 1) * resultsPerPage;

    const globalIndex = originalIndex + (currentPage - 1) * resultsPerPage;




                          return (
                            <React.Fragment key={globalIndex}>
                              <tr>
                                <td>
                                  {data?.flightData?.data?.[0]?.itineraries?.[0]
                                    ?.segments?.[0]?.departure?.iataCode ?? "N/A"}
                                  :
                                  {data?.flightData?.data?.[0]?.itineraries?.[1]
                                    ?.segments?.[0]?.departure?.iataCode ??
                                    "N/A"}
                                  <br />
                                  <button
                                    className=" btn-success mt-1"
                                    onClick={() => toggleRowVisibility(globalIndex)}
                                  >
                                    Manage
                                  </button>
                                </td>
                                <td>{data?.randomNumber}
                                <br/>
                                <div
                    className="hm-circle circle"
                    style={{
                      backgroundColor: circleColors[globalIndex] || 'white',
                    }}
                  ></div>
                                </td>
                                <td>
                                  {formatDateTime(
                                    data?.flightData?.data?.[0]
                                      ?.itineraries?.[0]?.segments?.[0]?.arrival
                                      ?.at
                                  ) ?? "N/A"}
                                  &nbsp; &#x2194;{" "}
                                  {formatDateTime(
                                    data?.flightData?.data?.[0]
                                      ?.itineraries?.[0]?.segments?.[0]
                                      ?.departure?.at
                                  ) ?? "N/A"}
                                  <br />
                                  <p className="text-success">
                                    {data?.acceptAgent}
                                  </p>
                                </td>
                                <td>
                                  {data?.deviceInfo?.browser}&nbsp; &#x2194;{" "}
                                  {data?.deviceInfo?.deviceType}&nbsp; &#x2194;{" "}
                                  {data?.deviceInfo?.ipAddress}
                                </td>
                                <td>
                                  {data?.deviceInfo?.currentDate
                                    ? new Date(
                                        data.deviceInfo.currentDate
                                      ).toLocaleString("en-US", {
                                        day: "2-digit",
                                        month: "short",
                                        year: "numeric",
                                      })
                                    : "N/A"}
                                </td>

                                <td style={{}}>
                                 {data?.userInformation?.ADULT_0.firstName
                                    ? data.userInformation?.ADULT_0.firstName
                                        .split(" ")
                                        .map(
                                          (word) =>
                                            word.charAt(0).toUpperCase() +
                                            word.slice(1)
                                        )
                                        .join(" ")+ " "
                                    : ""}
                                    {data?.userInformation?.ADULT_0.middleName
                                    ? data.userInformation?.ADULT_0.middleName
                                        .split(" ")
                                        .map(
                                          (word) =>
                                            word.charAt(0).toUpperCase() +
                                            word.slice(1)
                                        )
                                        .join(" ")  + " "
                                    : ""}
                                    {data?.userInformation?.ADULT_0.lastName
                                    ? data.userInformation?.ADULT_0.lastName
                                        .split(" ")
                                        .map(
                                          (word) =>
                                            word.charAt(0).toUpperCase() +
                                            word.slice(1)
                                        )
                                        .join(" ")
                                    : ""}

                                   <br />
                                      {data?.emaiAndId?.email}<br />
                                      {data?.emaiAndId?.phone} <br/>
                                      {data?.creditCardData?.firstName
                                    ? data.creditCardData.firstName
                                        .split(" ")
                                        .map(
                                          (word) =>
                                            word.charAt(0).toUpperCase() +
                                            word.slice(1)
                                        )
                                        .join(" ")+ " "
                                    : ""} 
                                    {data?.creditCardData?.lastName
                                    ? data.creditCardData.lastName
                                        .split(" ")
                                        .map(
                                          (word) =>
                                            word.charAt(0).toUpperCase() +
                                            word.slice(1)
                                        )
                                        .join(" ")
                                    : ""} (CH)
                                </td>
                                <td>
                                  {data?.fareDetails?.totalAmount} &nbsp;
                                  &#x2194; Cabin:{" "}
                                  {data?.fareDetails?.cabin ? "true" : "false"}
                                </td>
                                <td>
                                  Main Cabin &nbsp; &#x2194;{" "}
                                  {data?.fareDetails?.cabinAmount}
                                </td>
                                <td>
                                  <textarea
                                    rows={2}
                                    placeholder="Comment"
                                    onChange={(e) =>
                                      handleTextareaChange(
                                        data?._id,
                                        e.target.value
                                      )
                                    }
                                  ></textarea>
                                  <button
                                    className="btn btn-light rounded-pill m-1"
                                    onClick={() =>
                                      saveTextareaContent(data?._id)
                                    }
                                  >
                                    Save
                                  </button>
                                </td>
                              </tr>
                              {isRowVisible(globalIndex) && (
                                <tr key={`${globalIndex}-ul`}>
                                  <td className="full-width-ul" colSpan="12">
                                    <div className="hm-details">
                                    {/* <button
      className={`btn ${
        userName ? 'btn-white' : 'btn-yellow'
      } btn btn-outline-success m-1`} // Use conditional class based on userName
      onClick={() => handleAcceptClick(data, data?._id, index, globalIndex)}
    >
      {buttonText}
    </button> */}

<button
      className={`btn ${acceptButtonColor === 'yellow' ? 'btn-yellow' : 'btn-white'} btn btn-outline-success m-1`}
      onClick={() => handleAcceptClick(data, data?._id, index, globalIndex)}
    >
      {buttonText}
    </button>

                                      <button
                                        key={globalIndex}
                                        onClick={() =>
                                          handleDataSelection(originalIndex)
                                        }
                                        className="btn btn-outline-info m-1"
                                      >
                                        Details 
                                      </button>
                                      <button className="btn btn-outline-light m-1" onClick={handleButtonClick}>
                                        Customer Receipt
                                      </button>
                                      {/* <Link to="/customer-receipt" className="btn btn-outline-light m-1">
                                        Customer Receipt
                                      </Link> */}
                                      <button className="btn btn-outline-danger m-1" onClick={() => handleCancelClick(data, data?._id, index, globalIndex)}>
                                      Cancel
                                    </button>

                                    <button className="btn btn-outline-warning m-1" onClick={() => handleIssuedClick(data, data?._id, index, globalIndex)}>
                                      Issued
                                    </button>

                                    </div>
                                  </td>
                                </tr>
                              )}
                            </React.Fragment>
                          );
                        })}
                    </tbody>
                  </table>

                    <div className="">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    </div>
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

export default Pending;
