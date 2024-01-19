
// agent page code
import { useNavigate } from "react-router-dom";
const editagent= (index) => {
  // setBookingData(index)
  // console.log("User-Selected Booking:", details);
    navigate("/agentedit", { state: { id: index}});
}
<button onClick={() => editagent(item._id)}  className="btn btn-info">
Edit
</button>

// <Route
// path="agentedit/"
// element={
//     <AgentEdit />
// }

// />
// agent edit code
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import axios from "axios";
import Swal from 'sweetalert2';
// import { useParams } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { agents } from "../../../../backend/controller/user";
const AgentEdit = () => {

  // const { id } = useParams(); // Fetch the ID from the URL params
    // console.log("Agent hhhhhh ID my from URL params:", id);
    const location = useLocation();
    const id = location.state.id;;

    console.log('id check dddddddddd', id);  // Print the extracted id for debugging

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
      navigate("/404");
    }
  }, [navigate]);


  useEffect(() => {
    const fetchAgentData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/agents/${location.state.id}`);
        const result = response.data;
        setData(result);
        setOriginalData(result); // Save the original data for comparison
      } catch (error) {
        console.error("Error fetching agent data:", error);
      }
    };

    fetchAgentData();
  }, [location.state.id]);


  console.log('data checkkkkkkkkkkkkkkkkkk', data)

  // const handleInputChange = (e) => {
  //   const { id, value } = e.target;
  //   setData(prevData => ({ ...prevData, [id]: value }));
  // };

  const handleInputChange = (e) => {
    const { id, value } = e.target;
  
    // Special handling for the role input
    if (id === "role") {
      // Directly set the role value
      setRole(value);
  
      // Update the data object as before, if needed
      setData((prevData) => ({ ...prevData, [id]: value }));
    } else {
      // For other inputs, update the state as before
      setData((prevData) => ({ ...prevData, [id]: value }));
    }
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
      console.log('modifiedFields:', modifiedFields);

      const response = await axios.put(`http://localhost:5000/agents/${location.state.id}`, modifiedFields);
      // const updatedUserData = response.data;
  
      console.log('check id responese data dddddddddddddddddddddddddd', response)
     
  
      // console.log('Data updated:', updatedUserData);
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
                          <select
  className="form-select"
  id="role"
  value={data.role || ""}
  onChange={handleInputChange}
>
  <option value="" disabled>Select Role</option>
  <option value="agent">Agent</option>
  <option value="supervisor">Supervisor</option>
</select>

                        </div>
                      </div>
                      <button type="submit" className="btn btn-primary">
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

export default AgentEdit;






// below code of when i click sidebar icon
const location = useLocation();
const [id, setId] = useState(location.state?.id || null);


const toggleSidebar = () => {
  setIsSidebarOpen(!isSidebarOpen);

  // Update id when sidebar is clicked
  if (!isSidebarOpen) {
    setId(location.state?.id || null);
  }
};



useEffect(() => {
  const fetchAgentData = async () => {
    try {
      if (id) {
        const response = await axios.get(`http://localhost:5000/agents/${id}`);
        const result = response.data;
        setData(result);
      }
    } catch (error) {
      console.error("Error fetching agent data:", error);
    }
  };

  fetchAgentData();
}, [id, location.state]);












