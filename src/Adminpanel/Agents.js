import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { urlbc } from "../components/Constants";
const Agents = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [data, setData] = useState({});

  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const [role, setRole] = useState("agent");

  const navigate = useNavigate();
  // const [items, setItems] = useState([]);
  const token = localStorage.getItem("TOKEN");

  useEffect(() => {
    // Check the role on page load
    const userRole = localStorage.getItem("ROLE");
    setRole(userRole);

    if (userRole !== "superadmin") {
      navigate("/signin"); // Redirect to signin if not superadmin
    }
  }, [navigate]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${urlbc}/agents?page=${currentPage}&search=${searchQuery}`);
        console.log("check", response.data);
        const result = response.data;
        
        setData(result.users || []); // Update to handle users data
        setTotalPages(result.totalPages || 1); // Make sure to have a default value for totalPages
        console.log("result check", result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [currentPage, searchQuery]);
  
  
  const handleSearch = (e) => {
    setSearchQuery(e.target.value); // Update search query on input change
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

 
  useEffect(() => {
    document.title = 'Agents Page'; // Set your dynamic title here
  }, []);

  const handleDelete = (userId) => {
    // Show confirmation alert before deleting
    Swal.fire({
      title: 'Are you sure?',
      text: 'Once deleted, you will not be able to recover this user!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`${urlbc}/agents/${userId}`)
          .then((response) => {
            if (response.status === 200) {
              Swal.fire('Deleted!', 'Your user has been deleted.', 'success');
              // Update the local state after successful deletion
              setData((prevData) => prevData.filter((item) => item._id !== userId));
            } else {
              throw new Error('Failed to delete user');
            }
          })
          .catch((error) => {
            console.error('Error deleting user:', error);
            Swal.fire('Error', 'Failed to delete user', 'error');
          });
      }
    });
  };
  

  const editagent= (id) => {
    // setBookingData(index)
    // console.log("User-Selected Booking:", details);
      // navigate("/agentedit", { state: { id: index}});
      navigate("/agentedit", { state: { id } });

  }

  // console.log('currepage hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh', totalPages)
  
 
  return (
    <>
      <div className="container-fluid position-relative d-flex p-0">
        <Sidebar isSidebarOpen={isSidebarOpen} />
        <div className={`content ${isSidebarOpen ? "open" : ""}`}>
          <TopNavbar toggleSidebar={toggleSidebar} />
          <div className="container-fluid pt-3 px-3">
            <div className="row">
              <div className="col-12 col-sm-12">
                <div className="bg-secondary rounded h-100 p-4">
                  <h6 className="mb-4">My Profile</h6>

                  <div className="row mb-3">
                    <div className="col-md-4">
                    <form className="">
          <input
            className="form-control border"
            type="search"
            placeholder="Search"
            value={searchQuery}
            onChange={handleSearch}
          />
        </form>
                    </div>
                  </div>

                  <div className="table-responsive">
                    <table className="table table-bordered my-hm-table">
                      <thead>
                        <tr>
                          <th scope="col">Name</th>
                          <th scope="col">Email Id</th>
                          <th scope="col">Password</th>
                          <th scope="col">Role</th>
                          <th scope="col">Action</th>
                        </tr>
                      </thead>

                      <tbody>
  {Array.isArray(data) && data.length > 0 ? (
    data.map((item, index) => (
      // Conditionally render based on the user's role
      (role === "superadmin" && item.role === "superadmin") ? null : (
        <tr key={index}>
          <td>
            {item.name
              ? item.name.charAt(0).toUpperCase() + item.name.slice(1)
              : "User"}
          </td>
          <td>{item.email ? item.email : "User"}</td>
          <td>************</td>
          <td>
            {item.role
              ? item.role.charAt(0).toUpperCase() + item.role.slice(1)
              : "User"}
          </td>
          <td>
            {/* <Link to={`/agentedit/${item._id}`} className="btn btn-info">
              Edit
            </Link> */}
            <button onClick={() => editagent(item._id)}  className="btn btn-info">
Edit
</button>
            &nbsp;
            <Link
      to="#"
      className="btn btn-danger"
      onClick={() => handleDelete(item._id)}
    >
      Delete
    </Link>
          </td>
        </tr>
      )
    ))
  ) : (
    <tr>
      <td colSpan="5">No data available</td>
    </tr>
  )}
</tbody>

                    </table>
                    <div className="col-md-12 text-center mt-4">
                    <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
<span>Page {currentPage} of {totalPages}</span>
<button onClick={handleNextPage}>Next</button>

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

export default Agents;
