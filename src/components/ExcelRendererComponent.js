import React, { useState,useEffect } from 'react';
import axios from 'axios';
import 'react-datasheet/lib/react-datasheet.css';

function ExcelRendererComponent() {
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
  return (
    <div>
  {Object.keys(excelData).map((key, index) => (
    <div key={index}>

      <ul>
        {Object.entries(excelData[key]).map(([innerKey, value], innerIndex) => (
          <li key={innerIndex}>{`${innerKey}: ${value}`}</li>
        ))}
      </ul>
    </div>
  ))}
    </div>
  );
  
}

export default ExcelRendererComponent;
