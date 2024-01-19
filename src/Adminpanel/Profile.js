import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { urlbc } from "../components/Constants";


const Profile = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [data, setData] = useState({});

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [role, setRole] = useState("agent");

  const navigate = useNavigate();
  // const [items, setItems] = useState([]);
  const token = localStorage.getItem("TOKEN");


  useEffect(() => {
    // Check the role on page load
    const userRole = localStorage.getItem('ROLE');
    setRole(userRole);

    if (userRole !== 'superadmin') {
      navigate('/signin'); // Redirect to signin if not superadmin
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${urlbc}/users`); // Replace with your backend's URL
        console.log('check', response.data); // Logging the fetched data to the console
        const result = response.data;

        // Filter data to get only superadmin users
        const superadminData = result.filter(user => user.role === 'superadmin');
        setData(superadminData[0]); // Set data for editing
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData(); // Call the fetchData function
  }, []);


  return (
    <>
      <div className="container-fluid position-relative d-flex p-0">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className={`content ${isSidebarOpen ? 'open' : ''}`}>
        <TopNavbar toggleSidebar={toggleSidebar} />
          <div className="container-fluid pt-4 px-4">
            <div className="row">
            <div className="col-12 col-sm-12">
                <div className="bg-secondary rounded h-100 p-4">
                  <h6 className="mb-4">My Profile</h6>
                  <div className="table-responsive">
                    <table className="table table-bordered my-hm-table">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Email Id</th>
                          <th scope="col">Password</th>
                          <th scope="col">Role</th>
                          <th scope="col">Update</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                          {data.name ? data.name.charAt(0).toUpperCase() + data.name.slice(1) : "User"}                          </td>
                          <td>
                          {data.email ? data.email: "User"}
                          </td>
                          <td>
                          ************
                          </td>
                          <td>
                          {data.role ? data.role.charAt(0).toUpperCase() + data.role.slice(1) : "User"}
                         </td>

                          <td>
                            <a href="/profileedit" className="btn btn-info">Edit</a>
                          </td>
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

export default Profile;
