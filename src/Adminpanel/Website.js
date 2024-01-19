import React, { useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import TopNavbar from "./TopNavbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { urlbc } from "../components/Constants";


const Website = () => {

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const navigate = useNavigate();
  // const [items, setItems] = useState([]);
  const token = localStorage.getItem("TOKEN");

  useEffect(() => {
    if (!token) {
      navigate("/signin");
    }
  });

  useEffect(() => {
    axios
      .get(`${urlbc}/booking`)
      .then((respone) => {
        // setItems(respone.data);
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
          <div className="container-fluid pt-4 px-4">
          
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default Website;
