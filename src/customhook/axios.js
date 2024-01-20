import React, { useState, useEffect } from "react";
import axios from "axios";
import useDataFetcherWithToken from "./useDataFetch";
import $ from "jquery";
import "jquery-ui/ui/widgets/datepicker";
import { useNavigate } from "react-router-dom";

function MyComponent() {
  //// new code of form of date

  //// code of form of data end
  // passenger code
  const [count, setCount] = useState({
    adults: 1,
    children: 0,
    senior: 0,
    infant: 0,
  });

  function inputPlus(field) {
    if (count[field] < 9) {
      setCount((prevCount) => ({
        ...prevCount,
        [field]: prevCount[field] + 1,
      }));
    }
  }

  function inputMinus(field) {
    if (field === "adults" && count[field] > 1) {
      setCount((prevCount) => ({
        ...prevCount,
        [field]: prevCount[field] - 1,
      }));
    } else if (field !== "adults" && count[field] > 0) {
      setCount((prevCount) => ({
        ...prevCount,
        [field]: prevCount[field] - 1,
      }));
    }
  }
  // Calculate the total count
  const totalCount =
    count.adults + count.children + count.senior + count.infant;
  // //passenger end code

  const { accessToken, isLoading, error } = useDataFetcherWithToken();
  const [originApiData, setOriginApiData] = useState([]); // State variable to hold API data
  const [destinationApiData, setDestinationApiData] = useState([]); // State variable to hold API data
  const [originApiDataMulti, setOriginApiDataMulti] = useState([]); // State variable to hold API data
  const [destinationApiDataMulti, setDestinationApiDataMulti] = useState([]); // State variable to hold API data

  const [isOptionSelected, setIsOptionSelected] = useState(false);
  const [isOptionSelectedMulti, setIsOptionSelectedMulti] = useState(false);
  //// form span tag data origin or destination
  const [selectedLocation_Ori, setSelectedLocation_Ori] = useState(null);
  const [selectedLocation_Des, setSelectedLocation_Des] = useState(null);
  const [selectedLocation_OriMulti, setSelectedLocation_OriMulti] = useState(null);
  const [selectedLocation_DesMulti, setSelectedLocation_DesMulti] = useState(null);
  //// below code of don't show data of fetch when user work with orgin same as destination
  const [showOriginOptions, setShowOriginOptions] = useState(false);
  const [showOriginOptionsMulti, setShowOriginOptionsMulti] = useState(false);
  const [showDestinationOptions, setShowDestinationOptions] = useState(false);
  const [showDestinationOptionsMulti, setShowDestinationOptionsMulti] = useState(false);

  const [updatedCity, setUpdatedCity] = useState([]);
  const [updatedCityMulti, setUpdatedCityMulti] = useState([]);
  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${year}-${month}-${date}`;
  }
  function getDate1() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate() + 1;
    return `${year}-${month}-${date}`;
  }
  const initialDetails = {
    origin: "",
    destination: "",
    from: getDate(),
    to: getDate1(),
    passenger: totalCount,
    cabin: "ECONOMY",
  };

  const [multiCityDetails, setMultiCityDetails] = useState([
    { ...initialDetails }, // Initial form for multicity
    { ...initialDetails }, // Initial form for multicity
  ]);

  // Create the state using the initialDetails
  const [details, setDetails] = useState(initialDetails);
  const [detailsMulti, setDetailsMulti] = useState(initialDetails);

  // Update details state whenever the passenger count changes
  useEffect(() => {
    setDetails((prevDetails) => ({
      ...prevDetails,
      passengerData: {
        adults: count.adults + count.senior,
        children: count.children,
        // senior: count.senior,
        infant: count.infant,
      },
    }));
    setDetailsMulti((prevDetails) => ({
      ...prevDetails,
      passengerData: {
        adults: count.adults + count.senior,
        children: count.children,
        // senior: count.senior,
        infant: count.infant,
      },
    }));
    
    setUpdatedCity((prevDetails) => ({
      ...prevDetails,
      passengerData: {
        adults: count.adults + count.senior,
        children: count.children,
        // senior: count.senior,
        infant: count.infant,
      },
    }));
    setUpdatedCityMulti((prevDetails) => ({
      ...prevDetails,
      passengerData: {
        adults: count.adults + count.senior,
        children: count.children,
        // senior: count.senior,
        infant: count.infant,
      },
    }));
  }, [count]);

  useEffect(() => {
    function formatDate(date) {
      var month = (date.getMonth() + 1).toString().padStart(2, "0");
      var day = date.getDate().toString().padStart(2, "0");
      var year = date.getFullYear();
      return `${month}-${day}-${year}`;
    }

    const initializeDatepicker = (inputId, dayId, relatedInputId) => {
      var currentDate = new Date();
      var currentDateValue = formatDate(currentDate);
      $(inputId).val(currentDateValue);

      $(inputId).datepicker({
        dateFormat: "mm-dd-yy",
        minDate: 0,
        maxDate: "+330D",
        onSelect: function (selectedDate, instance) {
          console.log("instance :", instance);
          var selectedDay = new Date(selectedDate);

          var day = daysOfWeek[selectedDay.getDay()];
          $(dayId).text(day);
          // Update the state based on the input field's name
          let name = "from";
          let value = "";
          // Reformatting selectedDate to match the 'yyyy-mm-dd' format expected by the 'from' property
          const [mont, da, yea] = selectedDate.split("-");
          value = `${yea}-${mont}-${da}`;

          const [m, d, y] = selectedDate.split("-");
          const fromValue = `${y}-${m}-${d}`;
          setDetails((prevDetails) => ({
            ...prevDetails,
            from: fromValue,
          }));

          // Update the state based on the 'name' variable
          const nextDay = new Date(selectedDay);
          nextDay.setDate(selectedDay.getDate() + 1);

          const nextDayFormatted = formatDate(nextDay); // Format next day as needed
          $("#dateInputnexts").val(nextDayFormatted); // Set 'to' date input value

          $(relatedInputId).val(nextDayFormatted);

          // Update 'to' date in state
          const [mTo, dTo, yTo] = nextDayFormatted.split("-");
          const toValue = `${yTo}-${mTo}-${dTo}`;
          setDetails((prevDetails) => ({
            ...prevDetails,
            to: toValue,
          }));

          $("#dateInputnexts").datepicker(
            "option",
            "beforeShowDay",
            function (date) {
              return date < nextDay ? [false] : [true];
            }
          );
          console.log(details, "check calender data", value);
        },
      });
    };

    initializeDatepicker("#dateInput", "#departureDay");
    initializeDatepicker("#dateInputnext", "#arrivalDay");

    // below code of multiCity form datepiker
    var daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];

    // Calculate the next day
    var nextDate = new Date();
    nextDate.setDate(nextDate.getDate() + 1); // Get the next day
    var nextDateValue = formatDate(nextDate);

    $("#dateInputnexts").val(nextDateValue); // Set the initial value for the 'from' datepicker
    $("#arrivalDays").text(daysOfWeek[nextDate.getDay()]); // Display the day for the 'from' datepicker

    $("#dateInputnexts").datepicker({
      dateFormat: "mm-dd-yy",
      minDate: 0,
      maxDate: "+330D",
      onSelect: function (selectedDate) {
        var selectedDay = new Date(selectedDate);
        var day = daysOfWeek[selectedDay.getDay()];
        $("#arrivalDays").text(day);

        // Convert selectedDate to 'yy-mm-dd' format
        var formattedDate = $.datepicker.formatDate(
          "yy-mm-dd",
          new Date(selectedDate)
        );

        // Update state 'details' with the selected date for 'to' in 'yy-mm-dd' format
        setDetails((prevDetails) => ({
          ...prevDetails,
          to: formattedDate,
        }));
      },
    });

    $("#dateInputnextm").datepicker({
      dateFormat: "mm-dd-yy",
      minDate: 0,
      maxDate: "+330D",
      onSelect: function (selectedDate) {
        var selectedDay = new Date(selectedDate);
    
        const formattedDate = selectedDay.toLocaleDateString('en-CA'); 
        setDetails((prevDetails) => ({
          ...prevDetails,
          from: formattedDate,
        }));
    
        // Calculate the next day
        const nextDay = new Date(selectedDay);
        nextDay.setDate(selectedDay.getDate() + 1); // Get the next day
        const nextDayFormatted = $.datepicker.formatDate("mm-dd-yy", nextDay);
    
        $("#dateInputnextmm")
          .val(nextDayFormatted)
          .datepicker("setDate", nextDayFormatted);
    
        $("#dateInputnextmm").datepicker(
          "option",
          "beforeShowDay",
          function (date) {
            return date < nextDay ? [false] : [true];
          }
        );
    
        // Check if 'to' date is already set in setDetails, if not, set the default value to 1 day ahead
        const toDay = new Date(nextDay);
        const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
        const toDayFormatted = toDay.toLocaleDateString('en-CA', options);
        setDetails((prevDetails) => ({
          ...prevDetails,
          to: toDayFormatted,
        }));
        
      },
    });
    
    $("#dateInputnextmm").datepicker({
      dateFormat: "mm-dd-yy",
      minDate: 0,
      maxDate: "+330D",
      defaultDate: +1, // Set the default date as 1 day ahead
      onSelect: function (selectedDate) {
        var selectedDay = new Date(selectedDate);
        var day = daysOfWeek[selectedDay.getDay()];
    
        const formattedDate = selectedDay.toLocaleDateString('en-CA'); 
        setDetails((prevDetails) => ({
          ...prevDetails,
          to: formattedDate,
        }));
      },
    });
    

    initializeDatepicker("#dateInputnextm", "#departureDays");
    initializeDatepicker("#dateInputnextmm", "#arrivalDaysNextMM");

    var currentDate = new Date();
    var currentNextDayForNextMM = new Date();
    currentNextDayForNextMM.setDate(currentDate.getDate() + 1); // Get the current next day
    var currentNextDayForNextMMValue = formatDate(currentNextDayForNextMM);

    $("#dateInputnextmm")
      .val(currentNextDayForNextMMValue)
      .datepicker("setDate", currentNextDayForNextMMValue);
  }, []);

  const sendData = () => {
    const passengerData = details.passengerData;

    // You can use passengerData in your API request or form submission
    console.log("Passenger Data:", passengerData);

    // Perform your API request or form submission here
    // ...
  };

  const navigate = useNavigate();

  console.log(originApiData);
  const stateHandler = (e) => {
    const { name, value } = e.target;

    // Update the state based on the input field's name
    setDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const stateHandlerCabin = (cabin) => {
    // Update the state with the selected cabin class
    setDetails((prevDetails) => ({
      ...prevDetails,
      cabin: cabin,
    }));
  };

  const handleSubmit = (e, tripType) => {
    e.preventDefault();
    let tripDetails = { ...details };

    if (tripType === "oneWay") {
      // For one-way trip, remove destination field
      const { to, ...oneWayDetails } = tripDetails;
      tripDetails = oneWayDetails;
    }

    const airportorigin = originApiData;
    const airportdestination = destinationApiData;

    // Log the user-selected data and API data
    console.log(`User-Selected Data (${tripType}):`, tripDetails);
    navigate("/flightresult", { state: { details: tripDetails, tripType, airportorigin, airportdestination } });
  };
  
  const handleSubmits = (e, tripType) => {
    e.preventDefault();
  
    // Assuming updatedCity contains the necessary trip details
    let tripDetails = {
      origin: details.origin,
      destination: details.destination,
      from: details.from,
      to: details.to,
      // passenger: details.passenger,
      cabin: details.cabin,
      // Add other fields similarly
    };
  
    let tripDetailsMulti = {
      origin: detailsMulti.origin,
      destination: detailsMulti.destination,
      // from: detailsMulti.from,
      // to: detailsMulti.to,
      // passenger: detailsMulti.passenger,
      // cabin: detailsMulti.cabin,
      // Add other fields similarly
    };

    let tripDetailsPassenger = { ...updatedCity };
      // For one-way trip, remove destination field
      const { to, ...multiCityDetails } = tripDetailsPassenger;
      tripDetailsPassenger = multiCityDetails;
  
    // Create an array to hold all the trip details
    let allTripDetails = [];
  
    if (tripType === 'multicity') {
      allTripDetails.push(tripDetails, tripDetailsMulti);
    } else {
      allTripDetails.push(tripDetails);
    }
  
    // Log the user-selected data and API data
    console.log(`User-Selected Data (${tripType}):`, allTripDetails);
  
    // Navigate to the next page with the trip details
    navigate('/flightmulticity', {
      state: { allTripDetails, tripType, tripDetailsPassenger }, // Pass allTripDetails and tripType to the next route
    });
    
  };

  // const handleSubmits = (e, tripType) => {
  //   e.preventDefault();
  
  //     let tripDetails = { ...updatedCity };
  //     // For one-way trip, remove destination field
  //     const { to, ...multiCityDetails } = tripDetails;
  //     tripDetails = multiCityDetails;
  
  
  //   // Log the user-selected data and API data
  //   console.log(`User-Selected Data (${tripType}):`, tripDetails);
  //   navigate("/flightmulticity", { state: { details: [tripDetails, tripType] } });
  // };
  
  

 
  useEffect(() => {
    if (isLoading || !accessToken) {
      return;
    }
  
    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };
  
    const fetchLocations = async () => {
      try {
        if (details.origin) {
          const originApiUrl = `https://api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${details.origin}`;
  
          const originResponse = await axios.get(originApiUrl, { headers });
          const originLocations = originResponse.data.data;

          console.log('axios data ddddddddddddddddnnnnnnnnnnnnnnnnnn', originResponse)
  
          console.log("Origin location API:", originLocations);
          setOriginApiData(originLocations);
        }
  
        if (details.destination) {
          const destinationApiUrl = `https://api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${details.destination}`;
  
          const destinationResponse = await axios.get(destinationApiUrl, { headers });
          const destinationLocations = destinationResponse.data.data;
  
          console.log("Destination location API:", destinationLocations);
          setDestinationApiData(destinationLocations);
        }
  
        if (detailsMulti.origin) {
          const originApiUrlMulti = `https://api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${detailsMulti.origin}`;
  
          const originResponseMulti = await axios.get(originApiUrlMulti, { headers });
          const originLocationsMulti = originResponseMulti.data.data;
  
          console.log("Origin location API (Multi):", originLocationsMulti);
          setOriginApiDataMulti(originLocationsMulti);
        }
  
        if (detailsMulti.destination) {
          const destinationApiUrlMulti = `https://api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${detailsMulti.destination}`;
  
          const destinationResponseMulti = await axios.get(destinationApiUrlMulti, { headers });
          const destinationLocationsMulti = destinationResponseMulti.data.data;
  
          console.log("Destination location API (Multi):", destinationLocationsMulti);
          setDestinationApiDataMulti(destinationLocationsMulti);
        }
      } catch (error) {
        console.error("API Error:", error);
        // Handle errors here
      }
    };
  
    fetchLocations();
  }, [accessToken, isLoading, details, detailsMulti]);
  
  


  // const [selectedCityCode, setSelectedCityCode] = useState('');
  const handleOriginChange = (e) => {
    setShowOriginOptions(true);
    setShowDestinationOptions(false);
    const { name, value } = e.target;
    const uppercaseValue = value.toUpperCase();
    setDetails({ ...details, [name]: uppercaseValue });
    setIsOptionSelected(false);
    setSelectedLocation_Ori(null); // Reset selected location when typing in the input
  };
  const handleOriginChangeMulti = (e) => {
    setShowOriginOptionsMulti(true);
    setShowDestinationOptionsMulti(false);
    const { name, value } = e.target;
    const uppercaseValue = value.toUpperCase();
    setDetailsMulti({ ...detailsMulti, [name]: uppercaseValue });
    setIsOptionSelectedMulti(false);
    setSelectedLocation_OriMulti(null); // Reset selected location when typing in the input
  };

 

  const handleDestinationChange = (e) => {
    setShowDestinationOptions(true);
    setShowOriginOptions(false);
    const { name, value } = e.target;
    const uppercaseValue = value.toUpperCase();
    setDetails({ ...details, [name]: uppercaseValue });
    setIsOptionSelected(false);
    setSelectedLocation_Des(null);
  };
   const handleDestinationChangeMulti = (e) => {
    setShowDestinationOptionsMulti(true);
    setShowOriginOptionsMulti(false);
    const { name, value } = e.target;
    const uppercaseValue = value.toUpperCase();
    setDetailsMulti({ ...detailsMulti, [name]: uppercaseValue });
    setIsOptionSelectedMulti(false);
    setSelectedLocation_DesMulti(null);
  };

  const handleSelectOrigin = (cityCode) => {
    setDetails({ ...details, origin: cityCode });
    setOriginApiData([]); // Reset the originApiData to clear the displayed data
    setIsOptionSelected(true);
    let selectedLocation_Ori = originApiData.find(
      (location) => location.iataCode
    );
    setSelectedLocation_Ori(selectedLocation_Ori);
  };
  const handleSelectOriginMulti = (cityCode) => {
    setDetailsMulti({ ...detailsMulti, origin: cityCode });
    setOriginApiDataMulti([]); // Reset the originApiData to clear the displayed data
    setIsOptionSelectedMulti(true);
    let selectedLocation_OriMulti = originApiDataMulti.find(
      (location) => location.iataCode
    );
    setSelectedLocation_OriMulti(selectedLocation_OriMulti);
  };

  const handleSelectDestination = (cityCode) => {
    setDetails({ ...details, destination: cityCode });
    setDestinationApiData([]); // Reset the originApiData to clear the displayed data
    setIsOptionSelected(true);
    let selectedLocation_Des = destinationApiData.find(
      (location) => location.iataCode
    );
    setSelectedLocation_Des(selectedLocation_Des);
    //// form span tag data origin or destination
  };
  const handleSelectDestinationMulti = (cityCode) => {
    setDetailsMulti({ ...detailsMulti, destination: cityCode });
    setDestinationApiDataMulti([]); // Reset the originApiData to clear the displayed data
    setIsOptionSelectedMulti(true);
    let selectedLocation_DesMulti = destinationApiDataMulti.find(
      (location) => location.iataCode
    );
    setSelectedLocation_DesMulti(selectedLocation_DesMulti);
    //// form span tag data origin or destination
  };
  //// end code
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    setMultiCityDetails((prevState) => {
      const updatedDetails = prevState.map((city, i) => {
        if (i === index) {
          const updatedCity = { ...city, [name]: value.toUpperCase() };

          console.log("Updated City:", updatedCity); // Log the updated city
          return updatedCity;
        }
        return city;
      });
      setUpdatedCity(updatedDetails);
      setUpdatedCityMulti(updatedDetails);
      console.log("use State", updatedCity);
      console.log("Updated Details:", updatedDetails); // Log the entire updated details array
      return updatedDetails;
    });
  };

  return (
    <div>
      {/* <section id="theme_search_form"> */}
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="theme_search_form_area">
                
                <div className="tab-content" id="myTabContent">
                  <div
                    className="tab-pane fade show active"
                    id="flights"
                    role="tabpanel"
                    aria-labelledby="flights-tab"
                  >
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="flight_categories_search-n">
                          <ul className="nav nav-tabs" role="tablist">
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link  my-f-link active"
                                id="roundtrip-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#roundtrip"
                                type="button"
                                role="tab"
                                aria-controls="roundtrip"
                                aria-selected="false"
                              >
                                Roundtrip
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link  my-f-link"
                                id="oneway-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#oneway_flight"
                                type="button"
                                role="tab"
                                aria-controls="oneway_flight"
                                aria-selected="true"
                              >
                                One Way
                              </button>
                            </li>
                            <li className="nav-item" role="presentation">
                              <button
                                className="nav-link  my-f-link"
                                id="multi_city-tab"
                                data-bs-toggle="tab"
                                data-bs-target="#multi_city"
                                type="button"
                                role="tab"
                                aria-controls="multi_city"
                                aria-selected="false"
                              >
                                Multi city
                              </button>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div className="tab-content" id="myTabContent1">
                      <div
                        className="tab-pane fade show active"
                        id="roundtrip"
                        role="tabpanel"
                        aria-labelledby="roundtrip-tab"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="oneway_search_form">
                              <form
                                onSubmit={(e) => handleSubmit(e, "roundTrip")}
                              >
                                <div className="row align-items-center gx-1">
                                  <div className="col-lg-2">
                                    <div className="flight_Search_boxed">
                                      {/* <p>From</p> */}
                                      <div>
                                        <input
                                          type="text"
                                          placeholder="Origin"
                                          name="origin"
                                          value={
                                            selectedLocation_Ori
                                              ? `${selectedLocation_Ori.iataCode}, ${selectedLocation_Ori.address.cityName}, ${selectedLocation_Ori.address.countryName}, ${selectedLocation_Ori.name}`
                                              : details.origin
                                          }
                                          onChange={handleOriginChange}
                                          onClick={() =>
                                            setDetails({
                                              ...details,
                                              origin: "",
                                            })
                                          } // Clear input when clicked for modification
                                          className="searchInput fOrigin"
                                          autoFocus
                                          autocomplete="off"
                                          required
                                        />

                                        {showOriginOptions &&
                                          details.origin.trim() !== "" &&
                                          !isOptionSelected && (
                                            <>
                                              {originApiData.length > 0 ? (
                                                <ul className="searchUlForm">
                                                  {isLoading ? (
                                                    <p>Loading...</p>
                                                  ) : error ? (
                                                    <p className="text-white">
                                                      Error: {error.message}
                                                    </p>
                                                  ) : (
                                                    originApiData.map(
                                                      (location) => (
                                                        <li
                                                          className="searchLi d-flex align-items-center"
                                                          key={location.id}
                                                          onClick={() =>
                                                            handleSelectOrigin(
                                                              location.iataCode
                                                            )
                                                          }
                                                        >
                                                          <i className="fas fa-plane-departure"></i>
                                                          &nbsp;&nbsp;
                                                          <span
                                                            style={{
                                                              cursor: "pointer",
                                                            }}
                                                          >
                                                            ({location.iataCode}
                                                            )
                                                            {
                                                              location.address
                                                                .cityName
                                                            }
                                                            ,{" "}
                                                            {
                                                              location.address
                                                                .countryName
                                                            }
                                                            <br />
                                                            {location.name}
                                                          </span>
                                                        </li>
                                                      )
                                                    )
                                                  )}
                                                </ul>
                                              ) : null}
                                            </>
                                          )}
                                      </div>

                                      <div className="plan_icon_posation">
                                        <i className="fas fa-plane-departure" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-2">
                                    <div className="flight_Search_boxed">
                                      {/* <p>To</p> */}
                                      <div>
                                        <input
                                          type="text"
                                          placeholder="Destination"
                                          name="destination"
                                          onChange={handleDestinationChange}
                                          value={
                                            selectedLocation_Des
                                              ? `${selectedLocation_Des.iataCode}, ${selectedLocation_Des.address.cityName}, ${selectedLocation_Des.address.countryName}, ${selectedLocation_Des.name}`
                                              : details.destination
                                          }
                                          onClick={() =>
                                            setDetails({
                                              ...details,
                                              destination: "",
                                            })
                                          }
                                          className="searchInput"
                                          required
                                          autocomplete="off"
                                        />

                                        {showDestinationOptions &&
                                          details.destination.trim() !== "" &&
                                          !isOptionSelected && (
                                            <>
                                              {destinationApiData.length > 0 ? (
                                                <ul className="searchUlForm">
                                                  {isLoading ? (
                                                    <p>Loading...</p>
                                                  ) : error ? (
                                                    <p>
                                                      Error: {error.message}
                                                    </p>
                                                  ) : (
                                                    destinationApiData.map(
                                                      (location) => (
                                                        <li
                                                          className="searchLi d-flex align-items-center"
                                                          key={location.id}
                                                          onClick={() =>
                                                            handleSelectDestination(
                                                              location.iataCode
                                                            )
                                                          }
                                                        >
                                                          <i className="fas fa-plane-arrival"></i>
                                                          &nbsp;&nbsp;
                                                          <span
                                                            style={{
                                                              cursor: "pointer",
                                                            }}
                                                          >
                                                            ({location.iataCode}
                                                            )
                                                            {
                                                              location.address
                                                                .cityName
                                                            }
                                                            ,{" "}
                                                            {
                                                              location.address
                                                                .countryName
                                                            }
                                                            <br />
                                                            {location.name}
                                                          </span>
                                                        </li>
                                                      )
                                                    )
                                                  )}
                                                </ul>
                                              ) : null}
                                            </>
                                          )}
                                      </div>

                                      <div className="plan_icon_posation">
                                        <i className="fas fa-plane-arrival" />
                                      </div>
                                      <div className="range_plan">
                                        {/* <i className="fas fa-exchange-alt" /> */}
                                      </div>
                                    </div>
                                  </div>
                                  {/* <div className=""> */}
                                  <div className="form_search_date col-lg-2">
                                    <div className="flight_Search_boxed date_flex_area">
                                      <div className="Journey_date">
                                        {/* <p>Departure</p> */}
                                        <div style={{ position: "relative" }}>
                                          <input
                                            // type="date"
                                            name="form"
                                            defaultValue=""
                                            id="dateInput"
                                            onChange={stateHandler}
                                          />
                                          <label htmlFor="dateInput">
                                            <i
                                              className="fa-solid fa-calendar-days calendar-icon"
                                              id="calendarIcon"
                                            ></i>
                                          </label>
                                        </div>
                                        {/* <span id="departureDay" /> */}
                                      </div>
                                    </div>
                                    {/* p */}
                                  </div>
                                  <div className="form_search_date col-lg-2">
                                    <div className="flight_Search_boxed date_flex_area">
                                      <div className="Journey_date">
                                        {/* <p>Arrival</p> */}
                                        <div style={{ position: "relative" }}>
                                          <input
                                            // type="date"
                                            name="to"
                                            defaultValue=""
                                            id="dateInputnexts"
                                            onChange={stateHandler}
                                          />
                                          <label htmlFor="dateInputnexts">
                                            <i
                                              className="fa-solid fa-calendar-days calendar-icon"
                                              id="calendarIcon"
                                            ></i>
                                          </label>
                                        </div>
                                        {/* <span id="arrivalDays" /> */}
                                      </div>
                                    </div>
                                    {/* p */}
                                  </div>
                                  {/* </div> */}
                                  <div className="col-lg-2">
                                    <div className="flight_Search_boxed dropdown_passenger_area">
                                      {/* <p>Passenger</p> */}
                                      <div className="dropdown">
                                        <button
                                          className="dropdown-toggle final-count"
                                          data-toggle="dropdown"
                                          type="button"
                                          id="dropdownMenuButton1"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          {totalCount} Passenger
                                        </button>
                                        {/* default value 1 rkhna h */}
                                        <div
                                          className="dropdown-menu dropdown_passenger_info"
                                          aria-labelledby="dropdownMenuButton1"
                                        >
                                          <div className="traveller-calulate-persons">
                                            <div className="passengers">
                                              <h6>Passengers</h6>
                                              <div className="passengers-types">
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    <span className="count pcount">
                                                      {count.adults}
                                                    </span>
                                                    <div className="type-label">
                                                      <p>Adult</p>
                                                      <span>12+ yrs</span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-subtract"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        inputMinus("adults");
                                                        sendData();
                                                      }}
                                                    >
                                                      <i className="fas fa-minus" />
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn-add"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        inputPlus("adults");
                                                        sendData();
                                                      }}
                                                    >
                                                      <i className="fas fa-plus" />
                                                    </button>
                                                  </div>
                                                </div>
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    <span className="count ccount">
                                                      {count.children}
                                                    </span>
                                                    <div className="type-label">
                                                      <p className="fz14 mb-xs-0">
                                                        Children
                                                      </p>
                                                      <span>
                                                        2 - Less than 12 yrs
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-subtract-c"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        inputMinus("children");
                                                        sendData();
                                                      }}
                                                    >
                                                      <i className="fas fa-minus" />
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn-add-c"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        inputPlus("children");
                                                        sendData();
                                                      }}
                                                    >
                                                      <i className="fas fa-plus" />
                                                    </button>
                                                  </div>
                                                </div>
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    <span className="count incount">
                                                      {count.senior}
                                                    </span>
                                                    <div className="type-label">
                                                      <p className="fz14 mb-xs-0">
                                                        Senior
                                                      </p>
                                                      <span>65+ yrs </span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-subtract-in"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        inputMinus("senior");
                                                        sendData();
                                                      }}
                                                    >
                                                      <i className="fas fa-minus" />
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn-add-in"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        inputPlus("senior");
                                                        sendData();
                                                      }}
                                                    >
                                                      <i className="fas fa-plus" />
                                                    </button>
                                                  </div>
                                                </div>

                                                <div className="passengers-type">
                                                  <div className="text">
                                                    <span className="count incount">
                                                      {count.infant}
                                                    </span>
                                                    <div className="type-label">
                                                      <p className="fz14 mb-xs-0">
                                                        Infant
                                                      </p>
                                                      <span>
                                                        Less than 2 yrs
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-subtract-in"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        inputMinus("infant");
                                                        sendData();
                                                      }}
                                                    >
                                                      <i className="fas fa-minus" />
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn-add-in"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        inputPlus("infant");
                                                        sendData();
                                                      }}
                                                    >
                                                      <i className="fas fa-plus" />
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="cabin-selection">
                                              <h6 className="mb-2">
                                                Cabin Class
                                              </h6>
                                              <div className="cabin-list">
                                                <button
                                                  type="button"
                                                  className={`label-select-btn ${
                                                    details.cabin === "Economy"
                                                      ? "selected"
                                                      : ""
                                                  }`}
                                                  onClick={() =>
                                                    stateHandlerCabin("ECONOMY")
                                                  }
                                                >
                                                  <span className="muiButton-label">
                                                    Economy
                                                  </span>
                                                </button>
                                                <button
                                                  type="button"
                                                  className={`label-select-btn ${
                                                    details.cabin === "Business"
                                                      ? "selected"
                                                      : ""
                                                  }`}
                                                  onClick={() =>
                                                    stateHandlerCabin(
                                                      "BUSINESS"
                                                    )
                                                  }
                                                >
                                                  <span className="muiButton-label">
                                                    Business
                                                  </span>
                                                </button>
                                                <button
                                                  type="button"
                                                  className={`label-select-btn ${
                                                    details.cabin ===
                                                    "First Class"
                                                      ? "selected"
                                                      : ""
                                                  }`}
                                                  onClick={() =>
                                                    stateHandlerCabin("FIRST")
                                                  }
                                                >
                                                  <span className="muiButton-label">
                                                    First Class
                                                  </span>
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      {/* <span>{details.cabin}</span> */}
                                    </div>
                                  </div>
                                  <div className="col-lg-2">
                                    <div className="top_form_search_button-search-c">
                                      <button
                                        type="submit"
                                        className="btn btn_theme btn_md"
                                      >
                                        Search
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="oneway_flight"
                        role="tabpanel"
                        aria-labelledby="oneway-tab"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="oneway_search_form">
                              <form onSubmit={(e) => handleSubmit(e, "oneWay")}>
                                <div className="row gx-1">
                                  <div className="col-lg-3  col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed">
                                      {/* <p>From</p> */}
                                      <div>
                                        <input
                                          type="text"
                                          placeholder="Origin"
                                          name="origin"
                                          value={
                                            selectedLocation_Ori
                                              ? `${selectedLocation_Ori.iataCode}, ${selectedLocation_Ori.address.cityName}, ${selectedLocation_Ori.address.countryName}, ${selectedLocation_Ori.name}`
                                              : details.origin
                                          }
                                          onChange={handleOriginChange}
                                          onClick={() =>
                                            setDetails({
                                              ...details,
                                              origin: "",
                                            })
                                          }
                                          className="searchInput fOrigin"
                                          autoFocus
                                          required
                                          autocomplete="off"
                                        />

                                        {showOriginOptions &&
                                          details.origin.trim() !== "" &&
                                          !isOptionSelected && (
                                            <>
                                              {originApiData.length > 0 ? (
                                                <ul className="searchUlForm">
                                                  {isLoading ? (
                                                    <p>Loading...</p>
                                                  ) : error ? (
                                                    <p className="text-white">
                                                      Error: {error.message}
                                                    </p>
                                                  ) : (
                                                    originApiData.map(
                                                      (location) => (
                                                        <li
                                                          className="searchLi d-flex align-items-center"
                                                          key={location.id}
                                                          onClick={() =>
                                                            handleSelectOrigin(
                                                              location.iataCode
                                                            )
                                                          }
                                                        >
                                                          <i className="fas fa-plane-departure"></i>
                                                          &nbsp;&nbsp;
                                                          <span
                                                            style={{
                                                              cursor: "pointer",
                                                            }}
                                                          >
                                                            ({location.iataCode}
                                                            )
                                                            {
                                                              location.address
                                                                .cityName
                                                            }
                                                            ,{" "}
                                                            {
                                                              location.address
                                                                .countryName
                                                            }
                                                            <br />
                                                            {location.name}
                                                          </span>
                                                        </li>
                                                      )
                                                    )
                                                  )}
                                                </ul>
                                              ) : null}
                                            </>
                                          )}
                                      </div>

                                      <div className="plan_icon_posation">
                                        <i className="fas fa-plane-departure" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-3  col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed">
                                      {/* <p>To</p> */}
                                      <div>
                                        <input
                                          type="text"
                                          placeholder="Destination"
                                          name="destination"
                                          onChange={handleDestinationChange}
                                          value={
                                            selectedLocation_Des
                                              ? `${selectedLocation_Des.iataCode}, ${selectedLocation_Des.address.cityName}, ${selectedLocation_Des.address.countryName}, ${selectedLocation_Des.name}`
                                              : details.destination
                                          }
                                          onClick={() =>
                                            setDetails({
                                              ...details,
                                              destination: "",
                                            })
                                          }
                                          className="searchInput"
                                          required
                                          autocomplete="off"
                                        />

                                        {showDestinationOptions &&
                                          details.destination.trim() !== "" &&
                                          !isOptionSelected && (
                                            <>
                                              {destinationApiData.length > 0 ? (
                                                <ul className="searchUlForm">
                                                  {isLoading ? (
                                                    <p>Loading...</p>
                                                  ) : error ? (
                                                    <p>
                                                      Error: {error.message}
                                                    </p>
                                                  ) : (
                                                    destinationApiData.map(
                                                      (location) => (
                                                        <li
                                                          className="searchLi d-flex align-items-center"
                                                          key={location.id}
                                                          onClick={() =>
                                                            handleSelectDestination(
                                                              location.iataCode
                                                            )
                                                          }
                                                        >
                                                          <i className="fas fa-plane-arrival"></i>
                                                          &nbsp;&nbsp;
                                                          <span
                                                            style={{
                                                              cursor: "pointer",
                                                            }}
                                                          >
                                                            ({location.iataCode}
                                                            )
                                                            {
                                                              location.address
                                                                .cityName
                                                            }
                                                            ,{" "}
                                                            {
                                                              location.address
                                                                .countryName
                                                            }
                                                            <br />
                                                            {location.name}
                                                          </span>
                                                        </li>
                                                      )
                                                    )
                                                  )}
                                                </ul>
                                              ) : null}
                                            </>
                                          )}
                                      </div>

                                      <div className="plan_icon_posation">
                                        <i className="fas fa-plane-arrival" />
                                      </div>
                                      <div className="range_plan">
                                        {/* <i className="fas fa-exchange-alt" /> */}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                    <div className="form_search_date">
                                      <div className="flight_Search_boxed date_flex_area">
                                        <div className="Journey_date">
                                          {/* <p>Departure</p> */}
                                          <div style={{ position: "relative" }}>
                                            <input
                                              // type="date"
                                              name="to"
                                              defaultValue=""
                                              id="dateInputnext"
                                              onChange={stateHandler}
                                            />
                                            <label htmlFor="dateInputnext">
                                              <i
                                                className="fa-solid fa-calendar-days calendar-icon"
                                                id="calendarIcon"
                                              ></i>
                                            </label>
                                          </div>
                                          {/* <span id="arrivalDay" /> */}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed dropdown_passenger_area">
                                      {/* <p>Passenger</p> */}
                                      <div className="dropdown">
                                        <button
                                          className="dropdown-toggle final-count"
                                          data-toggle="dropdown"
                                          type="button"
                                          id="dropdownMenuButton1"
                                          data-bs-toggle="dropdown"
                                          aria-expanded="false"
                                        >
                                          {totalCount} Passenger
                                        </button>
                                        {/* default value 1 rkhna h */}
                                        <div
                                          className="dropdown-menu dropdown_passenger_info"
                                          aria-labelledby="dropdownMenuButton1"
                                        >
                                          <div className="traveller-calulate-persons">
                                            <div className="passengers">
                                              <h6>Passengers</h6>
                                              <div className="passengers-types">
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    <span className="count pcount">
                                                      {count.adults}
                                                    </span>
                                                    <div className="type-label">
                                                      <p>Adult</p>
                                                      <span>12+ yrs</span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-subtract"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        inputMinus("adults");
                                                        sendData();
                                                      }}
                                                    >
                                                      <i className="fas fa-minus" />
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn-add"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        inputPlus("adults");
                                                        sendData();
                                                      }}
                                                    >
                                                      <i className="fas fa-plus" />
                                                    </button>
                                                  </div>
                                                </div>
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    <span className="count ccount">
                                                      {count.children}
                                                    </span>
                                                    <div className="type-label">
                                                      <p className="fz14 mb-xs-0">
                                                        Children
                                                      </p>
                                                      <span>
                                                        2 - Less than 12 yrs
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-subtract-c"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        inputMinus("children");
                                                        sendData();
                                                      }}
                                                    >
                                                      <i className="fas fa-minus" />
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn-add-c"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        inputPlus("children");
                                                        sendData();
                                                      }}
                                                    >
                                                      <i className="fas fa-plus" />
                                                    </button>
                                                  </div>
                                                </div>
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    <span className="count incount">
                                                      {count.senior}
                                                    </span>
                                                    <div className="type-label">
                                                      <p className="fz14 mb-xs-0">
                                                        Senior
                                                      </p>
                                                      <span>65+ yrs </span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-subtract-in"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        inputMinus("senior");
                                                        sendData();
                                                      }}
                                                    >
                                                      <i className="fas fa-minus" />
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn-add-in"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        inputPlus("senior");
                                                        sendData();
                                                      }}
                                                    >
                                                      <i className="fas fa-plus" />
                                                    </button>
                                                  </div>
                                                </div>

                                                <div className="passengers-type">
                                                  <div className="text">
                                                    <span className="count incount">
                                                      {count.infant}
                                                    </span>
                                                    <div className="type-label">
                                                      <p className="fz14 mb-xs-0">
                                                        Infant
                                                      </p>
                                                      <span>
                                                        Less than 2 yrs
                                                      </span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-subtract-in"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        inputMinus("infant");
                                                        sendData();
                                                      }}
                                                    >
                                                      <i className="fas fa-minus" />
                                                    </button>
                                                    <button
                                                      type="button"
                                                      className="btn-add-in"
                                                      onClick={(e) => {
                                                        e.stopPropagation();
                                                        inputPlus("infant");
                                                        sendData();
                                                      }}
                                                    >
                                                      <i className="fas fa-plus" />
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="cabin-selection">
                                              <h6 className="mb-2">
                                                Cabin Class
                                              </h6>
                                              <div className="cabin-list">
                                                <button
                                                  type="button"
                                                  className={`label-select-btn ${
                                                    details.cabin === "Economy"
                                                      ? "selected"
                                                      : ""
                                                  }`}
                                                  onClick={() =>
                                                    stateHandlerCabin("ECONOMY")
                                                  }
                                                >
                                                  <span className="muiButton-label">
                                                    Economy
                                                  </span>
                                                </button>
                                                <button
                                                  type="button"
                                                  className={`label-select-btn ${
                                                    details.cabin === "Business"
                                                      ? "selected"
                                                      : ""
                                                  }`}
                                                  onClick={() =>
                                                    stateHandlerCabin(
                                                      "BUSINESS"
                                                    )
                                                  }
                                                >
                                                  <span className="muiButton-label">
                                                    Business
                                                  </span>
                                                </button>
                                                <button
                                                  type="button"
                                                  className={`label-select-btn ${
                                                    details.cabin ===
                                                    "First Class"
                                                      ? "selected"
                                                      : ""
                                                  }`}
                                                  onClick={() =>
                                                    stateHandlerCabin("FIRST")
                                                  }
                                                >
                                                  <span className="muiButton-label">
                                                    First Class
                                                  </span>
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      {/* <span>{details.cabin}</span> */}
                                    </div>
                                  </div>
                                  <div className="col-lg-2">
                                    <div className="top_form_search_button-search-c">
                                      <button
                                        type="submit"
                                        className="btn btn_theme btn_md"
                                      >
                                        Search
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div
                        className="tab-pane fade"
                        id="multi_city"
                        role="tabpanel"
                        aria-labelledby="multi_city-tab"
                      >
                        <div className="row">
                          <div className="col-lg-12">
                            <div className="multicity_search_form">
                              <form
                                onSubmit={(e) => handleSubmits(e, "multicity")}
                              >
                                <div className="row gx-1">
                                  <div className="col-lg-4  col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed">
                                      {/* <p>From</p> */}
                                      <div>
                                        <input
                                          type="text" placeholder="Origin" name="origin" value={selectedLocation_Ori ? `${selectedLocation_Ori.iataCode}, ${selectedLocation_Ori.address.cityName}, ${selectedLocation_Ori.address.countryName}, ${selectedLocation_Ori.name}` : details.origin} onChange={handleOriginChange}
                                          onClick={() => setDetails({...details, origin: "",})} // Clear input when clicked for modification
                                          className="searchInput fOrigin" autoFocus required autocomplete="off"
                                        />

                                        {showOriginOptions && details.origin.trim() !== "" && !isOptionSelected && ( <>{originApiData.length > 0 ? (<ul className="searchUlForm"> {isLoading ? ( <p>Loading...</p>
                                                  ) : error ? ( <p className="text-white"> Error: {error.message} </p>
                                                  ) : ( originApiData.map( (location) => ( <li className="searchLi d-flex align-items-center"
                                                          key={location.id} onClick={() => handleSelectOrigin( location.iataCode ) }>
                                                          <i className="fas fa-plane-departure"></i> &nbsp;&nbsp;
                                                          <span style={{ cursor: "pointer", }} > ({location.iataCode}) {location.address.cityName} ,{" "} { location.address.countryName}<br />{location.name}</span>
                                                        </li>
                                                      )))}
                                                </ul> ) : null} </>
                                          )}
                                      </div>

                                      <div className="plan_icon_posation">
                                        <i className="fas fa-plane-departure" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-4  col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed">
                                      {/* <p>To</p> */}
                                      <div>
                                        <input type="text" placeholder="Destination" name="destination" onChange={handleDestinationChange}
                                          value={selectedLocation_Des ? `${selectedLocation_Des.iataCode}, ${selectedLocation_Des.address.cityName}, ${selectedLocation_Des.address.countryName}, ${selectedLocation_Des.name}` : details.destination}
                                          onClick={() => setDetails({...details,destination: "",})} className="searchInput" required autocomplete="off"
                                        />
                                        {showDestinationOptions && details.destination.trim() !== "" && !isOptionSelected && (  <>
                                              {destinationApiData.length > 0 ? ( <ul className="searchUlForm"> {isLoading ? ( <p>Loading...</p>) : error ? ( <p> Error: {error.message} </p> ) : (destinationApiData.map((location) => (
                                                        <li className="searchLi d-flex align-items-center" key={location.id}
                                                          onClick={() => handleSelectDestination(location.iataCode)}>
                                                          <i className="fas fa-plane-arrival"></i>&nbsp;&nbsp;<span style={{cursor: "pointer",}}>({location.iataCode}){location.address.cityName} ,{" "}{
                                                              location.address.countryName}<br />{location.name}</span></li>)))}</ul>
                                              ) : null}</>
                                          )}
                                      </div>

                                      <div className="plan_icon_posation">
                                        <i className="fas fa-plane-arrival" />
                                      </div>
                                      <div className="range_plan">
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                    <div className="form_search_date">
                                      <div className="flight_Search_boxed date_flex_area">
                                        <div className="Journey_date">
                                          {/* <p>Departure</p> */}
                                          <div>
                                            <input name="form" defaultValue="" id="dateInputnextm" onChange={stateHandler} />
                                            <label htmlFor="dateInputnextm"> <i className="fa-solid fa-calendar-days calendar-icon"
                                                id="calendarIcon" ></i>
                                            </label>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed dropdown_passenger_area">
                                      <div className="dropdown">
                                        <button className="dropdown-toggle final-count" data-toggle="dropdown" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false" > {totalCount} Passenger
                                        </button>
                                        <div
                                          className="dropdown-menu dropdown_passenger_info"
                                          aria-labelledby="dropdownMenuButton1"
                                        >
                                          <div className="traveller-calulate-persons">
                                            <div className="passengers">
                                              <h6>Passengers</h6>
                                              <div className="passengers-types">
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    <span className="count pcount">
                                                      {count.adults}
                                                    </span>
                                                    <div className="type-label">
                                                      <p>Adult</p>
                                                      <span>12+ yrs</span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button" className="btn-subtract" onClick={(e) => {e.stopPropagation(); inputMinus("adults"); sendData(); }} > <i className="fas fa-minus" /> </button>
                                                    <button
                                                      type="button" className="btn-add" onClick={(e) => {e.stopPropagation(); inputPlus("adults"); sendData(); }}><i className="fas fa-plus" /></button>
                                                  </div>
                                                </div>
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    <span className="count ccount">
                                                      {count.children}
                                                    </span>
                                                    <div className="type-label">
                                                      <p className="fz14 mb-xs-0">Children</p>
                                                      <span>2 - Less than 12 yrs</span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button type="button" className="btn-subtract-c" onClick={(e) => {e.stopPropagation();
                                                        inputMinus("children");sendData();}}><i className="fas fa-minus" /></button>
                                                    <button type="button" className="btn-add-c" onClick={(e) => {e.stopPropagation();
                                                        inputPlus("children");sendData();}}><i className="fas fa-plus" /></button>
                                                  </div>
                                                </div>
                                                <div className="passengers-type">
                                                  <div className="text">
                                                    <span className="count incount">{count.senior}</span>
                                                    <div className="type-label">
                                                      <p className="fz14 mb-xs-0">Senior</p><span>65+ yrs </span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button" className="btn-subtract-in" onClick={(e) => {e.stopPropagation();
                                                        inputMinus("senior"); sendData(); }}><i className="fas fa-minus" /></button>
                                                    <button type="button" className="btn-add-in" onClick={(e) => { e.stopPropagation();
                                                        inputPlus("senior"); sendData(); }}><i className="fas fa-plus" /></button>
                                                  </div>
                                                </div>

                                                <div className="passengers-type">
                                                  <div className="text">
                                                    <span className="count incount">
                                                      {count.infant}
                                                    </span>
                                                    <div className="type-label">
                                                      <p className="fz14 mb-xs-0">Infant</p>
                                                      <span>Less than 2 yrs</span>
                                                    </div>
                                                  </div>
                                                  <div className="button-set">
                                                    <button
                                                      type="button"
                                                      className="btn-subtract-in"
                                                      onClick={(e) => {e.stopPropagation();inputMinus("infant");sendData();}}>
                                                      <i className="fas fa-minus" />
                                                    </button>
                                                    <button
                                                      type="button" className="btn-add-in"
                                                      onClick={(e) => {e.stopPropagation();inputPlus("infant");sendData();}}>
                                                      <i className="fas fa-plus" />
                                                    </button>
                                                  </div>
                                                </div>
                                              </div>
                                            </div>
                                            <div className="cabin-selection">
                                              <h6 className="mb-2">
                                                Cabin Class
                                              </h6>
                                              <div className="cabin-list">
                                                <button
                                                  type="button" className={`label-select-btn ${details.cabin === "Economy"? "selected": ""
                                                  }`}onClick={() => stateHandlerCabin("ECONOMY")}>
                                                  <span className="muiButton-label">Economy</span>
                                                </button>
                                                <button
                                                  type="button" className={`label-select-btn ${details.cabin === "Business"
                                                      ? "selected" : "" }`} onClick={() => stateHandlerCabin("BUSINESS")}>
                                                  <span className="muiButton-label">Business</span>
                                                </button>
                                                <button
                                                  type="button" className={`label-select-btn ${details.cabin === "First Class"? "selected"
                                                      : "" }`} onClick={() => stateHandlerCabin("FIRST")}>
                                                  <span className="muiButton-label">
                                                    First Class
                                                  </span>
                                                </button>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                      {/* <span>{details.cabin}</span> */}
                                    </div>
                                  </div>
                                </div>
                                <br />
{/* ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////                                 */}
                                <div
                                  className="row gx-1"
                                  style={{ marginTop: "-1rem" }}
                                >
                                  <div className="col-lg-4  col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed">
                                      {/* <p>From</p> */}
                                      <div>

                                        {/* ////seperate type code */}
                                        
                                        {/* <input
                                          type="text" placeholder="Origin" name="origin"
                                          value={
                                            selectedLocation_OriMulti ? `${selectedLocation_OriMulti.iataCode}, ${selectedLocation_OriMulti.address.cityName}, ${selectedLocation_OriMulti.address.countryName}, ${selectedLocation_OriMulti.name}` : detailsMulti.origin } onChange={handleOriginChangeMulti} onClick={() => setDetailsMulti({...detailsMulti, origin: "",})} // Clear input when clicked for modification
                                          className="searchInput fOrigin" autoFocus required autocomplete="off" />

                                        {showOriginOptionsMulti && detailsMulti.origin.trim() !== "" && !isOptionSelectedMulti && (
                                            <>
                                              {originApiDataMulti.length > 0 ? (<ul className="searchUlForm">{isLoading ? (<p>Loading...</p>
                                                  ) : error ? ( <p className="text-white"> Error: {error.message} </p>
                                                  ) : (originApiDataMulti.map((location) => (<li
                                                          className="searchLi d-flex align-items-center"
                                                          key={location.id}
                                                          onClick={() =>
                                                            handleSelectOriginMulti(
                                                              location.iataCode
                                                            )
                                                          }
                                                        >
                                                          <i className="fas fa-plane-departure"></i>
                                                          &nbsp;&nbsp;
                                                          <span
                                                            style={{
                                                              cursor: "pointer",
                                                            }}
                                                          >
                                                            ({location.iataCode}
                                                            )
                                                            {
                                                              location.address
                                                                .cityName
                                                            }
                                                            ,{" "}
                                                            {
                                                              location.address
                                                                .countryName
                                                            }
                                                            <br />
                                                            {location.name}
                                                          </span>
                                                        </li>
                                                      )
                                                    )
                                                  )}
                                                </ul>
                                              ) : null}
                                            </>
                                          )} */}



