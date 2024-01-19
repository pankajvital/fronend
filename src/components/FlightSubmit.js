import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import $ from "jquery";
import 'parsleyjs';

import "jquery-ui/ui/widgets/datepicker";
import { urlbc } from "./Constants";
const FlightSubmit = () => {
  // const inputRef = useRef(null);
  useEffect(() => {
    window.scrollTo(0, 0); // Scrolls to the top of the page
  }, []);
  $(document).ready(function() {
    // Set a custom error message for the 'required' constraint
    window.Parsley.addMessages('en', {
      required: "This field is required"
    });
  
    // Load the customized messages
    window.Parsley.setLocale('en');
  
    // Initialize Parsley on your form element
    $('#tour_booking_form_item').parsley({ namespace: 'dp-' });
  });
  

  const navigate = useNavigate();
  const location = useLocation();
  console.log("location data", location.state);
  const [apiData, setApiData] = useState(null);
  useEffect(() => {
    // Update apiData if location.state changes
    setApiData(location.state || null);
  }, [location.state]);
  console.log("apidata check:", apiData);

  const [data, setData] = useState([]);

  const [states, setStates] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("United States");
  // const [selectedState, setSelectedState] = useState("");
  const [formDataBillingCard, setFormDataBillingCard] = useState({
    country: "United States",
    state: "",
    city: "",
    billingAddress: "",
    postalCode: "",
  });

  // below code of user info submit
  const [formData, setFormData] = useState({});

  const [isChecked, setIsChecked] = useState(true);
  const [totalAmounts, setTotalAmounts] = useState(0);

  const [formDataEmailId, setFormDataEmailId] = useState({
    email: "",
    phone: "",
  });
  const [error, setError] = useState({
    emailError: "",
    phoneError: "",
  });

  const [cardNumberError, setCardNumberError] = useState("");
  const [cvvError, setCvvError] = useState("");
  const [cardType, setCardType] = useState(""); // To track the card type (e.g., "mastercard", "visa", etc.)
  const [formDataCard, setFormDataCard] = useState({
    firstName: "",
    middleName:"",
    lastName: "",
    cardNumber: "",
    expirationMonth: "",
    expirationYear: "",
    cvv: "",
    cardType: ""
  });


  const [isCheck, setIsCheck] = useState(true);


  // useEffect(() => {
  //   axios
  //     .get(
  //       "https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json"
  //     )
  //     .then((res) => {
  //       setData(res.data);
  //       // If "United States" is the default country, update states accordingly
  //       if (selectedCountry === "United States") {
  //         let usStates = res.data.filter((state) => state.country === selectedCountry);
  //         usStates = [...new Set(usStates.map((item) => item.subcountry))];
  //         usStates.sort();
  //         setStates(usStates);
  //       }
  //     })
  //     .catch((err) => console.log(err));
  // }, [selectedCountry]);



  const fetchDataAndUpdateStates = async (selectedCountry) => {
    try {
      const response = await axios.get("https://pkgstore.datahub.io/core/world-cities/world-cities_json/data/5b3dd46ad10990bca47b04b4739a02ba/world-cities_json.json");
      setData(response.data);
  
      // Update states based on the selected country
      let newStates;
      if (selectedCountry) {
        newStates = response.data.filter((state) => state.country === selectedCountry);
        newStates = [...new Set(newStates.map((item) => item.subcountry))];
        newStates.sort();
      } else {
        // If no country is selected, clear the states
        newStates = [];
      }
  
      setStates(newStates);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchDataAndUpdateStates(selectedCountry);
  }, [selectedCountry]);

  // Assuming that you have data available here to extract country
  const country = [...new Set(data.map((item) => item.country))];
  country.sort();

  const handleCountry = (e) => {
    const selectedCountry = e.target.value;
    setSelectedCountry(selectedCountry);

    fetchDataAndUpdateStates(selectedCountry);

    // Update the country field in formDataBillingCard
    setFormDataBillingCard({
      ...formDataBillingCard,
      country: selectedCountry,
    });
  };

  // const country = [...new Set(data.map((item) => item.country))];
  // country.sort();

  // const handleCountry = (e) => {
  //   const selectedCountry = e.target.value;
  //   setSelectedCountry(selectedCountry);
  //   let states = data.filter((state) => state.country === selectedCountry); // Use selectedCountry
  //   states = [...new Set(states.map((item) => item.subcountry))];
  //   states.sort();
  //   setStates(states);

  //   // Update the country field in formDataBillingCard
  //   setFormDataBillingCard({
  //     ...formDataBillingCard,
  //     country: selectedCountry,
  //   });
  // };

 // ...

// const handleCountry = (e) => {
//   const selectedCountry = e.target.value;
//   const selectedState = e.target.options[e.target.selectedIndex].text;
//   const isUnitedStates = data.some((item) => item.country === "United States" && item.subcountry === selectedState);

//   // Update states based on the selected country
//   let states;
//   if (isUnitedStates || !selectedCountry) {
//     // If the selected state is in the United States or no country is selected, default to "United States"
//     states = data.filter((state) => state.country === "United States");
//     states = [...new Set(states.map((item) => item.subcountry))];
//     states.sort();

//     // Update the country to "United States" only if no country is selected
//     setSelectedCountry("United States");
//   } else {
//     // If the selected state is not in the United States, update states accordingly
//     states = [];
//   }

//   setStates(states);

//   // Update the country field in formDataBillingCard
//   setFormDataBillingCard({
//     ...formDataBillingCard,
//     country: selectedCountry,
//   });
// };



// const country = [...new Set(data.map((item) => item.country))];
// country.sort();
// const handleCountry = (e) => {
//   const selectedCountry = e.target.value;
//   setSelectedCountry(selectedCountry);

//   // Update states based on the selected country
//   let newStates;
//   if (selectedCountry === "United States") {
//     newStates = data.filter((state) => state.country === selectedCountry);
//     newStates = [...new Set(newStates.map((item) => item.subcountry))];
//     newStates.sort();
//   } else {
//     // If a country other than the United States is selected, update states accordingly
//     newStates = [];
//   }

//   setStates(newStates);

//   // Update the country field in formDataBillingCard
//   setFormDataBillingCard({
//     ...formDataBillingCard,
//     country: selectedCountry,
//   });
// };



// ...


console.log('select value', selectedCountry)

  const [isLoading, setIsLoading] = useState(false);


    // $('.datepicker').datepicker({
    //   dateFormat: 'mm-dd-yy',
    //   maxDate: '-1d',
    //   yearRange: '-100y:c+nn',
    //   changeMonth: true,
    //   changeYear: true,
    //   onSelect: function(dateText, instance) {
    //     const travelerType = $(this).data('traveler-type');
    //     const index = $(this).data('index');
    //     handleInputChange(travelerType, index, "date", dateText);
    
    //     // Trigger 'input' event for Parsley validation
    //     $(this).trigger('input');
    //   }
    // });

    // $('.datepicker').datepicker({
    //   dateFormat: 'mm-dd-yy',
    //   maxDate: '-1d',
    //   yearRange: '-100y:c+nn',
    //   changeMonth: true,
    //   changeYear: true,
    //   onSelect: function (dateText, instance) {
    //     const travelerType = $(this).data('traveler-type');
    //     const index = $(this).data('index');
    //     handleInputChange(travelerType, index, 'date', dateText);
    
    //     // Trigger 'input' event for Parsley validation
    //     $(this).trigger('input');
    //   }
    // });
    
  // }, []);

  // const handleChangeBillingCard = (e) => {
  //   const { name, value } = e.target;
  
  //   // If the input is the city field, remove numerical characters
  //   if (name === 'city') {
  //     const sanitizedValue = value.replace(/[0-9]/g, ''); // Remove numerical characters
  //     setFormDataBillingCard({ ...formDataBillingCard, [name]: sanitizedValue });
  //   } else {
  //     setFormDataBillingCard({ ...formDataBillingCard, [name]: value });
  //   }
  // };

  const handleChangeBillingCard = (e) => {
    const { name, value } = e.target;
  
    // Capitalize the first letter of each word
    const formattedValue = value
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ');
  
    // If the input is the city field, remove numerical characters
    const sanitizedValue = name === 'city' ? formattedValue.replace(/[0-9]/g, '') : formattedValue;
  
    setFormDataBillingCard({ ...formDataBillingCard, [name]: sanitizedValue });
  };
  
  // Function to format a timestamp into a readable time string
  function formatTime(timestamp) {
    const dateObject = new Date(timestamp);
    let hours = dateObject.getHours();
    let minutes = dateObject.getMinutes();
    let amOrPm = hours >= 12 ? "PM" : "AM";

    if (hours === 0) {
      hours = 12;
    } else if (hours > 12) {
      hours -= 12;
    }

    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;

    return `${hours}:${minutes} ${amOrPm}`;
  }

  // Function to format a timestamp into a readable date string
  function formatDate(timestamp) {
    const dateObject = new Date(timestamp);
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const month = monthNames[dateObject.getMonth()];
    const day = dateObject.getDate();
    const dayOfWeek = dayNames[dateObject.getDay()];
    return `${month}, ${day}, ${dayOfWeek}`;
  }

  if (!apiData || !apiData.data || !Array.isArray(apiData.data)) {
    return <div>No data available.</div>;
  }

  // below code of fare details totalAmount and autocheck tick
  const travelerTypeCounts = {};
  const travelerTypeTotals = {};
  let totalAmount = 0; // Initialize totalAmount to 0

  apiData.data.forEach((offer) => {
    offer.travelerPricings.forEach((travelerPricing) => {
      const travelerType = travelerPricing.travelerType;
      const priceTotal = parseFloat(travelerPricing.price.total);
      const totalTravelerPrice = priceTotal * 0.72;
      const taxAmount = priceTotal * 0.28;
  
      if (travelerType !== "INFANT") {
        if (travelerTypeCounts[travelerType]) {
          travelerTypeCounts[travelerType]++;
          travelerTypeTotals[travelerType] += priceTotal;
        } else {
          travelerTypeCounts[travelerType] = 1;
          travelerTypeTotals[travelerType] = priceTotal;
        }
  
        if (travelerType === "ADULT" || travelerType === "CHILD") {
          totalAmount += 89;
        }
  
        totalAmount += totalTravelerPrice + taxAmount;
      }
    });
  });
  // Define a state to store the form data
  let cabin = 0;

  if (travelerTypeCounts["ADULT"] && travelerTypeCounts["CHILD"]) {
    cabin = (travelerTypeCounts["ADULT"] + travelerTypeCounts["CHILD"]) * 89;
  } else if (travelerTypeCounts["ADULT"]) {
    cabin = travelerTypeCounts["ADULT"] * 89;
  }  // Define a state to store the form data
  const handleCheckboxChange = () => {
    if (isChecked) {
      if (!travelerTypeCounts["CHILD"]) {
        setTotalAmounts(totalAmount - travelerTypeCounts["ADULT"] * 89);
      } else {
        setTotalAmounts(
          totalAmount - (travelerTypeCounts["ADULT"] + travelerTypeCounts["CHILD"]) * 89
        );
      }
      setIsChecked(false); // Uncheck the checkbox
    } else {
      setTotalAmounts(totalAmount);
      setIsChecked(true);
    }
  };



  // user info submit code below
  // const handleInputChange = (travelerType, index, field, value) => {
  //   setFormData((prevFormData) => ({
  //     ...prevFormData,
  //     [`${travelerType}_${index}`]: {
  //       ...prevFormData[`${travelerType}_${index}`],
  //       [field]: value,
  //     },
  //   }));
  // };

  
  const handleInputChange = (travelerType, index, field, value) => {
    let formattedValue = value;
  
    if (field === 'date') {
      // Allow only numeric characters in the Date of Birth field
      formattedValue = value.replace(/[^0-9]/g, '');
  
      // Add the desired date format (e.g., 'MM-DD-YYYY')
      if (formattedValue.length >= 2) {
        formattedValue = formattedValue.substring(0, 2) + '-' + formattedValue.substring(2);
      }
      if (formattedValue.length >= 4) {
        formattedValue = formattedValue.substring(0, 5) + '-' + formattedValue.substring(5);
      }
    } else {
      // Allow only letters (A-Za-z) in the input
      const sanitizedValue = value.replace(/[^A-Za-z ]/g, '');
  
      // Capitalize the first letter of each word
      formattedValue = sanitizedValue
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ');
    }
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      [`${travelerType}_${index}`]: {
        ...prevFormData[`${travelerType}_${index}`],
        [field]: formattedValue,
      },
    }));
  };
  
  $('.datepicker').datepicker({
    dateFormat: 'mm-dd-yy',
    maxDate: '-1d',
    yearRange: '-100y:c+nn',
    changeMonth: true,
    changeYear: true,
    onSelect: function (dateText, instance) {
      const travelerType = $(this).data('traveler-type');
      const index = $(this).data('index');
      handleInputChange(travelerType, index, 'date', dateText);
  
      // Trigger 'input' event for Parsley validation
      $(this).trigger('input');
    }
  });
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsLoading(true); // Set loading state to true during form submission

    try {
      // Fetch the user's IP address using ipinfo.io
      const ipResponse = await axios.get("https://api.ipify.org?format=json");
      const userIpAddress = ipResponse.data.ip;

      const computerName = window.navigator.userAgent;

      // Get the user's user-agent string
      const userAgent = window.navigator.userAgent;

      // Determine the user's browser
      let browser = "Unknown";
      if (userAgent.includes("Chrome")) {
        browser = "Google Chrome";
      } else if (userAgent.includes("Firefox")) {
        browser = "Mozilla Firefox";
      } else if (
        userAgent.includes("Safari") &&
        userAgent.includes("Version/")
      ) {
        browser = "Apple Safari";
      } else if (userAgent.includes("MSIE") || userAgent.includes("Trident/")) {
        browser = "Internet Explorer";
      } else if (userAgent.includes("Edge")) {
        browser = "Microsoft Edge";
      }

      // Get the user's device type from the user-agent header
      const isMobileDevice =
        /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Opera Mini/i.test(
          userAgent
        );

      // Determine the device type
      const deviceType = isMobileDevice ? "Mobile" : "Desktop";

      const currentDate = new Date().toLocaleString();

      // Combine all the data into one object
      // Create the fareDetails object
      const fareDetails = {
        totalAmount: isChecked
          ? totalAmount.toFixed(2)
          : totalAmounts.toFixed(2),
        cabin: isChecked,
        // cabinAmount: isChecked ? cabin : (cabin = 0),
        cabinAmount: isChecked ? cabin : 0,
        travelerDetails: Object.keys(travelerTypeCounts).map(
          (travelerType) => ({
            travelerType,
            count: travelerTypeCounts[travelerType],
            totalAmount: (travelerTypeTotals[travelerType] * 0.72).toFixed(2),
            taxAmount: (travelerTypeTotals[travelerType] * 0.28).toFixed(2),
          })
        ),
      };
      const deviceInfo = {
        ipAddress: userIpAddress, // Add the user's IP address
        browser: browser,
        deviceType: deviceType,
        computerName: computerName,
        currentDate: new Date(), // Add the current date and time
       
      };
      // Add fareDetails to the submitBookingData object
      const submitBookingData = {
        userInformation: formData,
        creditCardData: formDataCard,
        emaiAndId: formDataEmailId,
        billingCard: formDataBillingCard,
        flightData: apiData,  
        fareDetails: fareDetails,
        deviceInfo: deviceInfo,
        acceptAgent: "",
        bookingColor: "",
        bookingCurrentDate: currentDate,
        comments: [{content: "This is the comment content",name:"This is Name"} ]// Include the comments field with an empty object
      };
      
      console.log("submitBookingData", submitBookingData);
      // Extract the last three digits from the "phone" and "postalCode" fields
      // Extract the last two digits from the "phone" and "postalCode" fields
      const phoneNumber =
        (submitBookingData.userInformation &&
          submitBookingData.emaiAndId.phone) ||
        "";
      const last_two_digits_phone = phoneNumber.trim().slice(-2);

      const postalCode =
        (submitBookingData.billingCard &&
          submitBookingData.billingCard.postalCode) ||
        "";
      const last_two_digits_postal = postalCode.trim().slice(-2);

      // Generate a random 5-digit number
      const random_number = Math.floor(Math.random() * 9000) + 1000;

      // Create the final number with "FH," last digits, and random number
      const result = `ZTL${last_two_digits_phone}${last_two_digits_postal}${random_number}`;

      // Add the 'result' to the 'submitBookingData' object
      submitBookingData.randomNumber = result;
      console.log("random number:", result);

      console.log("Information data", submitBookingData);

      // Send the data to the backend API
      const response = await axios.post(
        `${urlbc}/booking`,
        submitBookingData
      );

        const responseSubmitForm = await axios.post(
      `${urlbc}/submit-form`,
      submitBookingData
    );
    console.log('Email sent:', responseSubmitForm.data);  
    

      console.log("Data sent successfully:", response.data);
      // alert("Your Booking Successfully Done! Check Your Email For Confirmation. Our Team Contact Soon.")
      navigate("/customer-receipt", { state: { result: submitBookingData}});
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false); // Ensure loading state is reset in case of error
      console.error("Error sending data:", error);
    }




  };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  //   setFormDataCard({ ...formDataCard, [name]: value });
  // };

  // const handleChange = (e) => {
  //   const { name, value } = e.target;
  
  //   // Allow only letters (A-Za-z) in the input
  //   const sanitizedValue = value.replace(/[^A-Za-z ]/g, '');
  
  //   // Capitalize the first letter of each word
  //   const formattedValue = sanitizedValue
  //     .split(' ')
  //     .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
  //     .join(' ');
  
  //   setFormDataCard({ ...formDataCard, [name]: formattedValue });
  // };


  const handleChange = (e) => {
    const { name, value } = e.target;
  
    // Allow only letters for the "First Name," "Middle Name (Optional)," and "Last Name" fields
    const sanitizedValue =
      name === "firstName" || name === "middleName" || name === "lastName"
        ? value.replace(/[^A-Za-z ]/g, '')
        : value;
  
    // Capitalize the first letter of each word
    const formattedValue =
      name === "firstName" || name === "middleName" || name === "lastName"
        ? sanitizedValue
            .toLowerCase()
            .split(' ')
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ')
        : sanitizedValue;
  
    // For "Card Number" and "CVV," allow only numbers
    const numericValue =
      name === "cardNumber" || name === "cvv"
        ? sanitizedValue.replace(/[^0-9]/g, '')
        : sanitizedValue;
  
    // Update the state with the sanitized and formatted value
    setFormDataCard({ ...formDataCard, [name]: formattedValue });
  };
  
  

  
  
  const handleChangeEmailId = (e) => {
    const { name, value } = e.target;
    let errorMessage = "";
    if (name === "email") {
      // Email validation regex
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const isValidEmail = emailRegex.test(value);
  
      if (!isValidEmail) {
        setError({ ...error, emailError: "" });
      } else {
        setError({ ...error, emailError: "" });
      }
    }
  
    if (name === "phone") {
      const phoneRegex = /^[0-9]*$/;
      // Check if input contains letters (a-z)
      const containsLetters = /[a-zA-Z]/.test(value);
  
      if (!phoneRegex.test(value) || containsLetters) {
        // Only update state if value is empty, contains non-numeric characters, or contains letters
        errorMessage = "";
      } else {
        setFormDataEmailId({ ...formDataEmailId, [name]: value });
      }
    }
  
    setFormDataEmailId({ ...formDataEmailId, [name]: value });
  };
  const handleKeyPress = (e) => {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(e.charCode);
    if (!pattern.test(inputChar)) {
      e.preventDefault();
      setError({ ...error, phoneError: "" });
    } else {
      setError({ ...error, phoneError: "" });
    }
  };




  const handleCardNumberChange = (e) => {
    const cardNumber = e.target.value;
  
    // Remove non-digit characters and spaces
    const formattedCardNumber = cardNumber.replace(/\D/g, "");
    let updatedCardType = "";
  
    // Check if card starts with '3'
    if (/^3/.test(formattedCardNumber)) {
      if (
        formattedCardNumber.length <= 15 &&
        /^\d{15}$/.test(formattedCardNumber)
      ) {
        setCardNumberError("");
        updatedCardType = "Amex";
        setCardType("Amex");
      } else {
        setCardNumberError("(Must be 15 digits)");
        setCardType("");
      }
    }
    // Check if card starts with '4', '5', or '6'
    else if (/^[4-6]/.test(formattedCardNumber)) {
      if (
        formattedCardNumber.length <= 16 &&
        /^\d{16}$/.test(formattedCardNumber)
      ) {
        setCardNumberError("");
        if (/^4/.test(formattedCardNumber)) {
          updatedCardType = "Visa";
          setCardType("Visa");
        } else if (/^5/.test(formattedCardNumber)) {
          updatedCardType = "Mastercard";
          setCardType("Mastercard");
        } else if (/^6/.test(formattedCardNumber)) {
          updatedCardType = "Discover";
          setCardType("Discover");
        }
      } else {
        setCardNumberError("(Must be 16 digits)");
        setCardType("");
      }
    } else {
      setCardNumberError("Invalid card number");
      setCardType("");
    }
  
    // Format the card number with spaces after every 4 digits
    const formattedCardNumberWithSpaces = formattedCardNumber
      .replace(/(.{4})/g, "$1 ")
      .trim(); // Remove trailing space
  
    // Update the formDataCard state with cardType
    setFormDataCard({
      ...formDataCard,
      cardNumber: formattedCardNumberWithSpaces,
      cardType: updatedCardType,
    });
  };
  

 const handleCvvChange = (e) => {
  let cvv = e.target.value;
  const cvvLength = cvv.length;

  // Remove non-digit characters and spaces
  cvv = cvv.replace(/\D/g, "");

  // Check the card type and validate CVV accordingly
  if ((cardType.startsWith("3") || cardType === "Amex") && cvvLength <= 4) {
    if (/^\d{3,4}$/.test(cvv)) {
      setCvvError("");
    } else {
      setCvvError("(Must be 3 or 4 digits)");
    }
  } else if (cardType && cvvLength <= 3) {
    if (/^\d{3}$/.test(cvv)) {
      setCvvError("");
    } else {
      setCvvError("(Must be 3 digits)");
    }
  } else {
    setCvvError(`(Must be ${cardType.startsWith("3") || cardType === "Amex" ? "3 or 4" : "3"} digits)`);
  }

  setFormDataCard({ ...formDataCard, cvv });
};


  // year select code
  function generateYearOptions() {
    // const currentYear = new Date().getFullYear();
    const startYear = 2023; // Change this to your desired start year
    const endYear = 2050; // Change this to your desired end year
    const yearOptions = [];

    for (let year = startYear; year <= endYear; year++) {
      yearOptions.push(
        <option key={year} value={year}>
          {year}
        </option>
      );
    }

    return yearOptions;
  }
  function generateMonthOptions() {
    const monthNames = Array.from(
      { length: 12 },
      (_, i) => String(i + 1).padStart(2, "0") // Format with leading zeros
    );

    const monthOptions = monthNames.map((month, index) => (
      <option key={index} value={month}>
        {month}
      </option>
    ));

    return monthOptions;
  }


