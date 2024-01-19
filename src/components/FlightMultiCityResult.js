import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import useDataFetcherWithToken from "../customhook/useDataFetch";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
// import FlightPriceSlider from "./FlightPriceSlider";
import { useNavigate } from "react-router-dom";
const FlightResult = () => {
  const [excelData, setExcelData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []); // The empty dependency array ensures that the effect runs once when the component mounts

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/excelData');
      setExcelData(response.data);
      console.log("Excel Data", response.data); // Use response.data instead of excelData
    } catch (error) {
      console.error('Error fetching Excel data:', error);
    }
  };
  const location = useLocation();
  console.log("location data", location.state);
  const { accessToken, isLoading, error } = useDataFetcherWithToken();
  const [apiData, setApiData] = useState(null); 
  // toggle show code
  const [isOpenArray, setIsOpenArray] = useState(
    apiData && apiData.data ? new Array(apiData.data.length).fill(false) : []
  );
  const toggleItem = (index) => {
    const newArray = [...isOpenArray];
    newArray[index] = !newArray[index];
    setIsOpenArray(newArray);
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
      hours = hours - 12;
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

  // filter price
  const [flightPrice, setFlightPrice] = useState(0);
  const [minFlightPrice, setMinFlightPrice] = useState(0);
  const [maxFlightPrice, setMaxFlightPrice] = useState(0);
  const [filteredData, setFilteredData] = useState([]);
  // const [apiData, setApiData] = useState(initialApiData);

  useEffect(() => {
    if (apiData && apiData.data && apiData.data.length > 0) {
      const prices = apiData.data.map((item) => parseFloat(item.price.total));
      setMinFlightPrice(Math.min(...prices));
      setMaxFlightPrice(Math.max(...prices));
      setFlightPrice(Math.min(...prices));
      setFilteredData(apiData.data);
    }
  }, [apiData]);

  const handleSliderChange = (event) => {
    const selectedPrice = parseFloat(event.target.value);
    setFlightPrice(selectedPrice);
  };

  const handleApplyFilter = () => {
    // Filter the flight data based on the selected price range
    const filteredData = apiData.data.filter(
      (item) => parseFloat(item.price.total) <= flightPrice
    );

    // Store the filtered data in state for rendering
    setFilteredData(filteredData);
    console.log("filteredData", filteredData);
  };

  const handleApplyreset = () => {
    setFilteredData(apiData.data);
  };

  
  useEffect(() => {
    if (isLoading) {
      // Handle loading state
    } else if (error) {
      // Handle error state
    } else if (accessToken && location.state.details[0] && location.state.details[0][1]) {
      console.log("Access Token:", accessToken);
  
      let apiUrlA = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${location.state.details[0][0].origin}&destinationLocationCode=${location.state.details[0][0].destination}&departureDate=${location.state.details[0][0].from}&adults=${location.state.details[0].passengerData.adults}&children=${location.state.details[0].passengerData.children}&infants=${location.state.details[0].passengerData.infant}&travelClass=${location.state.details[0][0].cabin}&currencyCode=USD&max=40`; // URL for the first API call
      let apiUrlB = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${location.state.details[0][1].origin}&destinationLocationCode=${location.state.details[0][1].destination}&departureDate=${location.state.details[0][1].from}&adults=${location.state.details[0].passengerData.adults}&children=${location.state.details[0].passengerData.children}&infants=${location.state.details[0].passengerData.infant}&travelClass=${location.state.details[0][1].cabin}&currencyCode=USD&max=40`; // URL for the second API call
      let apiUrlC;
      if(location.state.details[0][2]){
      apiUrlC = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${location.state.details[0][2].origin}&destinationLocationCode=${location.state.details[0][2].destination}&departureDate=${location.state.details[0][2].from}&adults=${location.state.details[0].passengerData.adults}&children=${location.state.details[0].passengerData.children}&infants=${location.state.details[0].passengerData.infant}&travelClass=${location.state.details[0][2].cabin}&currencyCode=USD&max=40`; // URL for the second API call
      }

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };
  
      // Make the first API call
      axios.get(apiUrlA, { headers })
        .then((responseA) => {
          // Handle the response data here
          console.log("API Response A:", responseA.data);
  
          // Make the second API call
          axios.get(apiUrlB, { headers })
            .then((responseB) => {
              // Handle the response data here
              console.log("API Response B:", responseB.data);
              let combinedData;
              if(location.state.details[0][2]){
          axios.get(apiUrlC, { headers })
          .then((responseC) => {
            // Handle the response data here
            console.log("API Response C:", responseC.data);
           
          })}else{
               combinedData = {
                data: responseA.data.data.map((itemA) => {
                  const matchingItemB = responseB.data.data.find((itemB) => itemB.id === itemA.id);
                  if (matchingItemB) {
                    const totalPricesA = parseFloat(itemA.travelerPricings[0].price.total);
                    const totalPricesB = parseFloat(matchingItemB.travelerPricings[0].price.total);
              
                    return {
                      ...itemA,
                      itineraries: [...itemA.itineraries, ...matchingItemB.itineraries],
                      travelerPricings: [...itemA.travelerPricings, ...matchingItemB.travelerPricings],
                      totalPrices: (totalPricesA + totalPricesB).toFixed(2),
                    };
                  }
                  return null; // Exclude items without a matching ID
                }).filter(Boolean), // Filter out null values
                dictionaries: {...responseA.data.dictionaries, ...responseB.data.dictionaries}
              };  
            }
              // Update the state with combined data
              setApiData(combinedData);
              console.log("Api data: ",combinedData)
            })
            .catch((apiErrorB) => {
              // Handle API request errors for the second call
              console.error("API Error B:", apiErrorB);
            });
        })
        .catch((apiErrorA) => {
          // Handle API request errors for the first call
          console.error("API Error A:", apiErrorA);
        });
    }
  }, [accessToken, isLoading, error, location.state.details]);
  
  
  // //airline categories code
  const [selectedCarriers, setSelectedCarriers] = useState([]);
  const [allUnchecked, setAllUnchecked] = useState(true);

  const handleCarrierFilterChange = useCallback((e) => {
    const carrier = e.target.value;
    setSelectedCarriers((prevSelectedCarriers) => {
      if (prevSelectedCarriers.includes(carrier)) {
        const newSelectedCarriers = prevSelectedCarriers.filter(
          (c) => c !== carrier
        );
        if (newSelectedCarriers.length === 0) {
          setAllUnchecked(true); // All checkboxes are unchecked
        }
        return newSelectedCarriers;
      } else {
        setAllUnchecked(false); // At least one checkbox is checked
        return [...prevSelectedCarriers, carrier];
      }
    });
  }, []);

  // stop , non-stop code
  // const [selectedLabel, setSelectedLabel] = useState("Non-Stop");
  const [displayedData, setDisplayedData] = useState(null);
  const handleLabelClick = (label) => {
    // setSelectedLabel(label);
    // Filter and set the data based on the selected label
    if (label === "Non-Stop") {
      setDisplayedData(
        apiData.data.filter(
          (item) =>
            item.itineraries[0].segments.length === 1 ||
            item.itineraries[1].segments.length === 1
        )
      );
    } else if (label === "1 Stop") {
      setDisplayedData(
        apiData.data.filter(
          (item) =>
            item.itineraries[0].segments.length === 2 ||
            item.itineraries[1].segments.length === 2
        )
      );
    } else if (label === "2 Stops") {
      setDisplayedData(
        apiData.data.filter(
          (item) =>
            item.itineraries[0].segments.length >= 3 ||
            item.itineraries[1].segments.length >= 3
        )
      );
    }
  };

  // useEffect(() => {
  //   console.log("displayedData", displayedData);
  // }, [displayedData]);

  // function getStopLabel(data) {
  //   if (!Array.isArray(data)) {
  //     return "Stop"; // Default label
  //   }

  //   const numSegments = data.length;

  //   if (numSegments === 0) {
  //     return "Non-Stop";
  //   } else if (numSegments === 1) {
  //     return "1 Stop";
  //   } else {
  //     return "2+ Stops";
  //   }
  // }

  // console.log("displayedData", displayedData)

  // Create a state variable to hold the selected data
  const [selectedDataIndex, setSelectedDataIndex] = useState(null);
  const navigate = useNavigate();

  const handleDataSelection = (index) => {
    setSelectedDataIndex(index);
  };
  useEffect(() => {
    if (selectedDataIndex !== null && apiData && apiData.data) {
      const selectedData = apiData.data[selectedDataIndex];
      navigate("/flightSubmit", {
        state: {
          data: [
            selectedData
          ],
          dictionaries: apiData.dictionaries,
          tripType: location.state.tripType,
        },
      });
    }
  }, [selectedDataIndex, apiData, navigate]);

  useEffect(() => {
    console.log("displayedData", displayedData);
  }, [displayedData]);

  // filter by price code min or max
  useEffect(() => {
    if (apiData && apiData.data && apiData.data.length > 0) {
      const prices = apiData.data.map((item) => parseFloat(item.price.total));
      setMinFlightPrice(prices[0]);
      setMaxFlightPrice(prices[prices.length - 1]);
      setFlightPrice(prices[0]);
    }
  }, [apiData]);
  if (!apiData || !apiData.data || apiData.data.length === 0) {
    return (
      <>
        <div className="search-img top-page">
          <div className="loader">
            <div className="wait">
              Please wait while we are searching unpublished exclusive for you
              from over 450+ airlines
            </div>
            <div className="iata_code departure_city">
              {location.state.details.origin}
            </div>
            <div className="plane">
              <img
                src="https://zupimages.net/up/19/34/4820.gif"
                className="plane-img"
                alt="loading"
              />
            </div>
            <div className="earth-wrapper">
              <div className="earth" />
            </div>
            <div className="iata_code arrival_city">
              {location.state.details.destination}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Common Banner Area */}
      <section id="common_banner" className="top-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="common_bannner_text">
                <h2>Flight search result</h2>
                <ul>
                  <li>
                    <Link to="/#">Home</Link>
                  </li>
                  <li>
                    <span>
                      <i className="fas fa-circle" />
                    </span>{" "}
                    Flight search result
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Flight Search Areas */}
      <section id="explore_area" className="section_padding">
        <div className="container">
          {/* Section Heading */}
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="section_heading_center">
                {/* {apiData && <p>Value of NK: {apiData.dictionaries.carriers['NK']}</p>} */}

                {/* <h2>Total Result Found <b>{apiData.data.length}</b> </h2> */}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-3">
              <div className="left_side_search_area">
                <div className="left_side_search_boxed">
                  {/* min or max code */}
                  <div className="left_side_search_heading">
                    {/* Your CSS is coming from nouislider.css */}
                    <h5>Filter by price</h5>
                  </div>
                  <div className="filter-price">
                    <div>
                      <label htmlFor="customRange2" className="form-label">
                        Flight Price: ${flightPrice}
                      </label>
                      <div className="filter-s-l d-flex justify-content-between">
                        <h6>Min</h6>
                        <h6>Max</h6>
                      </div>
                      <input
                        type="range"
                        className="form-range"
                        min={minFlightPrice}
                        max={maxFlightPrice}
                        id="customRange2"
                        value={flightPrice}
                        onChange={handleSliderChange}
                      />
                      <div className="filter-s-l d-flex justify-content-between">
                        <h6>{minFlightPrice} USD</h6>
                        <h6>{maxFlightPrice} USD</h6>
                      </div>
                      <div className="d-flex justify-content-between">
                        <button
                          className="apply"
                          type="button"
                          onClick={handleApplyFilter}
                        >
                          Apply
                        </button>
                        &nbsp;
                        <button
                          className="apply"
                          type="button"
                          onClick={handleApplyreset}
                        >
                          Reset Price
                        </button>
                      </div>

                      {/* Display the filtered data, e.g., in a list */}
                      {filteredData.map((item) => (
                        <div key={item.id}>
                          {/* Render flight details here */}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="left_side_search_boxed">
                  <div className="left_side_search_heading">
                    <h5>Airlines</h5>
                  </div>
                  <div className="tour_search_type">
                    <div>
                      {apiData &&
                        apiData.dictionaries &&
                        apiData.dictionaries.carriers && (
                          <div>
                            {Object.keys(apiData.dictionaries.carriers).map(
                              (carrier, index) => {
                                const isChecked =
                                  selectedCarriers.includes(carrier);
                                return (
                                  <div className="form-check" key={index}>
                                    <input
                                      className="form-check-input"
                                      type="checkbox"
                                      value={carrier}
                                      id={`flexCheckDefaults${index + 1}`}
                                      onChange={handleCarrierFilterChange}
                                      checked={isChecked}
                                    />
                                    <label
                                      className="form-check-label"
                                      htmlFor={`flexCheckDefaults${index + 1}`}
                                    >
                                      <span className="area_flex_one">
                                        <span>
                                          {
                                            apiData.dictionaries.carriers[
                                              carrier
                                            ]
                                          }
                                        </span>
                                        <span>
                                          {!location.state.details.to
                                            ? apiData.data.filter((item) =>
                                                [0].some(
                                                  (itineraryIndex) =>
                                                    item.itineraries[
                                                      itineraryIndex
                                                    ].segments[0]
                                                      .carrierCode === carrier
                                                )
                                              ).length
                                            : apiData.data.filter((item) =>
                                                [0, 1].some(
                                                  (itineraryIndex) =>
                                                    item.itineraries[
                                                      itineraryIndex
                                                    ].segments[0]
                                                      .carrierCode === carrier
                                                )
                                              ).length}
                                        </span>
                                      </span>
                                    </label>
                                  </div>
                                );
                              }
                            )}
                          </div>
                        )}
                    </div>
                  </div>
                </div>
                <div className="left_side_search_boxed">
                  <div className="left_side_search_heading">
                    <h5>Number of Stops</h5>
                  </div>
                  <div className="tour_search_type">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="nonStop"
                        onChange={() => handleLabelClick("Non-Stop")}
                      />
                      <label className="form-check-label" htmlFor="nonStop">
                        Non-Stop
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="oneStop"
                        onChange={() => handleLabelClick("1 Stop")}
                      />
                      <label className="form-check-label" htmlFor="oneStop">
                        1 Stop
                      </label>
                    </div>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="twoStops"
                        onChange={() => handleLabelClick("2 Stops")}
                      />
                      <label className="form-check-label" htmlFor="twoStops">
                        2 Stops
                      </label>
                    </div>
                  </div>
                  <div>
                    {/* {Array.isArray(displayedData) && (
          <div className="data-display">
            {displayedData.map((segment, index) => (
              <div key={index}>
                
              </div>
            ))}
          </div>
        )} */}
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-9">
              {apiData &&
                apiData.data &&
                (allUnchecked || selectedCarriers.length === 0
                  ? (filteredData || apiData.data) &&
                    (displayedData ? displayedData : apiData.data) // Add the new condition here
                  : (filteredData || apiData.data).filter(
                      (
                        item // Further filter filteredData if needed
                      ) =>
                        [0, 1].some((itineraryIndex) =>
                          selectedCarriers.includes(
                            item.itineraries[itineraryIndex].segments[0]
                              .carrierCode
                          )
                        )
                    )
                ).sort((offerA, offerB) => {
                  // Custom sorting function
                  if (offerA.itineraries[0].segments[0].carrierCode === excelData[0].airline) {
                    return -1; // 'excelData.airline' comes first
                  } else if (offerB.itineraries[0].segments[0].carrierCode === excelData[0].airline) {
                    return 1; // 'excelData.airline' comes second
                  } else {
                    return 0; // No preference for other items
                  }
                })
                .map((offer, index) => {
                  

                  return (
                    <div
                      key={index}
                      className="row"
                      style={{
                        border: "1px solid #000",
                        margin: "1.5rem",
                        paddingTop: "1.5rem",
                      }}
                    >
                      {offer.itineraries.map((itinerary, index) => {
                        //  const fullCarrierName = apiData.dictionaries.carriers[carrierCode];
                        //  const fullCarrierNameSec = apiData.dictionaries.carriers[carrierCodeSec];
                        const carrierCode = itinerary?.segments[0]?.carrierCode;
                        // const carrierCodeSec = itinerary?.segments[0]?.carrierCode;

                        const fullCarrierName =
                          apiData.dictionaries.carriers[carrierCode];
                        // const fullCarrierNameSec = apiData.dictionaries.carriers[carrierCodeSec];
                        const lastSegment =
                          itinerary.segments[itinerary.segments.length - 1];

                        // const lastSegmentArrivalTime = format(lastSegment.arrival.at);
                        const lastSegmentArrivalIataCode =
                          lastSegment.arrival.iataCode;
                        //// below code of date and time

                        const formattedDepartureDate = formatDate(
                          itinerary.segments[0].departure.at
                        );
                        const formattedArrivalDate = formatDate(
                          itinerary.segments[0].arrival.at
                        );
                        // const ansDate = formattedDepartureDate; // Use the formatted departure time
                        // const ans1Date = formattedArrivalDate; // Use the formatted arrival time

                        const formattedDepartureTime = formatTime(
                          itinerary.segments[0].departure.at
                        );

                        const formattedArrivalTime = formatTime(
                          lastSegment.arrival.at
                        );

                        // Now you can use the formatted date and time values within the loop
                        const ans = formattedDepartureTime; // Use the formatted departure time
                        const ans1 = formattedArrivalTime; // Use the formatted arrival time

                        const numStops = itinerary.segments.length - 1;

                        return (
                          <div className="col-lg-8">
                            <div className="flight_search_result_wrapper">
                              <div className="flight_search_item_wrappper">
                                <div className="flight_search_items">
                                  <div className="multi_city_flight_lists">
                                    <div className="flight_multis_area_wrapper">
                                      <div className="flight_search_left">
                                        <div className="flight_logo">
                                          <img
                                            src={`https://cmsrepository.com/static/flights/flight/airlinelogo-png/${itinerary.segments[0].carrierCode.toLowerCase()}.png`}
                                            alt={
                                              itinerary.segments[0].carrierCode
                                            }
                                          />
                                          <p>{fullCarrierName}</p>
                                        </div>
                                        <div className="flight_search_destination my-sear-des">
                                          <p>From</p>
                                          <h3>
                                            {
                                              itinerary.segments[0].departure
                                                .iataCode
                                            }
                                          </h3>
                                          <h6>{ans}</h6>
                                          {/* belowcheck */}
                                          <h6>{formattedDepartureDate}</h6>
                                        </div>
                                      </div>
                                      <div className="flight_search_middel">
                                        <div className="flight_right_arrow">
                                          <img
                                            src="images/right_arrow.png"
                                            alt="icon"
                                          />
                                          {/* <h6> */}
                                          <h6>
                                            {numStops <= 0
                                              ? "Non-Stop"
                                              : numStops === 1
                                              ? "1 Stop"
                                              : `${numStops} Stops`}
                                          </h6>

                                          {/* </h6> */}
                                          <p>
                                            {itinerary.duration
                                              .slice(2) // Remove "pt" prefix
                                              .match(/.{1,2}/g) // Split the string into groups of two characters
                                              .join(" ")}{" "}
                                            {/* Join the groups with a space */}
                                          </p>
                                        </div>
                                        <div className="flight_search_destination my-flight-side">
                                          <p>To</p>
                                          <h3>{lastSegmentArrivalIataCode}</h3>
                                          <h6>{ans1}</h6>
                                          {/* belowcheck */}
                                          <h6>{formattedArrivalDate}</h6>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {/* Flight Search Item */}
                            </div>
                          </div>
                        );
                      })}
                      <div className="col-md-4 text-center">
                        <h5>{location.state.details.cabin}</h5>
                        <h2 className="mb-3">
                          ${offer.totalPrices}
                        </h2>
                        {excelData.map((data, index) => (
    <div key={index}>
      <ul>
     
        {data.airline === (offer.itineraries[0].segments[0].carrierCode) && (
          <li>   <li> <h3>Discounted Price</h3> {data.priority}</li>
            {(
              parseFloat(offer.travelerPricings[0].price.total) -
              parseFloat(data.markup_value)
            ).toFixed(2)}
          </li>
        )}
      </ul>
    </div>
  ))}
                        {/* <Link
                          to={{
                            pathname: `/flightSubmit/${offer.id}`,
                            state: {
                              additionalData: offer[0],
                            },
                          }}
                          className="btn btn_theme btn_md"
                        >
                          Book Now
                        </Link> */}
                        <button
                          key={index}
                          onClick={() => handleDataSelection(index)}
                          className="btn btn_theme btn_md"
                        >
                          Book Now
                        </button>
                      </div>
                      <div className="col-md-12">
                        <div className="show-details">
                          <h6
                            className="btn mybtn"
                            data-bs-toggle="collapse"
                            data-bs-target={`#collapseExample${index}`}
                            aria-expanded={isOpenArray[index]}
                            aria-controls={`collapseExample${index}`}
                            onClick={() => toggleItem(index)} // Toggle the item's open/closed state
                          >
                            Show More <i className="fas fa-chevron-down" />
                          </h6>
                          <>
                            {/* Button trigger modal */}
                            &nbsp;
                            <button
                              type="button"
                              className="btn mybtn"
                              data-bs-toggle="modal"
                              data-bs-target="#exampleModal"
                            >
                              Refund Policy
                            </button>
                            {/* Modal */}
                            <div
                              className="modal fade"
                              id="exampleModal"
                              tabIndex={-1}
                              aria-labelledby="exampleModalLabel"
                              aria-hidden="true"
                            >
                              <div className="modal-dialog">
                                <div className="modal-content">
                                  <div className="modal-header myrefund-modal">
                                    <h5
                                      className="modal-title myrefund-modal"
                                      id="exampleModalLabel"
                                    >
                                      Refund Policy
                                    </h5>
                                    <button
                                      type="button"
                                      className="btn-close"
                                      data-bs-dismiss="modal"
                                      aria-label="Close"
                                    />
                                  </div>
                                  <div className="modal-body">
                                    <div className="flight_refund_policy">
                                      <ol className="refund-policy-ul">
                                        <li className="">
                                          Passengers can cancel the reservation
                                          within 24 hours of booking without any
                                          charges.
                                        </li>
                                        <li className="">
                                          Passengers need to call our 24*7
                                          customer care center to request the
                                          cancellation.
                                        </li>
                                        <li className="">
                                          Passengers will receive the refund
                                          amount within 5-10 working days
                                          (Depending upon Airline policies)
                                        </li>
                                        <li>
                                          Some Airlines will provide future
                                          credits, so passengers can utilize the
                                          same for future travel.
                                        </li>
                                        <li>
                                          Agency fees are non-refundable in case
                                          of cancellation.
                                        </li>
                                      </ol>
                                    </div>
                                  </div>
                                  <div className="modal-footer">
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      data-bs-dismiss="modal"
                                    >
                                      Close
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </>
                        </div>
                      </div>
                      <div
                        className={`row flight_policy_refund collapse${
                          isOpenArray[index] ? " show" : ""
                        }`}
                        id={`collapseExample${index}`}
                      >
                        {/* second end box */}
                        <div className="col-md-12">
                          {/* show more start */}

                          <div className="flight_policy_refund">
                            {/* dropdown menu */}
                            {offer.itineraries.map(
                              (itinerary, itineraryIndex) => (
                                <div
                                  key={itineraryIndex}
                                  className="flight_show_down_wrapper row" style={{marginBottom: '1.5rem'}}
                                >
                                  {itinerary.segments.map(
                                    (segment, segmentIndex) => {
                                      const departureAtTime =
                                        segment.departure.at;
                                      const departureTime = new Date(
                                        departureAtTime
                                      );

                                      // Format departure time
                                      const formattedDepartureTimeShow =
                                        formatTime(departureTime);

                                      const arrivalAtTime = segment.arrival.at;
                                      const arrivalTime = new Date(
                                        arrivalAtTime
                                      );

                                      // Format arrival time
                                      const formattedArrivalTimeShow =
                                        formatTime(arrivalTime);

                                      function formatTime(time) {
                                        const hours = time.getHours();
                                        const minutes = time.getMinutes();
                                        const ampm = hours >= 12 ? "PM" : "AM";

                                        // Convert hours from 24-hour format to 12-hour format
                                        const formattedHours =
                                          ((hours + 11) % 12) + 1;
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
                                        apiData.dictionaries.aircraft[
                                          sefaricraft
                                        ];
                                      //// code of layout duration
                                      const seg1hour =
                                        itinerary.segments[0].duration
                                          .slice(2) // Remove "pt" prefix
                                          .slice(0, 2)
                                          .match(/.{1,2}/g) // Split the string into groups of two characters
                                          .join(" ");
                                      const seg2hour =
                                        itinerary?.segments[1]?.duration
                                          .slice(2) // Remove "pt" prefix
                                          .slice(0, 2)
                                          .match(/.{1,2}/g) // Split the string into groups of two characters
                                          .join(" ");
                                      const seg1min =
                                        itinerary?.segments[0]?.duration
                                          .slice(2) // Remove "pt" prefix
                                          .slice(-3)
                                          .match(/.{1,2}/g) // Split the string into groups of two characters
                                          .join(" ");
                                      const seg2min =
                                        itinerary?.segments[1]?.duration
                                          .slice(2) // Remove "pt" prefix
                                          .slice(-3)
                                          .match(/.{1,2}/g) // Split the string into groups of two characters
                                          .join(" ");
                                      const datadurationhour =
                                        itinerary.duration
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
                                      const intSeg1hour = parseInt(
                                        seg1hour,
                                        10
                                      );
                                      const intSeg2hour = parseInt(
                                        seg2hour,
                                        10
                                      );
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
                                      let totalHours =
                                        intSeg1hour + intSeg2hour;
                                      let totalMins = intSeg1min + intSeg2min;

                                      // Calculate the difference in hours and minutes
                                      let totalHour =
                                        intdatadurationhour - totalHours;
                                      let totalMin =
                                        intdatadurationmin - totalMins;

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
                                          ? "0" + totalHour + "H"
                                          : totalHour + "H";
                                      let getmin =
                                        totalMin < 10
                                          ? "0" + totalMin + "M"
                                          : totalMin + "M";
                                      let totalduration =
                                        "Layover Time: " +
                                        gethour +
                                        " " +
                                        getmin;

                                      if (totalMin <= 0 || isNaN(totalMin)) {
                                        totalMin = 0; // Set minutes to 0 if it's less than or not a number
                                      }
                                      if (totalMin === 0 && totalHour === 0) {
                                        totalduration = "";
                                      }

                                      // console.log("totalduration",totalduration);

                                      return (
                                        <>
                                          <div
                                            key={segmentIndex}
                                            className="flight-shoe_dow_item submit-seg-bor col-md-12"
                                          >
                                            <div className="airline-details">
                                              <span className="airlineName fw-500">
                                                {flightname} |
                                              </span>
                                              <span className="flightNumber">
                                                {location.state.details.cabin} |{" "}
                                                {ariNumner} |{" "}
                                                {segment.carrierCode}
                                                &nbsp;
                                                {segment.number}
                                              </span>
                                            </div>
                                            <div className="flight_inner_show_component row">
                                              <div className="flight_det_wrapper col-md-5">
                                                <div className="flight_det">
                                                  <div className="code_time">
                                                    <span className="code">
                                                      {
                                                        segment.departure
                                                          .iataCode
                                                      }
                                                    </span>
                                                    <span className="time">
                                                      {
                                                        formattedDepartureTimeShow
                                                      }
                                                    </span>
                                                  </div>
                                                  <p className="airport">
                                                    Hazrat Shahjalal
                                                    International Airport
                                                  </p>
                                                  <p className="date">
                                                    {ansDate}
                                                  </p>
                                                </div>
                                              </div>
                                              <div className="flight_duration col-md-2">
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
                                                  <p className="airport">
                                                    Hazrat Shahjalal
                                                    International Airport
                                                  </p>
                                                  <p className="date">
                                                    {ans1Date}
                                                  </p>
                                                </div>
                                              </div>
                                              <div
                                                className="col-md-12"
                                                id="totalDurationElement"
                                              >
                                                <center>
                                                  <h5>
                                                    {/* Only display totalduration if it hasn't been displayed before */}
                                                    {segmentIndex === 0
                                                      ? <span className="layover">{totalduration}</span>
                                                      : ""}
                                                  </h5>
                                                </center>
                                              </div>
                                            </div>
                                          </div>
                                        </>
                                      );
                                    }
                                  )}
                                </div>
                              )
                            )}

                            {/* end code of segment 2  */}
                          </div>

                          {/* show more end */}
                        </div>
                      </div>
                      {/* row end above */}
                    </div>
                  );
                })}
              <div className="load_more_flight">
                <button className="btn btn_md">
                  <i className="fas fa-spinner" /> Load more..
                </button>
              </div>

              {/* row end */}
            </div>
            {/* col-end */}
          </div>
        </div>
      </section>
    </>
  );
};

export default FlightResult;
