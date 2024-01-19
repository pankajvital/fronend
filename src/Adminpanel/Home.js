import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TopNavbar from "./TopNavbar"
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { urlbc } from "../components/Constants";

const Home = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

const [data, setData] = useState([]);
const [totalYellowItems, setTotalYellowItems] = useState(0);
const [totalRedItems, setTotalRedItems] = useState(0);
const [totalGreenItems, setTotalGreenItems] = useState(0);
const [totalItemsCurrentDate, setTotalItemsCurrentDate] = useState(0);

const [totalYellowItemsCurrentDate, setTotalYellowItemsCurrentDate] = useState(0);
const [totalRedItemsCurrentDate, setTotalRedItemsCurrentDate] = useState(0);
const [totalGreenItemsCurrentDate, setTotalGreenItemsCurrentDate] = useState(0);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const navigate = useNavigate();
  // const [items, setItems] = useState([]);
  const token = localStorage.getItem("TOKEN");

  useEffect(() => {
    if (!token) {
      navigate("/404");
    }
  });

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:5000/bookings")
  //     .then((response) => {
  //       setData(response.data.length);
  //       const yellowItems = response.data.filter(item => item.bookingColor === 'yellow');
  //       setTotalYellowItems(yellowItems.length);

  //       const redItems = response.data.filter(item => item.bookingColor === 'red');
  //       setTotalRedItems(redItems.length);

  //       const greenItems = response.data.filter(item => item.bookingColor === 'red');
  //       setTotalGreenItems(greenItems.length);

  //       const currentDate = new Date().toLocaleDateString(); // Get current date

  //       const itemsCurrentDate = response.data.filter(item => {
  //         const formattedBookingDate = new Date(item.bookingCurrentDate).toLocaleDateString();
  //         return formattedBookingDate === currentDate;
  //       });

  //       setTotalItemsCurrentDate(itemsCurrentDate.length);



  //       const yellowItemsCurrentDate = yellowItems.filter(item => {
  //         const formattedBookingDate = new Date(item.bookingCurrentDate).toLocaleDateString();
  //         return formattedBookingDate === currentDate;
  //       });
  //       setTotalYellowItemsCurrentDate(yellowItemsCurrentDate.length);


  //       const redItemsCurrentDate = redItems.filter(item => {
  //         const formattedBookingDate = new Date(item.bookingCurrentDate).toLocaleDateString();
  //         return formattedBookingDate === currentDate;
  //       });
  //       setTotalRedItemsCurrentDate(redItemsCurrentDate.length);


  //       const greenItemsCurrentDate = greenItems.filter(item => {
  //         const formattedBookingDate = new Date(item.bookingCurrentDate).toLocaleDateString();
  //         return formattedBookingDate === currentDate;
  //       });
  //       setTotalGreenItemsCurrentDate(greenItemsCurrentDate.length);
       
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching data:", error);
  //     });
  // }, []);


  useEffect(() => {
    axios.get(`${urlbc}/bookings`)
      .then((response) => {
        setData(response.data.length);
  
        const yellowItems = response.data.filter(item => item.bookingColor === 'yellow');
        setTotalYellowItems(yellowItems.length);
  
        const redItems = response.data.filter(item => item.bookingColor === 'red');
        setTotalRedItems(redItems.length);
  
        const greenItems = response.data.filter(item => item.bookingColor === 'green');
        setTotalGreenItems(greenItems.length);
  
        const currentDate = new Date().toLocaleDateString(); // Get current date
  
        const itemsCurrentDate = response.data.filter(item => {
          const formattedBookingDate = new Date(item.bookingCurrentDate).toLocaleDateString();
          return formattedBookingDate === currentDate;
        });
  
        setTotalItemsCurrentDate(itemsCurrentDate.length);
  
        const yellowItemsCurrentDate = yellowItems.filter(item => {
          const formattedBookingDate = new Date(item.bookingCurrentDate).toLocaleDateString();
          return formattedBookingDate === currentDate;
        });
        setTotalYellowItemsCurrentDate(yellowItemsCurrentDate.length);
  
        const redItemsCurrentDate = redItems.filter(item => {
          const formattedBookingDate = new Date(item.bookingCurrentDate).toLocaleDateString();
          return formattedBookingDate === currentDate;
        });
        setTotalRedItemsCurrentDate(redItemsCurrentDate.length);
  
        const greenItemsCurrentDate = greenItems.filter(item => {
          const formattedBookingDate = new Date(item.bookingCurrentDate).toLocaleDateString();
          return formattedBookingDate === currentDate;
        });
        setTotalGreenItemsCurrentDate(greenItemsCurrentDate.length);
  
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  

  


  return (
    <>
      <div className="container-fluid position-relative d-flex p-0">
      <Sidebar isSidebarOpen={isSidebarOpen} />
      <div className={`content ${isSidebarOpen ? 'open' : ''}`}>
        <TopNavbar toggleSidebar={toggleSidebar} />
          <div className="container-fluid pt-3 px-3">
            <div className="row g-4">
              <div className="col-sm-6 col-xl-4">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <p className="mb-2">Total Booking</p>
                  <div className="ms-3">
                    <h6 className="mb-0 hm-st">{data}</h6>
                  </div>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-info"
                    role="progressbar"
                    style={{ width: "100%" }}
                    aria-valuenow={25}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
              <div className="col-sm-6 col-xl-4">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <p className="mb-2">Today's Booking</p>
                  <div className="ms-3">
                    <h6 className="mb-0 hm-st">{totalItemsCurrentDate}</h6>
                  </div>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-light"
                    role="progressbar"
                    style={{ width: "75%" }}
                    aria-valuenow={25}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
              <div className="col-sm-6 col-xl-4">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <p className="mb-2">All Pending</p>
                  <div className="ms-3">
                    <h6 className="mb-0 hm-st">{totalYellowItems}</h6>
                  </div>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: "100%" }}
                    aria-valuenow={25}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
              <div className="col-sm-6 col-xl-4">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <p className="mb-2">Today's Pending</p>
                  <div className="ms-3">
                    <h6 className="mb-0 hm-st">{totalYellowItemsCurrentDate}</h6>
                  </div>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-warning"
                    role="progressbar"
                    style={{ width: "75%" }}
                    aria-valuenow={25}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
              <div className="col-sm-6 col-xl-4">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <p className="mb-2">Today's Issued</p>
                  <div className="ms-3">
                    <h6 className="mb-0 hm-st">{totalGreenItemsCurrentDate}</h6>
                  </div>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: "75%" }}
                    aria-valuenow={25}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
              <div className="col-sm-6 col-xl-4">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <p className="mb-2">All Issued</p>
                  <div className="ms-3">
                    <h6 className="mb-0 hm-st">{totalGreenItems}</h6>
                  </div>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-success"
                    role="progressbar"
                    style={{ width: "75%" }}
                    aria-valuenow={25}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
              <div className="col-sm-6 col-xl-4">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <p className="mb-2">All Canceled</p>
                  <div className="ms-3">
                    <h6 className="mb-0 hm-st">{totalRedItems}</h6>
                  </div>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: "100%" }}
                    aria-valuenow={25}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
                </div>
              </div>
              <div className="col-sm-6 col-xl-4">
                <div className="bg-secondary rounded d-flex align-items-center justify-content-between p-4">
                <p className="mb-2">Today's Canceled</p>
                  <div className="ms-3">
                    <h6 className="mb-0 hm-st">{totalRedItemsCurrentDate}</h6>
                  </div>
                </div>
                <div className="progress">
                  <div
                    className="progress-bar bg-danger"
                    role="progressbar"
                    style={{ width: "75%" }}
                    aria-valuenow={25}
                    aria-valuemin={0}
                    aria-valuemax={100}
                  />
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

export default Home;