<input type="text" placeholder="Destination" name="destination" onChange={handleDestinationChange}
                                          value={selectedLocation_Des ? `${selectedLocation_Des.iataCode}, ${selectedLocation_Des.address.cityName}, ${selectedLocation_Des.address.countryName}, ${selectedLocation_Des.name}` : details.destination}
                                          onClick={() => setDetails({...details,destination: "",})} className="searchInput" required autocomplete="off"
                                        />
                                        {/* {showDestinationOptions && details.destination.trim() !== "" && !isOptionSelected && (  <>
                                              {destinationApiData.length > 0 ? ( <ul className="searchUlForm"> {isLoading ? ( <p>Loading...</p>) : error ? ( <p> Error: {error.message} </p> ) : (destinationApiData.map((location) => (
                                                        <li className="searchLi d-flex align-items-center" key={location.id}
                                                          onClick={() => handleSelectDestination(location.iataCode)}>
                                                          <i className="fas fa-plane-arrival"></i>&nbsp;&nbsp;<span style={{cursor: "pointer",}}>({location.iataCode}){location.address.cityName} ,{" "}{
                                                              location.address.countryName}<br />{location.name}</span></li>)))}</ul>
                                              ) : null}</>
                                          )} */}
                                      </div>

                                      <div className="plan_icon_posation">
                                        <i className="fas fa-plane-departure" />
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-4  col-md-6 col-sm-12 col-12">
                                    <div className="flight_Search_boxed">
                                      {/* <p>To</p> */}
                                      <div>
                                        <input
                                          type="text"
                                          placeholder="Destination"
                                          name="destination"
                                          onChange={handleDestinationChangeMulti}
                                          value={
                                            selectedLocation_DesMulti
                                              ? `${selectedLocation_DesMulti.iataCode}, ${selectedLocation_DesMulti.address.cityName}, ${selectedLocation_DesMulti.address.countryName}, ${selectedLocation_DesMulti.name}`
                                              : detailsMulti.destination
                                          }
                                          onClick={() =>
                                            setDetailsMulti({
                                              ...detailsMulti,
                                              destination: "",
                                            })
                                          }
                                          className="searchInput"
                                          required
                                          autocomplete="off"
                                        />

                                        {showDestinationOptionsMulti &&
                                          detailsMulti.destination.trim() !== "" &&
                                          !isOptionSelectedMulti && (
                                            <>
                                              {destinationApiDataMulti.length > 0 ? (
                                                <ul className="searchUlForm">
                                                  {isLoading ? (
                                                    <p>Loading...</p>
                                                  ) : error ? (
                                                    <p>
                                                      Error: {error.message}
                                                    </p>
                                                  ) : (
                                                    destinationApiDataMulti.map(
                                                      (location) => (
                                                        <li
                                                          className="searchLi d-flex align-items-center"
                                                          key={location.id}
                                                          onClick={() =>
                                                            handleSelectDestinationMulti(
                                                              location.iataCode
                                                            )
                                                          }
                                                        >
                                                          <i className="fas fa-plane-arrival"></i>
                                                          &nbsp;&nbsp;
                                                          <span
                                                            style={{
                                                              cursor: "pointer",
                                                            }}
                                                          >
                                                            ({location.iataCode}
                                                            )
                                                            {
                                                              location.address
                                                                .cityName
                                                            }
                                                            ,{" "}
                                                            {
                                                              location.address
                                                                .countryName
                                                            }
                                                            <br />
                                                            {location.name}
                                                          </span>
                                                        </li>
                                                      )
                                                    )
                                                  )}
                                                </ul>
                                              ) : null}
                                            </>
                                          )}
                                      </div>

                                      <div className="plan_icon_posation">
                                        <i className="fas fa-plane-arrival" />
                                      </div>
                                      <div className="range_plan">
                                        {/* <i className="fas fa-exchange-alt" /> */}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-2  col-md-6 col-sm-12 col-12">
                                    <div className="form_search_date">
                                      <div className="flight_Search_boxed date_flex_area">
                                        <div className="Journey_date">
                                          {/* <p>Departure</p> */}
                                          <div>
                                            <input
                                              // type="date"
                                              name="to"
                                              defaultValue=""
                                              id="dateInputnextmm"
                                              onChange={stateHandler}
                                            />
                                            <label htmlFor="dateInputnextmm">
                                              <i
                                                className="fa-solid fa-calendar-days calendar-icon"
                                                id="calendarIcon"
                                              ></i>
                                            </label>
                                          </div>
                                          {/* <span id="arrivalDaysNextMM" /> */}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="col-lg-2">
                                    <div className="top_form_search_button-search-c">
                                      <button
                                        type="submit"
                                        className="btn btn_theme btn_md"
                                      >
                                        Search
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      {/* </section> */}
    </div>
  );
}

export default MyComponent;
