import React, { useState, useEffect } from "react";
import axios from "axios";
import useDataFetcherWithToken from "./useDataFetch";


function Getfullname(props) {
  const { accessToken, isLoading } = useDataFetcherWithToken();
  const [fullName, setFullName] = useState(""); // State to hold full name

  useEffect(() => {
    if (isLoading || !accessToken || !props.origin) {
      return;
    }

    const originApiUrl = `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${props.origin}`;
    // console.log('full name sssssssssssssss', originApiUrl)

    const headers = {
      Authorization: `Bearer ${accessToken}`,
    };

    axios
      .get(originApiUrl, { headers })
      .then((response) => {
        const originLocations = response.data?.data || [];
        console.log('origin location ssssssssssss', originLocations)
        if (originLocations.length > 0) {
          setFullName(originLocations[0].detailedName);
        } else {
          setFullName("Full Name Not Found");

        }
      })
      .catch((apiError) => {
        console.error("Origin API Error:", apiError);
        setFullName("Error Fetching Full Name");
      });

  }, [accessToken, isLoading, props.origin]); // Only depend on necessary values


  return (
    <div>
      {fullName !== "" ? (
        <span>{fullName}</span>
      ) : (
        <span>{isLoading ? "Loading..." : "Full Name Not Found"}</span>
      )}
    </div>
  );
}

export default Getfullname;





// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import useDataFetcherWithToken from "./useDataFetch";

// function GetFullName(props) {
//   const { accessToken, isLoading } = useDataFetcherWithToken();
//   const [fullName, setFullName] = useState(""); // State to hold full name
//   const [prevIATACode, setPrevIATACode] = useState(""); // State to hold previous IATA code

//   useEffect(() => {
//     if (isLoading || !accessToken || !props.origin || prevIATACode === props.origin) {
//       return;
//     }

//     const originApiUrl = `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${props.origin}`;

//     const headers = {
//       Authorization: `Bearer ${accessToken}`,
//     };

//     axios
//       .get(originApiUrl, { headers })
//       .then((response) => {
//         const originLocations = response.data?.data || [];
//         if (originLocations.length > 0) {
//           setFullName(originLocations[0].detailedName);
//         } else {
//           setFullName("Full Name Not Found");
//         }
//       })
//       .catch((apiError) => {
//         console.error("Origin API Error:", apiError);
//         setFullName("Error Fetching Full Name: " + apiError.message); // Update to include the error message
//       });
      

//     setPrevIATACode(props.origin); // Update previous IATA code

//   }, [accessToken, isLoading, props.origin, prevIATACode]); // Only depend on necessary values

//   return (
//     <div>
//       {fullName !== "" ? (
//         <span>{fullName}</span>
//       ) : (
//         <span>{isLoading ? "Loading..." : "Full Name Not Found"}</span>
//       )}
//     </div>
//   );
// }

// export default GetFullName;










// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function GetFullName(props) {
//   const { accessToken, isLoading } = useDataFetcherWithToken();
//   const [fullName, setFullName] = useState("");
//   const [prevIATACode, setPrevIATACode] = useState("");

//   const fetchData = () => {
//     if (isLoading || !accessToken || !props.origin || prevIATACode === props.origin) {
//       return;
//     }

//     const originApiUrl = `https://test.api.amadeus.com/v1/reference-data/locations?subType=CITY,AIRPORT&keyword=${props.origin}`;

//     const headers = {
//       Authorization: `Bearer ${accessToken}`,
//     };

//     axios
//       .get(originApiUrl, { headers })
//       .then((response) => {
//         const originLocations = response.data?.data || [];
//         if (originLocations.length > 0) {
//           setFullName(originLocations[0].detailedName);
//         } else {
//           setFullName("Full Name Not Found");
//         }
//       })
//       .catch((apiError) => {
//         console.error("Origin API Error:", apiError);
//         setFullName("Error Fetching Full Name: " + apiError.message);
//       });

//     setPrevIATACode(props.origin);
//   };

//   useEffect(() => {
//     fetchData(); // Trigger fetch on initial mount
//   }, []); // Empty dependency array ensures it runs once on mount

//   useEffect(() => {
//     fetchData(); // Trigger fetch when props.origin changes
//   }, [props.origin]); // Depend on props.origin

//   return (
//     <div>
//       {fullName !== "" ? (
//         <span>{fullName}</span>
//       ) : (
//         <span>{isLoading ? "Loading..." : "Full Name Not Found"}</span>
//       )}
//     </div>
//   );
// }

// export default GetFullName;
