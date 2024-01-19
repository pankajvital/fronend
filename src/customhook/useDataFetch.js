import { useState, useEffect } from 'react';
import axios from 'axios';

// Replace these values with your Amadeus API credentials
// const clientId = '5uRRRNG7h9b2DoBGIDgWApV3qC9KszAq';
// const clientSecret = 'ZGXyMeA6sWW81duA';
const clientId = 'KEUu3vZkAEYsCq8snJUzcUl3GPkThNrM';
const clientSecret = 'b4G93MTdvTF4Pot3';
// below paid api 
// const clientId = 'PKgL34NqTF0Tjd1qBIjVqt8Ogagwynx3';
// const clientSecret = 'UZShahJjLWT4t7Th';

// const clientId = 'BpVyvFodRgC57CNu0O6t3FrDG7jiCnjG';
// const clientSecret = '2D5c35A1AgbzI9Yx'; 

// Amadeus token endpoint
const tokenUrl = 'https://test.api.amadeus.com/v1/security/oauth2/token';

// Custom hook to obtain an Amadeus access token
function useAmadeusAccessToken() {
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAccessToken() {
      const data = new URLSearchParams();
      data.append('grant_type', 'client_credentials');
      data.append('client_id', clientId);
      data.append('client_secret', clientSecret);

      try {
        const response = await axios.post(tokenUrl, data);
        const newAccessToken = response.data.access_token;
        setAccessToken(newAccessToken);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    }

    fetchAccessToken();
  }, []);

  return { accessToken, isLoading, error };
}

export default useAmadeusAccessToken;
