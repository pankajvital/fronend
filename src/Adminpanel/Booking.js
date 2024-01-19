import React, { useEffect, useState } from "react";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import axios from "axios";
import Pagination from "./Pagination";
import { Link, useNavigate } from "react-router-dom";
// import ExcelUpload from "./ExcelUpload";
import Swal from 'sweetalert2';
import { urlbc } from "../components/Constants";
const Table = () => {
const role = localStorage.getItem("ROLE");
  const [userNamerole, setUserNamerole] = useState(""); // Assuming you have userName state
  const [buttonClickedIndex, setButtonClickedIndex] = useState(null);//// for role none and 



  const [bookingData, setBookingData] = useState([]);
  const [rowVisibility, setRowVisibility] = useState({});
  const [textareaContent, setTextareaContent] = useState({});

  //// below pagination code
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 7; // Number of results to display per page


  const [circleColors, setCircleColors] = useState({});
  const [colorText, setColorText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false); // State to manage processing state
  const [bookingColor, setBookingColor] = useState('');


  const [pnr, setPnrFilter] = useState("");
  const [agentName, setAgentName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [status, setStatus] = useState('');

  

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






// useEffect(() => {
//   const refreshPage = () => {
//     window.location.reload();
//   };

//   // Set a timeout to refresh the page after 10 minutes (600,000 milliseconds)
//   const timeoutId = setTimeout(refreshPage, 300);

//   // Clear the timeout when the component unmounts to prevent memory leaks
//   return () => clearTimeout(timeoutId);
// }, []);



  // useEffect(() => {
  //   // Retrieve the stored colorText from local storage
  //   const storedColorText = JSON.parse(localStorage.getItem('colorText')) || {};
  
  //   // Fetch booking data from the server
  //   axios.get('${urlbc}/bookings')
  //     .then(response => {
  //       // Update state with fetched data
  //       setBookingData(response.data);
  
  //       // Set colors and texts based on fetched data
  //       const colors = {};
  //       let hasPending = false;
  
  //       response.data.forEach((booking, index) => {
  //         colors[index] = booking.bookingColor || '#dddddd'; // Default color if bookingColor is not defined
  
  //         if (storedColorText[index]) {
  //           // If there is a stored colorText, use it
  //           setColorText(prevColorText => ({
  //             ...prevColorText,
  //             [index]: storedColorText[index],
  //           }));
  //         } else if (colors[index] === 'yellow') {
  //           setColorText(prevColorText => ({
  //             ...prevColorText,
  //             [index]: 'Pending',
  //           }));
  //           hasPending = true;
  //         } else if (colors[index] === 'red') {
  //           setColorText(prevColorText => ({
  //             ...prevColorText,
  //             [index]: 'Cancelled',
  //           }));
  //         } else if (colors[index] === '#06a606ad') {
  //           setColorText(prevColorText => ({
  //             ...prevColorText,
  //             [index]: 'Issued',
  //           }));
  //         }
  //          else {
  //           setColorText(prevColorText => ({
  //             ...prevColorText,
  //             [index]: 'New',
  //           }));
  //         }
  //       });
  
  //       setCircleColors(colors);
  //     })
  //     .catch(error => {
  //       console.error('Error fetching data:', error);
  //     });
  // }, [circleColors, colorText]);
  

  useEffect(() => {
    // Function to fetch data and update state
    const fetchDataAndUpdateState = async () => {
      try {
        // Retrieve the stored colorText from local storage
        const storedColorText = JSON.parse(localStorage.getItem('colorText')) || {};
  
        // Fetch booking data from the server
        const response = await axios.get(`${urlbc}/bookings`);
  
        // Update state with fetched data
        setBookingData(response.data);
  
        // Set colors and texts based on fetched data
        const colors = {};
        let hasPending = false;
  
        response.data.forEach((booking, index) => {
          colors[index] = booking.bookingColor || '#dddddd'; // Default color if bookingColor is not defined
  
          if (storedColorText[index]) {
            // If there is a stored colorText, use it
            setColorText((prevColorText) => ({
              ...prevColorText,
              [index]: storedColorText[index],
            }));
          } else if (colors[index] === 'yellow') {
            setColorText((prevColorText) => ({
              ...prevColorText,
              [index]: 'Pending',
            }));
            hasPending = true;
          } else if (colors[index] === 'red') {
            setColorText((prevColorText) => ({
              ...prevColorText,
              [index]: 'Cancelled',
            }));
          } else if (colors[index] === '#06a606ad') {
            setColorText((prevColorText) => ({
              ...prevColorText,
              [index]: 'Issued',
            }));
          } else {
            setColorText((prevColorText) => ({
              ...prevColorText,
              [index]: 'New',
            }));
          }
        });
  
        setCircleColors(colors);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
  
    // Call the function once with an empty dependency array
    fetchDataAndUpdateState();
  }, []);
  
  
  useEffect(() => {
    // Set the initial button text based on whether userName is empty or not
    if (userName !== "") {
      setButtonText("Release");
    } else {
      setButtonText("Accept");
    }

    // Define the API endpoint URL
    const apiUrl = `${urlbc}/bookings`;

    // Fetch data from the API using Axios in the useEffect hook
    axios
      .get(apiUrl)
      .then((response) => setBookingData(response.data))
      .catch((error) => console.error("Error fetching data: ", error));
  }, [userName]);

  console.log("BookingData check", bookingData);








  //// Define a function to handle page changes
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const acceptButtonColor = userName ? 'yellow' : '#dddddd';

  // const handleAcceptClick = (data) => {
  //   const savedUserName = localStorage.getItem("USER_NAME") || "";
  //   const savedUserNamerole = localStorage.getItem("USER_NAME") || "";
  //   const globalIndex = data?._id;

  //   console.log('id check ddddddddddddddddd kkkk',globalIndex)
  
  //   if (userName === "") {
  //     setUserName(savedUserName);
  //     setUserNamerole(savedUserNamerole);
  //     setButtonText("Release");
  //     setButtonClicked(true);
  //     setButtonClickedIndex(globalIndex);
    
  //     setCircleColors((prevColors) => ({
  //       ...prevColors,
  //       [globalIndex]: savedUserName ? 'yellow' : '#dddddd',
  //     }));
    
  //     setColorText((prevColorText) => ({
  //       ...prevColorText,
  //       [globalIndex]: 'Pending',
  //     }));
    
  //     const postData = {
  //       acceptAgent: savedUserName,
  //       bookingColor: 'yellow',
  //     };
    
  //     axios.post(`${urlbc}/saveAccept/${data?._id}`, postData)
  //       .then((response) => {
  //         console.log("Data saved:", response.data);
  //         setBookingColor(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error saving data: ", error);
  //       });
  //   } else {
  //     setUserName("");
  //     setButtonText("Accept");
  //     setButtonClicked(true);
  //     setButtonClickedIndex(globalIndex);
    
  //     setCircleColors((prevColors) => ({
  //       ...prevColors,
  //       [globalIndex]: '#dddddd',
  //     }));
    
  //     setColorText((prevColorText) => ({
  //       ...prevColorText,
  //       [globalIndex]: 'New',
  //     }));
    
  //     const postData = {
  //       acceptAgent: "",
  //       bookingColor: "#dddddd",
  //     };
    
  //     axios.post(`${urlbc}/saveAccept/${data?._id}`, postData)
  //       .then((response) => {
  //         console.log("Data saved:", response.data);
  //         setBookingColor(response.data);
  //       })
  //       .catch((error) => {
  //         console.error("Error saving data: ", error);
  //       });
  //   }
  // };
  
  // ... rest of your code remains unchanged
  

//   const handleAcceptClick = (data) => {
//     const savedUserName = localStorage.getItem("USER_NAME") || "";
//     const savedUserNamerole = localStorage.getItem("USER_NAME") || "";

//     console.log('id check ddderfrertrewrdddddd', data?._id);
// const globalIndex = data?._id;
  
//     if (userName === "") {
//       setUserName(savedUserName);
//       setUserNamerole(savedUserNamerole);
//       setButtonText("Release");
//       setButtonClicked(true);
//       setButtonClickedIndex(globalIndex);

 
  
//       setCircleColors((prevColors) => ({
//         ...prevColors,
//         [globalIndex]: savedUserName ? 'yellow' : '#dddddd',
//       }));

//       setColorText((prevColorText) => ({
//         ...prevColorText,
//         [globalIndex]: 'Pending',
//       }));
//       const postData = {
//         acceptAgent: savedUserName,
//         bookingColor:'yellow'
//       };


  
//       axios
//       .post(`${urlbc}/saveAccept/${data?._id}`, postData)
//       .then((response) => {
//         console.log("Data saved:", response.data);
//         data.acceptAgent = savedUserName;
//         data.bookingColor = 'yellow';
//         setBookingColor(response.data);
//       })
//         .catch((error) => {
//           console.error("Error saving data: ", error);
//         });
//     } else {
//       setUserName("");
//       // savedUserNamerole("");
//       setButtonText("Accept");
//       setButtonClicked(true);
//       setButtonClickedIndex(globalIndex);

  
//       setCircleColors((prevColors) => ({
//         ...prevColors,
//         [globalIndex]: '#dddddd',
//       }));
//       setColorText((prevColorText) => ({
//         ...prevColorText,
//         [globalIndex]: 'New',
//       }));
//       const postData = {
//         acceptAgent: "",
//         bookingColor: "#dddddd"
//       };
  
//       axios
//       .post(`${urlbc}/saveAccept/${data?._id}`, postData)
//       .then((response) => {
//         console.log("Data saved:", response.data);
//         data.acceptAgent = "";
//       })
//         .catch((error) => {
//           console.error("Error saving data: ", error);
//         });
//     }
//   };
   

const handleAcceptClick = (data, index, globalIndex) => {
  const savedUserName = localStorage.getItem("USER_NAME") || "";
  const savedUserNamerole = localStorage.getItem("USER_NAME") || "";

  if (userName === "") {
    setUserName(savedUserName);
    setUserNamerole(savedUserNamerole);
    setButtonText("Release");
    setButtonClicked(true);
    setButtonClickedIndex(globalIndex);

    setCircleColors((prevColors) => ({
      ...prevColors,
      [globalIndex]: savedUserName ? 'yellow' : '#dddddd',
    }));

    setColorText((prevColorText) => ({
      ...prevColorText,
      [globalIndex]: 'Pending',
    }));

    const postData = {
      acceptAgent: savedUserName,
      bookingColor: 'yellow',
    };

    axios.post(`${urlbc}/saveAccept/${index}`, postData)
      .then((response) => {
        console.log("Data saved:", response.data);
        data.acceptAgent = savedUserName;
        data.bookingColor = 'yellow';
        setBookingColor(response.data);
      })
      .catch((error) => {
        console.error("Error saving data: ", error);
      });
  } else {
    setUserName("");
    setButtonText("Accept");
    setButtonClicked(true);
    setButtonClickedIndex(globalIndex);

    setCircleColors((prevColors) => ({
      ...prevColors,
      [globalIndex]: '#dddddd',
    }));

    setColorText((prevColorText) => ({
      ...prevColorText,
      [globalIndex]: 'New',
    }));

    const postData = {
      acceptAgent: "",
      bookingColor: "#dddddd",
    };

    axios.post(`${urlbc}/saveAccept/${index}`, postData)
      .then((response) => {
        console.log("Data saved:", response.data);
        data.acceptAgent = "";
        data.bookingColor = '#dddddd';
        setBookingColor(response.data);
      })
      .catch((error) => {
        console.error("Error saving data: ", error);
      });
  }
};



  const handleCancelClick = (data, index, globalIndex) => {
    const savedUserName = localStorage.getItem("USER_NAME") || "";
  
    const newCircleColors = { ...circleColors };
    newCircleColors[globalIndex] = savedUserName ? 'red' : '#dddddd';
    setCircleColors(newCircleColors);

    setColorText((prevColorText) => ({
      ...prevColorText,
      [globalIndex]: 'Cancelled',
    }));
  
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
    newCircleColors[globalIndex] = savedUserName ? '#06a606ad' : '#dddddd';
    // Update state with the new circle colors
    setCircleColors(newCircleColors);
  
    setColorText((prevColorText) => ({
      ...prevColorText,
      [globalIndex]: 'Issued',
    }));

    const postData = {
      acceptAgent: savedUserName,
      bookingColor: '#06a606ad'
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
  
const handleDeleteClick = (globalIndex) => {
  // Show confirmation alert before deleting
  Swal.fire({
    title: 'Are you sure?',
    text: 'Once deleted, you will not be able to recover this data!',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      // Send a request to delete the data from MongoDB
      axios
        .delete(`${urlbc}/bookingsdelete/${globalIndex}`)
        .then((response) => {
          if (response.status === 200) {
            // Handle success, update UI, or perform any other necessary tasks
            console.log('Data deleted successfully');

            // Optionally, you can trigger a re-render or update state here

            // Show success alert
            Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
          } else {
            throw new Error('Failed to delete data');
          }
        })
        .catch((error) => {
          // Handle errors, show alerts, or perform any other error handling
          console.error('Error deleting data:', error);

          // Show error alert
          Swal.fire('Error', 'Failed to delete data', 'error');
        });
    }
  });
};







  // Function to handle textarea content changes
  const handleTextareaChange = (index, content) => {
    setTextareaContent((prevTextareaContent) => ({
      ...prevTextareaContent,
      [index]: content,
    }));
  };

   

    const saveTextareaContent = (index) => {
      const nameComment = localStorage.getItem("USER_NAME");
      const commentContent = textareaContent[index];
    
      // Check if the comment is empty or consists only of whitespace
      if (!commentContent || !commentContent.trim()) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: "You can't save an empty comment!",
        });
        return; // Do not proceed with saving if the comment is empty
      }
    
      const contentToSave = `By: ${nameComment} - ${commentContent}`;
    
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
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Comment saved successfully!',
          });
          setTextareaContent((prevTextareaContent) => ({
            ...prevTextareaContent,
            [index]: '', // Clear the textarea content after saving
          }));
        })
        .catch((error) => {
          // Handle errors
          console.error("Error saving data: ", error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'An error occurred while saving the comment. Please try again.',
          });
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

  // const filterBookings = (booking) => {
  //   const filterPnr = pnr ? pnr.trim().toLowerCase() : '';
  // const filterAgentName = agentName ? agentName.trim().toLowerCase() : '';
  // const filterLastName = lastName ? lastName.trim().toLowerCase() : '';
  // const filterEmail = email ? email.trim().toLowerCase() : '';
  // const filterPhone = phone ? phone.trim() : '';

  // const filterStartDate = startDate ? new Date(startDate) : null;
  // const filterEndDate = endDate ? new Date(endDate) : null;
  
  //   const bookingPnr = (booking.randomNumber || '').toString().toLowerCase();
  //   const bookingAgentName = (booking.acceptAgent || '').toString().toLowerCase();

  //   // const bookingLastName = ((booking.creditCardData || {}).firstName || '').toString().toLowerCase();
  //   const bookingLastName = (
  //     ((booking.userInformation?.ADULT_0 || {}).firstName || '') +
  //     ' ' +
  //     ((booking.userInformation?.ADULT_0 || {}).lastName || '') +

  //     ((booking.creditCardData || {}).firstName || '') +
  // ' ' +
  // ((booking.creditCardData || {}).lastName || '')

  //   ).toString().toLowerCase();

    

  //   const bookingEmail = ((booking.emaiAndId || {}).email || '').toString().toLowerCase();
  //   const bookingPhone = ((booking.emaiAndId || {}).phone || '').toString();
  
  //   const pnrMatches = !filterPnr || bookingPnr.includes(filterPnr);
  //   const agentNameMatches = !filterAgentName || bookingAgentName.includes(filterAgentName);
  //   const lastNameMatches = !filterLastName || bookingLastName.includes(filterLastName);
  //   const emailMatches = !filterEmail || bookingEmail.includes(filterEmail);
  //   const phoneMatches = !filterPhone || bookingPhone.includes(filterPhone);
  
  //   const bookingDate = new Date(/* Extract booking date from booking object */);

  //   const dateMatches =
  //   (!filterStartDate || bookingDate >= filterStartDate) &&
  //   (!filterEndDate || bookingDate <= filterEndDate);

  // // Rest of your existing matching logic...
  // // Make sure to include dateMatches in the return statement.

  //   return pnrMatches && agentNameMatches && lastNameMatches && emailMatches && phoneMatches && dateMatches;
  // };




   const filterBookings = (booking) => {
    const filterPnr = pnr ? pnr.trim().toLowerCase() : '';
  const filterAgentName = agentName ? agentName.trim().toLowerCase() : '';
  const filterLastName = lastName ? lastName.trim().toLowerCase() : '';
  const filterEmail = email ? email.trim().toLowerCase() : '';
  const filterPhone = phone ? phone.trim() : '';

  const filterStartDate = startDate ? new Date(startDate) : null;
  const filterEndDate = endDate ? new Date(endDate) : null;
  
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
  
    const bookingDate = new Date(/* Extract booking date from booking object */);

    const dateMatches =
    (!filterStartDate || bookingDate >= filterStartDate) &&
    (!filterEndDate || bookingDate <= filterEndDate);

  // Rest of your existing matching logic...
  // Make sure to include dateMatches in the return statement.

    return pnrMatches && agentNameMatches && lastNameMatches && emailMatches && phoneMatches && dateMatches;
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
          <div className="container-fluid pt-3 px-3">
            <div className="row g-4">
              <div className="col-12">
                <div className="bg-secondary rounded h-100 p-4">
                  <div>
                    <span>Total Result 15</span>
                    <div className="booking-fliler mb-3">
                      <div className="book-flider-input col">
                      <select
          className="form-select form-control"
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="">All</option>
          <option value="Pending">Pending</option>
          <option value="Cancelled">Cancelled</option>
          <option value="Issued">Issued</option>
        </select>
                        </div>
                      <div className="book-flider-input col">
                        <input
                          type="text"
                          placeholder="PNR"
                          className="form-control"
                          value={pnr}
                          onChange={(e) => setPnrFilter(e.target.value)}
                        />
                        </div>
                        <div className="book-flider-input col">
                        <input
                          type="text"
                          placeholder="Agent Name"
                          value={agentName}
                          className="form-control"
                          onChange={(e) => setAgentName(e.target.value)}
                        />
                        </div>
                        <div className="book-flider-input col">
                        <input
                          type="text"
                          placeholder="Name / Card Holder"
                          className="form-control"
                          value={lastName}//// it is searchng firstname, lastname and even card name
                          onChange={(e) => setLastName(e.target.value)}
                        />
                        </div>
                        <div className="book-flider-input col">
                        <input
                          type="text"
                          placeholder="Email Id"
                          value={email}
                          className="form-control"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                        </div>
                        <div className="book-flider-input col">
                        <input
                          type="text"
                          placeholder="Phone No"
                          value={phone}
                          className="form-control"
                          onChange={(e) => setPhone(e.target.value)}
                        />
                        </div>
                        <div className="book-flider-input col">
                        <input
                            type="date"
                            value={startDate}
                            className="form-control"
                            onChange={(e) => setStartDate(e.target.value)}
                          />
                          </div>
                           <div className="book-flider-input col">
                          <input
                            type="date"
                            value={endDate}
                            className="form-control"
                            onChange={(e) => setEndDate(e.target.value)}
                          />
                          </div> 

                    </div>
                  </div>
                  <div className="table-responsive">
                    
                  <table className="table table-bordered my-hm-table">
                    <thead className="mb-3 book-th">
                      <tr style={{fontSize:'15px'}}>
                        <th style={{textAlign:'center'}} scope="col">Airline</th>
                        <th scope="col">BookingRef#</th>
                        <th scope="col">Depart/Return</th>
                        <th scope="col">Customer Info</th>
                        <th scope="col">BookingDate</th>
                        <th scope="col">Customer Details</th>
                        <th scope="col">Total</th>
                        <th scope="col">Markup</th>
                        <th scope="col">MainCabin</th>
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
                         
                          const globalIndex = originalIndex + (currentPage - 1) * resultsPerPage;

                          // Function to get the count of adults and infants
                          function getCountOfAdultsAndInfants(data) {
                            // Get keys of the userInformation object
                            const userInformationKeys = Object.keys(data?.userInformation || {});

                            // Filter keys based on the pattern (e.g., "ADULT_" or "HELD_INFANT_")
                            const adultKeys = userInformationKeys.filter((key) => key.startsWith('ADULT_'));
                            const childKeys = userInformationKeys.filter((key) => key.startsWith('CHILD_'));
                            const infantKeys = userInformationKeys.filter((key) => key.startsWith('HELD_INFANT_'));

                            // Return an object with counts of adults and infants
                            return {
                              adults: adultKeys.length,
                              child: childKeys.length,
                              infants: infantKeys.length,
                            };
                          }

                          // Get the count of adults and infants
                          const { adults, child, infants } = getCountOfAdultsAndInfants(data);
                          const totalpax = adults + child + infants;


                          return (
                            <React.Fragment key={globalIndex}>
                              <tr style={{fontSize:'14px'}}>
                                <td style={{textAlign:'center'}}>
                                  
                                     {data?.flightData?.data?.[0]?.itineraries?.[0]
                                      ?.segments?.[0]?.carrierCode ?? ""}
                                  <br/>
                                  <button
                                    className=" btn-success manage-b"
                                    onClick={() => toggleRowVisibility(globalIndex)}
                                  >
                                    Manage
                                  </button> 
                                </td>
                                <td className="circle"
                                  style={{
                                    backgroundColor: circleColors[globalIndex] || '#dddddd',
                                  }}> <span style={{color:'#000',fontWeight:'500'}}>{data?.randomNumber}</span>
                                  <br/> <b>Status:</b>
                                  {colorText[globalIndex]} 
                             
                               <br/>
                                  <span className="trip-tb"><b> {data?.flightData.tripType.charAt(0).toUpperCase() + data?.flightData.tripType.slice(1)}</b> </span>
                  
                                </td>
                                <td>
                                  <b>{data?.flightData?.data?.[0]?.itineraries?.[0]
                                    ?.segments?.[0]?.departure?.iataCode ?? ""}&nbsp; →{" "}
                                  {data?.flightData?.data?.[0]?.itineraries?.[1]
                                    ?.segments?.[0]?.departure?.iataCode ??
                                    ""}</b>
                                 <br/>
                                 <span className="dep-book">DEP:</span>
                                  {formatDateTime(
                                    data?.flightData?.data?.[0]
                                      ?.itineraries?.[0]?.segments?.[0]?.arrival
                                      ?.at 
                                  ) ?? ""} <br/> <span className="dep-book"> RTN:</span>
                                  {formatDateTime(
                                    data?.flightData?.data?.[0]
                                      ?.itineraries?.[1]?.segments?.[0]
                                      ?.departure?.at
                                  ) ?? ""}
                                  <br />
                                 
                                  <span className="assign-to">
                                    <b>AssignedTo:</b> {data?.acceptAgent}
                                  </span>
                                  
                                </td>
                                <td>
                                  {data?.deviceInfo?.browser}&nbsp; <br/>
                                  {data?.deviceInfo?.deviceType}&nbsp; <br/>
                                  {data?.deviceInfo?.ipAddress}<br/>
                                  <b>Affiliate:</b> Source
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
                                    : ""} <br/>
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
                                      {/* {data?.emaiAndId?.email}<br /> */}
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
                                  ${data?.fareDetails?.totalAmount} &nbsp; <br/>
                                   {/* Pax: {totalUserInformationLength} */}
                                   Pax Adt: {adults} <br/>
                                   Pax Chd: {child} <br/>
                                   Pax Inf: {infants} <br/>
                                   Total Pax: {totalpax}
                                </td>
                                <td>$800 </td>
                                <td>
                                  ${data?.fareDetails?.cabinAmount} <br/>
                                  {/* {data?.fareDetails?.cabin ? "True" : "False"} */}
                                </td>
                                <td>
                                <textarea
                                  rows={2}
                                  placeholder="Comment"
                                  value={textareaContent[data?._id] || ''}
                                  onChange={(e) => handleTextareaChange(data?._id, e.target.value)}
                                ></textarea><br/>
                                <button
                                  className="btn-light rounded-pill m-1"
                                  onClick={() => saveTextareaContent(data?._id)}
                                >
                                  Save
                                </button>
                              </td>
                              </tr>
                              {isRowVisible(globalIndex) && (
                                <tr key={`${globalIndex}-ul`}>
                                  <td className="full-width-ul" colSpan="12">
                                    <div className="hm-details">
                                
                                    {role !== 'agent' || (role === 'agent' && globalIndex !== buttonClickedIndex) ? (

              <button
      className={`btn ${acceptButtonColor === 'yellow' ? 'btn-yellow' : 'btn-white'} btn btn-outline-success m-1`}
      onClick={() => handleAcceptClick(data, data?._id, index, globalIndex)}
    >
      {buttonText}
    </button>
            ) : null}
                                    
                                      <button
                                        key={globalIndex}
                                        onClick={() =>
                                          handleDataSelection(originalIndex)
                                        }
                                        className="btn btn-outline-info m-1"
                                      >
                                        Details 
                                      </button>
                                   
                                      <button className="btn btn-outline-light m-1" 
                                      // onClick={handleButtonClick}
                                      >
                                        Customer Receipt
                                      </button>
                                     
                                      <button className="btn btn-outline-danger m-1" onClick={() => handleCancelClick(data, data?._id, index, globalIndex)}>
                                      Cancel
                                    </button>

                                    <button className="btn btn-outline-warning m-1" onClick={() => handleIssuedClick(data, data?._id, index, globalIndex)}>
                                      Issued
                                    </button>

                                    {role === 'superadmin' && (
                                    <button className="btn btn-danger m-1" onClick={() => handleDeleteClick(data?._id)}>
                                      Delete
                                    </button>
                                    )}
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

export default Table;
