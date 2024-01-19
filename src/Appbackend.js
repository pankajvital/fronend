import './Appbackend.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Layout from "./Admin/Layout";
import Signin from "./Componentsbackend/Signin";
import Signup from "./Componentsbackend/Signup";
// import SignUp from "./Admin/SignUp";
import Edit from './Componentsbackend/Edit';
import ForgetPassword from './Componentsbackend/Forgetpassword';
import NewSubmit from './Componentsbackend/Newsubmit';

import Home from "./Componentsbackend/Home";
import Booking from './Componentsbackend/Booking';
import BookingDetails from './Componentsbackend/BookingDetails';
import CustomerReceipt from './Componentsbackend/CustomerReceipt';
import MarkupSheet from './Componentsbackend/MarkupSheet';
import Website from './Componentsbackend/Website';
import Pending from './Componentsbackend/Pending';
import Agents from './Componentsbackend/Agents';
import Profile from './Componentsbackend/Profile';
import ProfileEdit from './Componentsbackend/ProfileEdit';
import AgentEdit from './Componentsbackend/AgentEdit';
import Cancel from './Componentsbackend/Cancel';
import Issue from './Componentsbackend/Issue';
import White from './Componentsbackend/White';
// import Navbar from './Componentsbackend/Navbar';
// import Signin from './Componentsbackend/Signin';


function Appbackend() {
 
  return (
    <BrowserRouter>
    <Routes>
      <Route
        path="/admin"
        element={
          <Home/>
        }
      />
      <Route
        path="/signin"
        element={
            <Signin />
        }
      />
       <Route
        path="/signup"
        element={
            <Signup />
        }
        
      />
       
       <Route
        path="/agents"
        element={
            <Agents />
        }
        
      />
       <Route
        path="agentedit/:id"
        element={
            <AgentEdit />
        }
        
      />
       <Route
        path="/profile"
        element={
            <Profile />
        }
        
      />
      <Route
        path="profileedit"
        element={
            <ProfileEdit />
        }
        
      />
     
      <Route
        path="/send-otp"
        element={
            <NewSubmit />
        }
        
      />
      <Route
        path="/submit-otp"
        element={
            <NewSubmit />
        }
        
      />
      <Route
        path="/forgetpassword"
        element={
            <ForgetPassword />
        }
      />
      <Route
        path="/booking"
        element={
           <Booking/>
        }
      />
      <Route
        path="/bookingdetails"
        element={
          <BookingDetails />
        }
      />
      <Route
        path="/customer-receipt"
        element={
          <CustomerReceipt />
        }
      />
      <Route
        path="/markup-sheet"
        element={
          <MarkupSheet />
        }
      />
      <Route
        path="/website"
        element={
          <Website />
        }
      />
      <Route
        path="/pending"
        element={
          <Pending />
        }
      />

      <Route
        path="/issue"
        element={
          <Issue />
        }
      />
      <Route
        path="/white"
        element={
          <White />
        }
      />

      <Route
        path="/cancel"
        element={
          <Cancel />
        }
      />
      
    </Routes>
    </BrowserRouter>
  );
}

export default Appbackend;
