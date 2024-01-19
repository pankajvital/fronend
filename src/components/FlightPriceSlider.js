import React, { useState } from 'react';

function FlightPriceSlider() {
  const [flightPrice, setFlightPrice] = useState(0);

  const handleSliderChange = (e) => {
    setFlightPrice(e.target.value);
  };

  return (
    <div>
      <label htmlFor="customRange2" className="form-label">
        Flight Price: ${flightPrice}
      </label>
      <div className='filter-s-l d-flex justify-content-between'>
        <h6>Min</h6>
        <h6>Max</h6>
      </div>
      <input
        type="range"
        className="form-range"
        min="0"
        max="500"
        id="customRange2"
        value={flightPrice}
        onChange={handleSliderChange}
      />
      <div className='filter-s-l d-flex justify-content-between'>
        <h6>200 USD</h6>
        <h6>400 USD</h6>
      </div>
    </div>
  );
}

export default FlightPriceSlider;