// bottom checked code of confirm booking
  const handleCheckChange = (e) => {
    setIsCheck(e.target.checked);
  };


  return (
    <>
      {/* Common Banner Area */}
      {/* <section id="common_banner" className="top-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_bannner_text">
                <h2>Flight Submissions</h2>
                <ul>
                  <li>
                    <a href="index.html">Home</a>
                  </li>
                  <li>
                    <span>
                      <i className="fas fa-circle" />
                    </span>
                    <a href="flight-search-result.html">Flight Submissions </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section id="tour_booking_submission" className="mt-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-9">
              <div className="submit-home submit-seg-bor">
                    <span>
                      <Link to="/">Home</Link> / Flight Submit
                    </span>
                  </div>
              <form
                onSubmit={handleSubmit}
                action="#"
                id="tour_booking_form_item"
              >
                <div className="tou_booking_form_Wrapper">
                  
                  {/* try//////////////// */}
                  <div className="flight_policy_refund-s submit-seg">
                    {apiData.data.map((data, dataIndex) => (
                      <div
                        key={dataIndex}
                        className="flight_show_down_wrapperd row"
                      >
                        {data.itineraries.map((itinerary, itineraryIndex) => (
                          <div
                            key={itineraryIndex}
                            className="flight-shoe_dow_item mt-3 col-md-12"
                          >
                            {itinerary.segments.map((segment, segmentIndex) => {
                              const departureAtTime = segment.departure.at;
                              const departureTime = new Date(departureAtTime);

                              // Format departure time
                              const formattedDepartureTimeShow =
                                formatTime(departureTime);

                              const arrivalAtTime = segment.arrival.at;
                              const arrivalTime = new Date(arrivalAtTime);

                              // Format arrival time
                              const formattedArrivalTimeShow =
                                formatTime(arrivalTime);

                              function formatTime(time) {
                                const hours = time.getHours();
                                const minutes = time.getMinutes();
                                const ampm = hours >= 12 ? "PM" : "AM";

                                // Convert hours from 24-hour format to 12-hour format
                                const formattedHours = ((hours + 11) % 12) + 1;
                                const formattedMinutes = minutes
                                  .toString()
                                  .padStart(2, "0");

                                const formattedTime = `${formattedHours
                                  .toString()
                                  .padStart(
                                    2,
                                    "0"
                                  )}:${formattedMinutes} ${ampm}`;

                                return formattedTime;
                              }

                              const formattedDepartureDate = formatDate(
                                segment.departure.at
                              );
                              const formattedArrivalDate = formatDate(
                                segment.arrival.at
                              );
                              const ansDate = formattedDepartureDate; // Use the formatted departure time
                              const ans1Date = formattedArrivalDate; // Use the formatted arrival time

                              const seg = segment.carrierCode;
                              const flightname =
                                apiData.dictionaries.carriers[seg];

                              const sefaricraft = segment.aircraft.code;
                              const ariNumner =
                                apiData.dictionaries.aircraft[sefaricraft];
                              //// code of layout duration
                              const seg1hour = itinerary.segments[0].duration
                                .slice(2) // Remove "pt" prefix
                                .slice(0, 2)
                                .match(/.{1,2}/g) // Split the string into groups of two characters
                                .join(" ");
                              const seg2hour = itinerary?.segments[1]?.duration
                                .slice(2) // Remove "pt" prefix
                                .slice(0, 2)
                                .match(/.{1,2}/g) // Split the string into groups of two characters
                                .join(" ");
                              const seg1min = itinerary?.segments[0]?.duration
                                .slice(2) // Remove "pt" prefix
                                .slice(-3)
                                .match(/.{1,2}/g) // Split the string into groups of two characters
                                .join(" ");
                              const seg2min = itinerary?.segments[1]?.duration
                                .slice(2) // Remove "pt" prefix
                                .slice(-3)
                                .match(/.{1,2}/g) // Split the string into groups of two characters
                                .join(" ");
                              const datadurationhour = itinerary.duration
                                .slice(2) // Remove "pt" prefix
                                .slice(0, 2)
                                .match(/.{1,2}/g) // Split the string into groups of two characters
                                .join(" ");
                              const datadurationmin = itinerary.duration
                                .slice(2) // Remove "pt" prefix
                                .slice(-3)
                                .match(/.{1,2}/g) // Split the string into groups of two characters
                                .join(" ");
                              // Convert hours and minutes to integers
                              const intSeg1hour = parseInt(seg1hour, 10);
                              const intSeg2hour = parseInt(seg2hour, 10);
                              const intSeg1min = parseInt(seg1min, 10);
                              const intSeg2min = parseInt(seg2min, 10);
                              const intdatadurationhour = parseInt(
                                datadurationhour,
                                10
                              );
                              const intdatadurationmin = parseInt(
                                datadurationmin,
                                10
                              );

                              // Calculate total hours and minutes
                              let totalHours = intSeg1hour + intSeg2hour;
                              let totalMins = intSeg1min + intSeg2min;

                              // Calculate the difference in hours and minutes
                              let totalHour = intdatadurationhour - totalHours;
                              let totalMin = intdatadurationmin - totalMins;

                              // Adjust for negative minutes
                              if (totalMin < 0) {
                                totalHour -= 1; // Subtract one hour to compensate for negative minutes
                                totalMin += 60; // Add 60 minutes to make the minutes positive
                              }

                              // Handle the case where minutes equal 60
                              if (totalMin === 60) {
                                totalHour += 1; // Add 1 hour
                                totalMin = 0; // Reset minutes to 0
                              }

                              if (totalMin <= 0 || isNaN(totalMin)) {
                                totalMin = 0; // Set minutes to 0 if it's less than or not a number
                              }
                              if (totalHour <= 0 || isNaN(totalHour)) {
                                totalHour = 0; // Set minutes to 0 if it's less than or not a number
                              }

                              // Format the total duration
                              let gethour =
                                totalHour < 10
                                  ? "" + totalHour + "H"
                                  : totalHour + "H";
                              let getmin =
                                totalMin < 10
                                  ? "0" + totalMin + "M"
                                  : totalMin + "M";
                              let totalduration =
                                "Layover Time: " + gethour + " " + getmin;

                              if (totalMin <= 0 || isNaN(totalMin)) {
                                totalMin = 0; // Set minutes to 0 if it's less than or not a number
                              }
                              if (totalMin === 0 && totalHour === 0) {
                                totalduration = "";
                              }

                              const content =
          itineraryIndex === 0
            ? 'Out bound'
            : itineraryIndex === 1
            ? 'In bound'
            : 'Some default content for itinerary';
                              return (
                                <>
                                {/* <div className="row" > */}
                                <div
                                  key={segmentIndex}
                                  className="flight-shoe_dow_item submit-seg-bor col-md-12"
                                  // style={{padding:'1rem'}}
                                >
                                  {/* <div className="submit-wrap"> */}
                                  <div className="airline-details">
                                    <span className="airlineName fw-500">
                                      {flightname} |
                                    </span>
                                    <span className="flightNumber">
                                      {
                                        data.travelerPricings[0]
                                          .fareDetailsBySegment[0].cabin
                                      }{" "}
                                      | {ariNumner} | {segment.carrierCode}{" "}
                                      &nbsp;
                                      {segment.number}
                                    </span>
                                  </div>
                                  <div className="flight_inner_show_component row">
                                    <div className="flight_det_wrapper col-md-5">
                                      <div className="flight_det">
                                        <div className="code_time">
                                          <span className="code">
                                            {/* <img
                                              src={`https://cmsrepository.com/static/flights/flight/airlinelogo-png/${itinerary.segments[0].carrierCode.toLowerCase()}.png`}
                                              alt={
                                                itinerary.segments[0]
                                                  .carrierCode
                                              }
                                            />
                                            &nbsp; */}
                                            {segment.departure.iataCode}
                                          </span>
                                          <span className="time">
                                            {formattedDepartureTimeShow}
                                          </span>
                                        </div>
                                        {/* <p className="airport">
                                          Hazrat Shahjalal International Airport
                                        </p> */}
                                        <p className="date">{ansDate}</p>
                                      </div>
                                    </div>
                                    <div className="flight_duration col-md-2">
                                    <span>{content}</span>

                                      <div className="arrow_right" />
                                      <span>
                                        <b>
                                          {segment.duration
                                            .slice(2) // Remove "pt" prefix
                                            .match(/.{1,2}/g) // Split the string into groups of two characters
                                            .join(" ")}
                                        </b>
                                      </span>
                                    </div>
                                    <div className="flight_det_wrapper col-md-5">
                                      <div className="flight_det myserach-res">
                                        <div className="code_time">
                                          <span className="code">
                                            {segment.arrival.iataCode}
                                          </span>
                                          <span className="time">
                                            {formattedArrivalTimeShow}
                                          </span>
                                        </div>
                                        {/* <p className="airport">
                                          Hazrat Shahjalal International Airport
                                        </p> */}
                                        <p className="date">{ans1Date}</p>
                                      </div>
                                    </div>
                                    <div
                                      className="col-md-12"
                                      id="totalDurationElement"
                                    >
                                      {/* <center className="submit-air-line">
                                        <h5>
                                          {segmentIndex === 0 ? (
                                            <span className="layover">
                                              {totalduration}
                                            </span>
                                          ) : (
                                            ""
                                          )}
                                        </h5>
                                      </center> */}
                                      <center className="cen-layover">
                                                    <h5>
                                                      {/* Only display totalduration if it hasn't been displayed before */}
                                                      {segmentIndex === 0 ? (
                                                        <span className="layover">
                                                          {totalduration}
                                                        </span>
                                                      ) : (
                                                        ""
                                                      )}
                                                    </h5>
                                                  </center>
                                    </div>
                                  </div>
                                  {/* </div> */}
                                </div>
                                {/* </div> */}
                                </>
                              );
                            })}
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                  {/* try end  */}

                  <div
                    className="booking_tour_form"
                    style={{ marginTop: "1.5rem" }}
                  >
                    <div className="sub-wrap-h">
                      <div className="submit-heading">
                        <p>Your Personal Information</p>
                      </div>
                      <p>
                        All passenger names must match Passport or government
                        issued Photo ID. Passport and/or Photo ID must be valid
                        on date of travel.
                      </p>
                    </div>
                    <div className="sub-wrap-h">
                      <div className="submit-heading">
                        <p>Contact Details</p>
                      </div>
                      <p>
                        *We will use below contact details for any further
                        communication
                      </p>
                      <div className="row">
                        <div className="form-group col-md-6">
                          <label>Email</label>
                          <div className="sub-wrap-icon">
                            <i className="fa-solid fa-envelope"></i>{" "}
                            <input
                              type="email"
                              name="email"
                              required
                              autocomplete="off"
                              onChange={handleChangeEmailId}
                              data-parsley-required-message="Your custom required message here"
                              // dp-required
                              className="form-control mycontrol-icon"
                            />
                          </div>
                          {error.emailError && <span className="error text-danger">{error.emailError}</span>}
                        </div>
                        <div className="form-group col-md-6">
                          <label>Phone</label>
                          <div className="sub-wrap-icon">
                            <i className="fa-solid fa-phone"></i>{" "}
                            <input
                              type="text"
                              name="phone"
                              required
                              autocomplete="off"
                              onChange={handleChangeEmailId}
                              onKeyPress={handleKeyPress}
                              className="form-control mycontrol-icon"
                            />
                          </div>
                                  {error.phoneError && <span className="error text-danger">{error.phoneError}</span>}

                        </div>
                      </div>
                    </div>
                    {/* user info wrap below */}
                    <div id="tour_booking_form_item">
                      <div className="tour_booking_form_box">
                        {Object.keys(travelerTypeCounts).map((travelerType) => (
                          <div key={travelerType}>
                            {Array.from({
                              length: travelerTypeCounts[travelerType],
                            }).map((_, index) => (
                              <div
                                className="row all-user-info g-3"
                                key={index}
                              >
                                <div className="sub-wrap-h p-0">
                                  <div className="submit-heading">
                                  <p className="">
                                      Passenger {travelerType === "HELD_INFANT" ? "INFANT" : travelerType}: {index + 1}
                                  </p>
                                  </div>
                                </div>
                                <div className="col-lg-2 col-user p-0">
                                  <div className="form-group">
                                    <label htmlFor="gender">Gender</label>
                                    <div className="form-group sub-wrap-icon">
                                    {/* <select
                                        name="users"
                                        id="users"
                                        required
                                        value={
                                          formData[`${travelerType}_${index}`]
                                            ?.gender || "select"
                                        }
                                        onChange={(e) =>
                                          handleInputChange(
                                            travelerType,
                                            index,
                                            "gender",
                                            e.target.value
                                          )
                                        }
                                        className="form-select form-control mycontrol-icon-no bg_input"
                                      >
                                        <option value="">Select Gender</option>
                                        <option value="male">Male</option>
                                        <option value="female">Female</option>
                                        <option value="other">Other</option>
                                      </select> */}
                                       <select
  name="users"
  id="users"
  required
  value={
    formData[`${travelerType}_${index}`]?.gender || ""
  }
  onChange={(e) =>
    handleInputChange(
      travelerType,
      index,
      "gender",
      e.target.value
    )
  }
  className="form-select form-control mycontrol-icon-no bg_input"
>
  <option value="">Select Gender</option>
  <option value="Male">Male</option>
  <option value="Female">Female</option>
  <option value="Other">Other</option>
</select>
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg col-user">
                                  <div className="form-group">
                                    <label>First Name</label>
                                    <div className="sub-wrap-icon">
                                      <i className="fa-solid fa-user"></i>
                                      <input
                                        type="text"
                                        autocomplete="off"
                                        required
                                        value={
                                          formData[`${travelerType}_${index}`]
                                            ?.firstName || ""
                                        }
                                        onChange={(e) =>
                                          handleInputChange(
                                            travelerType,
                                            index,
                                            "firstName",
                                            e.target.value
                                          )
                                        }
                                        className="form-control mycontrol-icon"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg col-user">
                                  <div className="form-group">
                                    <label>Middle Name (Optional)</label>
                                    <div className="sub-wrap-icon">
                                      <i className="fa-solid fa-user"></i>
                                      <input
                                        type="text"
                                        autocomplete="off"
                                        value={
                                          formData[`${travelerType}_${index}`]
                                            ?.middleName || ""
                                        }
                                        onChange={(e) =>
                                          handleInputChange(
                                            travelerType,
                                            index,
                                            "middleName",
                                            e.target.value
                                          )
                                        }
                                        className="form-control mycontrol-icon"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg col-user">
                                  <div className="form-group">
                                    <label>Last Name</label>
                                    <div className="sub-wrap-icon">
                                      <i className="fa-solid fa-user"></i>
                                      <input
                                        type="text"
                                        required
                                        autocomplete="off"
                                        value={
                                          formData[`${travelerType}_${index}`]
                                            ?.lastName || ""
                                        }
                                        onChange={(e) =>
                                          handleInputChange(
                                            travelerType,
                                            index,
                                            "lastName",
                                            e.target.value
                                          )
                                        }
                                        className="form-control mycontrol-icon"
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-3 col-user">
                                  <div className="form-group">
                                    <label>Date of Birth</label>
                                    <div className="sub-wrap-icon">
                                    <input
                                      placeholder="Select your date"
                                      type="text"
                                      name="checkIn"
                                      required
                                      autocomplete="off"
                                      className="form-control mycontrol-icon-no datepicker"
                                      data-traveler-type={travelerType}
                                      data-index={index}
                                    />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* user info wrap above */}
                    <div className="mt-5">
                      <p>
                        *This information is for airline use during disruptions
                        and will not be used for marketing purpose.
                      </p>
                    </div>
                    <div className="submit-cabin">
                      <div className="row">
                        <div className="col-md-12 mb-3">
                          <p className="cabib-para">
                            <i class="fa-solid fa-circle-info"></i> Traveling
                            With Others and Want to Choose Your Seats? Consider
                            Main Cabin
                          </p>
                        </div>
                        <div className="col-md-6">
                          <div className="cabin-wrap">
                            <h3>Basic</h3>
                            <ul style={{listStyle: 'none', padding: '0'}} className="mt-3">
                              <li>
                                <i class="fa-solid fa-ban"></i> No seat(s)
                                assigned until after check-in, not together
                              </li>
                              <li>
                                <i class="fa-solid fa-ban"></i> No changes
                                allowed
                              </li>
                              <li>
                                <i class="fa-solid fa-ticket"></i> Cancel for
                                partial eCredit
                              </li>
                              <li>
                                <i class="fa-solid fa-ban"></i> Last to board &
                                not eligible for upgrades
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="col-md-6">
                          <div className="cabin-wrap">
                            <h3>Main Cabin</h3>
                            <ul style={{listStyle: 'none', padding: '0'}} className="mt-3">
                              <li>
                                <i class="fa-solid fa-paper-plane"></i> Select &
                                change seats at any time
                              </li>
                              <li>
                                <i class="fa-solid fa-ticket"></i> Changes
                                allowed with no change fees
                              </li>
                              <li>
                                <i class="fa-solid fa-ticket"></i> Cancel for
                                full eCredit after 24 hours
                              </li>
                              <li>
                                <i class="fa-solid fa-paper-plane"></i> 41
                                Earlier access to overhead bins & eligible to
                                purchase upgrades
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className="col-md-6 mt-2 text-center">
                          <h5 className="">
                            $89 more add freedom to choose seats.
                          </h5>
                        </div>
                        <div className="col-md-6 text-center">
                          <div className="cabib-w-check mt-2">
                            <input
                              type="checkbox"
                              checked={isChecked}
                              onChange={handleCheckboxChange}
                              id="cabinSelect"
                            />
                            <label for="cabinSelect">
                              Continue with Main Cabin
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="row card-row">
                      <div className="sub-wrap-h">
                        <div className="submit-heading">
                          <p>Card Information — Card Holder</p>
                        </div>
                        <p>
                          Your billing address must match the address listed on
                          your card statement.
                        </p>
                      </div>
                    </div>
                    {/* below code of card info */}
                    <div>
                      <div className="row">
                        <div className="col-lg-3 col-user">
                          <div className="form-group">
                            <label>First Name</label>
                            <div className="sub-wrap-icon">
                              <i class="fa-solid fa-user"></i>{" "}
                              <input
                                type="text"
                                autocomplete="off"
                                required
                                className="form-control mycontrol-icon"
                                name="firstName"
                                value={formDataCard.firstName}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-user">
                          <div className="form-group">
                            <label>Middle Name (Optional)</label>
                            <div className="sub-wrap-icon">
                              <i class="fa-solid fa-user"></i>{" "}
                              <input
                                type="text"
                                autocomplete="off"
                                className="form-control mycontrol-icon"
                                name="middleName"
                                value={formDataCard.middleName}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-3 col-user">
                          <div className="form-group">
                            <label>Last Name</label>
                            <div className="sub-wrap-icon">
                              <i class="fa-solid fa-user"></i>{" "}
                              <input
                                type="text"
                                autocomplete="off"
                                className="form-control mycontrol-icon"
                                name="lastName"
                                required
                                value={formDataCard.lastName}
                                onChange={handleChange}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-user">
                          <div className="form-group">
                            <label>Card Number</label>
                            <div className="sub-wrap-icon">
                              <i class="fa-regular fa-credit-card"></i>
                              <input
                                type="text"
                                autocomplete="off"
                                required
                                className="form-control mycontrol-icon"
                                name="cardNumber"
                                value={formDataCard.cardNumber}
                                onChange={handleCardNumberChange}
                                maxLength={cardType === "Amex" ? 18 : 19}
                              />
                            </div>
                            {cardNumberError && (
                              <div className="error-message text-danger" style={{marginTop:'1rem'}}>
                                {cardNumberError}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="col-lg-4 col-user">
                          <label>Expiration Date</label>

                          <div className="row">
                            <div className="form-group col-md-6">
                              <div className="sub-wrap-icon">
                                <select
                                required
                                  className="form-select form-control mycontrol-icon-no"
                                  name="expirationMonth" // Use "expirationMonth" as the name
                                  value={formDataCard.expirationMonth} // Make sure to use the correct value from your state
                                  onChange={handleChange}
                                  id="monthSelect"
                                >
                                  <option value="">Month</option>
                                  {generateMonthOptions()}
                                </select>
                                <i className="bi bi-caret-down"></i>{" "}
                              </div>
                            </div>
                            <div className="form-group col-md-6">
                              {/* <label></label> */}
                              <div className="sub-wrap-icon">
                                <select
                                required
                                  className="form-select form-control custom-select-dimensions mycontrol-icon-no"
                                  name="expirationYear" // Use "expirationYear" as the name
                                  value={formDataCard.expirationYear} // Make sure to use the correct value from your state
                                  onChange={handleChange}
                                  id="yearSelect"
                                >
                                  <option className="custom-select-sm" value="">
                                    Year
                                  </option>
                                  {generateYearOptions()}
                                </select>
                                <i className="bi bi-caret-down"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                        {/* <div className="col-lg-2 col-user">
                        
                      </div> */}
                        <div className="col-lg-2 col-user">
                          <div className="form-group">
                            <label>CVV</label>
                            <div className="sub-wrap-icon">
                              <input
                                type="text"
                                required
                                className="form-control mycontrol-icon-no"
                                name="cvv"
                                value={formDataCard.cvv}
                                onChange={handleCvvChange}
                                maxLength={cardType === "Amex" ? 4 : 3}
                                data-parsley-required="true"
    data-parsley-errors-container="#error-container"
                              />
                            </div>
                            {cvvError && (
                              <div className="error-message text-danger" style={{marginTop:'1rem'}}>
                                {cvvError}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="col-lg col-user">
                          <div className="form-group">
                            <label>Card Type</label>
                            <div className="sub-wrap-icon">
                            <input
  type="text"
  className="form-control mycontrol-icon-no"
  name="cardType"
  value={formDataCard.cardType}
  // maxLength={4}
  data-parsley-maxlength="false"
  readOnly
/>

                            </div>
                          </div>
                        </div>
                        <div className="col-md-12 mt-5">
                          <img
                            src="images/payicon.png"
                            className="img-fluid payicon"
                            alt="Payment Icon"
                          />
                        </div>
                      </div>
                    </div>
                    {/* below code of card info end */}
                    <div className="row card-row">
                      <div className="sub-wrap-h">
                        <div className="submit-heading">
                          <p>Billing Information (Card Holder)</p>
                        </div>
                      </div>
                    </div>
                    {/* below code of bill info        */}
                    <div className="row">
                      <div className="col-lg-4 col-user">
                        <div className="form-group">
                          <label>Country:</label>
                          <div className="sub-wrap-icon">
                            <select
                              onChange={handleCountry}
                              className="form-select form-control mycontrol-icon-no"
                              value={selectedCountry}
                              name="country"
                              required
                            >
                              {/* <option value="Select Country">-- Select Country --</option> */}
                              {country.map((item) => (
                                <option key={item} value={item}>
                                  {item}
                                </option>
                              ))}
                            </select>
                            <i className="bi bi-caret-down"></i>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-user">
                        <div className="form-group">
                          <label>State:</label>
                          <div className="sub-wrap-icon">
                            <select
                              onChange={handleChangeBillingCard}
                              className="form-select form-control mycontrol-icon-no"
                              value={formDataBillingCard.state}
                              name="state"
                              required
                            >
                              <option value="">-- Select State --</option>
                              {states.map((item) => (
                                <option key={item} value={item}>
                                  {item}
                                </option>
                              ))}
                            </select>
                            <i className="bi bi-caret-down"></i>
                          </div>
                        </div>
                      </div>
                      {/* Add more form inputs */}
                      <div className="col-lg-4 col-user">
                        <div className="form-group">
                          <label>City:</label>
                          <div className="sub-wrap-icon">
                            <input
                              className="form-control mycontrol-icon-no"
                              name="city"
                              autocomplete="off"
                              required
                              value={formDataBillingCard.city}
                              onChange={handleChangeBillingCard}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-user">
                        <div className="form-group">
                          <label>Billing Address</label>
                          <div className="sub-wrap-icon">
                            <input
                              className="form-control mycontrol-icon-no"
                              name="billingAddress"
                              value={formDataBillingCard.billingAddress}
                              onChange={handleChangeBillingCard}
                              required
                              autocomplete="off"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-6 col-user">
                        <div className="form-group">
                          <label>Zip/Postal Code:*</label>
                          <div className="sub-wrap-icon">
                            <input
                              className="form-control mycontrol-icon-no"
                              name="postalCode"
                              value={formDataBillingCard.postalCode}
                              onChange={handleChangeBillingCard}
                              required
                              autocomplete="off"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="booking_tour_form_submit">
                    <div className="form-check write_spical_check">
                    <div className="d-flex align-items-center">
                    <input
        className="form-check-input"
        type="checkbox"
        checked={isCheck}
        onChange={handleCheckChange}
        id="flexCheckDefaultf1"
      />

                      <label
                        className="form-check-label-d"
                        htmlFor="flexCheckDefaultf1"
                      >&nbsp;
                        By checking the box, you agree to our <Link to="/terms-condition">
                          Terms and conditios
                        </Link>
                      </label> 
                      <button
        type="submit"
        className="btn btn_theme-sec btn_md-sec"
        disabled={!isCheck || isLoading} // Disable the button if isCheck is false or if loading
      >
        {isLoading ? 'Submitting...' : 'Confirm Booking'}
      </button>
                    </div>
                      
                      <div>
                        <h4 className="note">
                          *Note:- Please check the "Terms and Conditions"
                        </h4>
                        <p>
                          It is important that the billing address and phone
                          number you provide are the address and phone number
                          that your credit card company has on file for you. We
                          will not be able to process your order if the
                          information provided does not match. Most tickets are
                          E-Tickets and will be issued as E-Tickets whenever
                          possible All ticket purchases are final and cannot be
                          cancelled.
                        </p>
                        <p>
                          All ticket purchases are non-refundable,
                          non-exchangeable and non- transferable.
                        </p>
                        <p>
                          Usually ticket exchanges once they are issued can not
                          be made and will always incur substantial penalties,
                          which may exceed the original cost of the ticket
                          purchased. Please contact us for any assistance In
                          some cases tickets do not qualify for frequent flyer
                          mileage accrual or upgrades. Please check with
                          individual Airline for details Seat assignments can be
                          arranged through our service center or contacting the
                          airlines directly or will be made at the airport on
                          the day of departure.
                        </p>
                        <p>
                          If this is an international trip, special travel
                          documentation like visa may be required for each
                          traveler. You are solely responsible for any and all
                          such documentation.
                        </p>
                      </div>
                    </div>
                    

                  </div>
                </div>
              </form>
            </div>
            <div className="col-lg-3 sub-total-sidebar">
              <div className="tour_details_right_sidebar_wrapper">
                <div className="tour_detail_right_sidebar">
                  <div className="tour_details_right_boxed">
                    <div className="tour_details_right_box_heading">
                      <h3>Fare Details</h3>
                    </div>
                    <div className="tour_booking_amount_area">
                      {Object.keys(travelerTypeCounts).map((travelerType) => (
                        <div key={travelerType}>
                          <ul>
                            <li>
                            {travelerType === "HELD_INFANT" ? "INFANT" : travelerType} x{" "}                              {travelerTypeCounts[travelerType]}{" "}
                              <span>
                                {(
                                  travelerTypeTotals[travelerType] * 0.72
                                ).toFixed(2)}
                              </span>
                            </li>
                            <li>
                              Tax{" "}
                              <span>
                                USD{" "}
                                {(
                                  travelerTypeTotals[travelerType] * 0.28
                                ).toFixed(2)}
                              </span>
                            </li>
                          </ul>
                        </div>
                      ))}

                      <div className="total_subtotal_booking">
                        <h6>
                          Total Amount{" "}
                          <span className="priceshow">
                            USD{" "}
                            {
                              totalAmounts !== 0
                                ? totalAmounts.toFixed(2) // Format to two decimal places
                                : totalAmount.toFixed(2) // Also format fullTotal to two decimal places
                            }
                          </span>
                        </h6>
                        {/* <h6>
                          Total Amount{" "}
                          <span className="priceshow">
                            USD{" "}
                            {totalAmounts !== null ? totalAmount.toFixed(2) : fullTotal.toFixed(2)}
                          </span>
                        </h6> */}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default FlightSubmit;
