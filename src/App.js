import React from 'react';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import './App.css';
// import './Adminpanel/Home.css';
import Section from './components/Section';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import FlightResult from './components/FlightResult';
import FlightMultiCity from './components/FlightMultiCity';
import FlightSubmit from './components/FlightSubmit';
import CustomerReceipt from './components/CustomerReceipt';
// import Test from './components/Test';

import Contact from './pages/Contact';
import About from './pages/About';
import { Faqs } from './pages/Faqs';
import Privacy from './pages/Privacy';
import TermsAndCondition from './pages/TermsAndCondition';
import Refund from './pages/RefundPolicyjsx';
// import SortTest from './components/SortTest';



//// Admin panel include code below
import Signin from "./Adminpanel/Signin";
import Signup from "./Adminpanel/Signup";
// import SignUp from "./Admin/SignUp";
// import Edit from './Adminpanel/Edit';
import ForgetPassword from './Adminpanel/Forgetpassword';
import NewSubmit from './Adminpanel/Newsubmit';

import Home from "./Adminpanel/Home";
import Booking from './Adminpanel/Booking';
import BookingDetails from './Adminpanel/BookingDetails';
// import CustomerReceipt from './Adminpanel/CustomerReceipt';
import MarkupSheet from './Adminpanel/MarkupSheet';
import Website from './Adminpanel/Website';
import Pending from './Adminpanel/Pending';
import Agents from './Adminpanel/Agents';
import Profile from './Adminpanel/Profile';
import ProfileEdit from './Adminpanel/ProfileEdit';
import AgentEdit from './Adminpanel/AgentEdit';
import Cancel from './Adminpanel/Cancel';
import Issue from './Adminpanel/Issue';
import White from './Adminpanel/White';
import Notfound from './pages/404';
//
 

// Common components
function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <Section />
          </Layout>
        }
      />
      <Route
        path="/flightresult"
        element={
          <Layout>
            <FlightResult />
          </Layout>
        }
      />
          <Route
        path="/flightmulticity"
        element={
          <Layout>
            <FlightMultiCity />
          </Layout>
        }
      />
       <Route
        path="/flightSubmit"
        element={
          <Layout>
            <FlightSubmit />
          </Layout>
        }
        
      />
       {/* <Route
        path="/test"
        element={
          <Layout>
            <Test />
          </Layout>
        }
        
      /> */}
      <Route
        path="/about"
        element={
          <Layout>
            <About />
          </Layout>
        }
        
      />
      {/* <Route
        path="/sorttest"
        element={
          <Layout>
            <SortTest />
          </Layout>
        }
        
      /> */}
      <Route
        path="/contact"
        element={
          <Layout>
            <Contact />
          </Layout>
        }
      />
      <Route
        path="/customer-receipt"
        element={
          // <Layout>
            <CustomerReceipt />
          // </Layout>
        }
      />
      <Route
        path="/faqs"
        element={
          <Layout>
            <Faqs />
           </Layout>
        }
      />
      <Route
        path="/privacy"
        element={
          <Layout>
            <Privacy />
           </Layout>
        }
      />
      <Route
        path="/terms-condition"
        element={
          <Layout>
            <TermsAndCondition />
           </Layout>
        }
      />
      <Route
        path="/refund-policy"
        element={
          <Layout>
            <Refund />
           </Layout>
        }
      />

      <Route
        path="*"
        element={
          <Layout>
            <Notfound />
           </Layout>
        }
      />




    {/* Below of Admin Panel Router */}
    <Route
        path="/admin"
        element={
          <Home/>
        }
      />
      <Route
        path="/zustraveladministration"
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
        path="agentedit/"
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
    {/* Admin finish router */}


        


      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
