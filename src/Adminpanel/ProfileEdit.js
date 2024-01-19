import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import axios from "axios";
import Swal from 'sweetalert2';
import { urlbc } from "../components/Constants";

const ProfileEdit = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [role, setRole] = useState("agent");

  const [data, setData] = useState({});
  const [originalData, setOriginalData] = useState({});

  const [displayedPassword, setDisplayedPassword] = useState("");
  const [passwordUpdated, setPasswordUpdated] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("TOKEN");

  useEffect(() => {
    const userRole = localStorage.getItem("ROLE");
    setRole(userRole);

    if (userRole !== "superadmin") {
      navigate("/signin");
    }
  }, [navigate]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await axios.get("http://localhost:5000/users"); // Replace with your backend's URL
  //       console.log('check', response.data); // Logging the fetched data to the console
  //       const result = response.data;

  //       // Filter data to get only superadmin users
  //       const superadminData = result.filter(user => user.role === 'superadmin');
  //       setData(superadminData[0]); // Set data for editing
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchData(); // Call the fetchData function
  // }, []);

   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${urlbc}/users`); // Replace with your backend's URL
        const result = response.data;

        // Filter data to get only superadmin users
        const superadminData = result.filter(user => user.role === 'superadmin');
        setData(superadminData[0]); // Set data for editing
        setOriginalData(superadminData[0]); // Set original data
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Call the fetchData function
  }, []);


  console.log('check daddd', data)


  // const handleInputChange = (e) => {
  //   const { id, value } = e.target;
  //   setData(prevData => ({ ...prevData, [id]: value }));
  //   // setDisplayedPassword(value.substring(0, 10)); // Display only the first 10 characters
  // };
  // const truncatedPassword = data.password?.slice(0, 10) || ""; // Get the first 10 characters of the password if it exists

  //  const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     // Assuming data is properly updated before submitting the form
  //     await axios.put(`http://localhost:5000/users/${data._id}`, data); // Adjust the URL
  //     console.log('Data updated:', data);
  //     // Optionally, show success message or redirect to another page
  //   } catch (error) {
  //     console.error("Error updating data:", error);
  //     // Handle error, show error message, etc.
  //   }
  // };

  // const handleInputChange = (e) => {
  //   const { id, value } = e.target;
  
  //   if (id !== 'password') {
  //     setData(prevData => ({ ...prevData, [id]: value }));
  //   } else {
  //     const updatedPassword = value;
  //     setData(prevData => ({ ...prevData, [id]: updatedPassword }));
  //     setDisplayedPassword(updatedPassword);
  //     // setPasswordUpdated(updatedPassword !== data.password); // Set flag indicating password update
  //   }
  // };
  

  // const truncatedPassword = data.password || ""; 

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setData(prevData => ({ ...prevData, [id]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Create an object to hold only the modified fields
    const modifiedFields = {};
    let hasChanges = false;
  
    // Check each field against the data in the state
    Object.keys(data).forEach(key => {
      if (data[key] !== originalData[key]) {
        modifiedFields[key] = data[key];
        hasChanges = true;
      }
    });
  
    if (!hasChanges) {
      // No changes detected
      Swal.fire({
        icon: 'info',
        title: 'Info',
        text: 'No changes made!',
      });
      return;
    }
  
    try {
      // Send only the modified fields to update
      const response = await axios.put(`http://localhost:5000/users/${data._id}`, modifiedFields);
      const updatedUserData = response.data;
  
      // Update the name in local storage if the API call was successful
      // if (updatedUserData && updatedUserData.name) {
      //   localStorage.setItem("USER_NAME", updatedUserData.name);
      // }

      // Inside the try block after successful data update
      if (updatedUserData && updatedUserData.name && updatedUserData.role === 'superadmin') {
        localStorage.setItem("USER_NAME", updatedUserData.name);
      }
      
      setData(updatedUserData);


      console.log('Data updated:', updatedUserData);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Data has been successfully updated!',
      });
      // Optionally, show success message or redirect to another page
    } catch (error) {
      console.error("Error updating data:", error);
      if (error.response && error.response.status === 400) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Name or Email already exists for another user!',
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update user data!',
        });
      }
    }
  };
  

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      <div className="container-fluid position-relative d-flex p-0">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div className={`content ${isSidebarOpen ? "open" : ""}`}>
          <TopNavbar toggleSidebar={toggleSidebar} />
          <div className="container-fluid pt-4 px-4">
            <div className="row">
              <div className="col-12 col-md-12">
                <div className="bg-secondary rounded h-100 p-4">
                  <h6 className="mb-4">My ProfileEdit</h6>
                  <div className="">
                    <form onSubmit={handleSubmit}>
                      {/* {data} */}
                      <div className="row mb-3">
                        <div className="col-md-6">
                          <label
                            htmlFor="name"
                            className="col-sm-2 col-form-label"
                          >
                            Name
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="name"
                            value={data.name || ""}
              onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label
                            htmlFor="email"
                            className="col-sm-2 col-form-label"
                          >
                            Email
                          </label>
                          <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={data.email || ""}
              onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label
                            htmlFor="password"
                            className="col-sm-2 col-form-label"
                          >
                            Password
                          </label>
                          <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={data.password ? data.password.slice(0, 10) : ""}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-md-6">
                          <label
                            htmlFor="role"
                            className="col-sm-2 col-form-label"
                          >
                            Role
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="role"
                            value={data.role || ""}
                            readOnly
                          />
                        </div>
                      </div>
                      <button type="submit" className="btn btn-success">
                        Submit
                      </button>
                    </form>
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

export default ProfileEdit;
