import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useDataFetcherWithToken from '../customhook/useDataFetch';
import { useLocation } from 'react-router-dom';

const Test = () => {
  const location = useLocation();
  const { accessToken, isLoading, error } = useDataFetcherWithToken();
  const [apiData, setApiData] = useState(null); // State variable to hold API data
console.log(apiData)
  useEffect(() => {
    if (isLoading) {
        return; 
    } else if (error) {
      // There was an error
    } else if (accessToken) {
      console.log('Access Token:', accessToken);

      let apiUrl = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=${location.state.details.origin}&destinationLocationCode=${location.state.details.destination}&departureDate=${location.state.details.from}&returnDate=${location.state.details.to}&adults=1&children=0&infants=0&travelClass=ECONOMY&nonStop=false&currencyCode=USD&max=15`;
      //// dynamic url

      const headers = {
        Authorization: `Bearer ${accessToken}`,
      };

      axios
        .get(apiUrl, { headers })
        .then((response) => {
          // Handle the response data here
          console.log('API Response:', response.data);
          setApiData(response.data); // Update the state with API data
        })
        .catch((apiError) => {
          // Handle API request errors here
          console.error('API Error:', apiError);
        });
    }
  }, [accessToken, isLoading, error, location.state.details]); // Include 'location.state.details' in the dependency array

  return (
    <>
      {/* Common Banner Area */}
      <section id="common_banner" className="top-page">
        {/* ... your HTML code ... */}
      </section>
      {/* Flight Search Areas */}
        {/* Flight Search Areas */}
        <section id="explore_area" className="section_padding">
        <div className="container">
          {/* Section Heading */}
          <div className="row">
            <div className="col-lg-12 col-md-12 col-sm-12 col-12">
              <div className="section_heading_center">
                {apiData ? ( // Check if apiData is available
                  <>
                    {apiData && <p>Currencies: {apiData.dictionaries.currencies.USD}</p>}
                  </>
                ) : (
                  // Display a loading indicator while loading
                  <p>Loading...</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <section id="explore_area" className="section_padding">
      <div className='container'>
      <ul>
        {apiData && apiData.data.map((item) => (
        //   <li key={item.id}>{item.price.currency}</li>
          <li key={item.id}>{item.price.currency}</li>
        ))}
      </ul>
      </div>
      </section> */}
    </>
  );
};

export default Test;
















