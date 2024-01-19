import React, { useState, useEffect } from 'react';
import axios from 'axios';
import useDataFetcherWithToken from "../customhook/useDataFetch";

const SortTest = () => {
  const { accessToken, isLoading, error } = useDataFetcherWithToken();
  const [flightOffers, setFlightOffers] = useState([]);
  const [loadingOffers, setLoadingOffers] = useState(false);

  useEffect(() => {
    async function fetchFlightOffers() {
      if (accessToken) {
        setLoadingOffers(true);
        try {
          const apiUrl = `https://test.api.amadeus.com/v2/shopping/flight-offers?originLocationCode=JFK`;
          const headers = {
            Authorization: `Bearer ${accessToken}`,
        };

          const response = await axios.get(apiUrl, { headers });

          // Log the response data
          console.log('API Response:', response.data);

          // Check if response.data is an array before setting state
          if (Array.isArray(response.data)) {
            setFlightOffers(response.data);
          } else {
            setFlightOffers([]); // Set as empty array if response.data is not an array
          }
          setLoadingOffers(false);
        } catch (error) {
          console.error('Error fetching flight offers:', error);
          setLoadingOffers(false);
        }
      }
    }

    fetchFlightOffers();
  }, [accessToken]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: Unable to fetch access token</p>;
  }

  return (
    <div>
      {loadingOffers ? (
        <p>Loading flight offers...</p>
      ) : (
        <ul>
          {flightOffers.map((offer, index) => (
            <li key={index}>{JSON.stringify(offer)}</li>    
          ))}
        </ul>
      )}
    </div>
  );
};

export default SortTest;