<div>
  {excelData.map((data, index) => {
    const flightclass = offer.travelerPricings[0].fareDetailsBySegment[0].class;

    let priceComponent;

    if (
      (data.airline === "" || data.airline === offer.itineraries[0].segments[0].carrierCode) &&
      data.type === "F" &&
      (data.trip === "" || data.trip === trip) &&
      (data.cabin === "" || data.cabin === cabin) &&
      (data.class === "" || data.class === flightclass) &&
      (data.stops === "" || data.stops === stops) &&
      (data.origin === "" || data.origin === location.state.details.origin) &&
      (data.destination === "" || data.destination === location.state.details.destination)
    ) {
      // Fixed Price (No Class or ClassMismatch)
      priceComponent = (
        <div>
          <h2 className="mb-3" style={{ fontSize: "25px" }}>
            ${(parseFloat(offer.travelerPricings[0].price.total) - parseFloat(data.markup_value)).toFixed(2)}
          </h2>
        </div>
      );
    } if (
      (data.airline === "" || data.airline === offer.itineraries[0].segments[0].carrierCode) &&
      data.type === "P" &&
      (data.trip === "" || data.trip === trip) &&
      (data.cabin === "" || data.cabin === cabin) &&
      (data.class === "" || data.class === flightclass) &&
      (data.stops === "" || data.stops === stops) &&
      (data.origin === "" || data.origin === location.state.details.origin) &&
      (data.destination === "" || data.destination === location.state.details.destination)
    ) {
      // Percentage Price
      priceComponent = (
        <div>
          <h2 className="mb-3" style={{ fontSize: "25px" }}>
            {(parseFloat(offer.travelerPricings[0].price.total) - (parseFloat(data.markup_value) / 100) * parseFloat(offer.travelerPricings[0].price.total)).toFixed(2)}
          </h2>
        </div>
      );
    } else {
      // Default Price
      priceComponent = (
        <div>
          <h2 className="mb-3" style={{ fontSize: "25px" }}>
            ${offer.travelerPricings[0].price.total}
          </h2>
        </div>
      );
    }

    return (
      <div key={index}>
        <ul style={{ listStyle: "none" }}>
          <li>{priceComponent}</li>
        </ul>
      </div>
    );
  })}
</div>







// old excel code
{excelData.map((data, index) => {
    const flightclass = offer.travelerPricings[0].fareDetailsBySegment[0].class;
    return (
      <div key={index}>
        <ul style={{listStyle: "none",}}>
          {(data.airline === "" || data.airline === offer.itineraries[0].segments[0].carrierCode) && data.type === "F" && (data.trip === "" || data.trip === trip) && (data.cabin === "" || data.cabin === cabin) && (data.class === "" || data.class === flightclass) && (data.stops === "" || data.stops === stops) && (data.origin === "" || data.origin === location.state.details.origin) && (data.destination === "" || data.destination ===
              location.state.details.destination) ? (
            <li>
              {data.class == "" ? (
                <div>
                  <h2 className="mb-3" style={{ fontSize: "25px" }}>
                  ${(parseFloat(offer.travelerPricings[0].price.total) - parseFloat(data.markup_value)).toFixed(2)}
  </h2>
                  {/* <h3 id="a">Fixed Price (No Class or ClassMismatch)</h3> */}
                </div>
              ) : data.class === flightclass ? (
                <div>
                  <h3>Fixed Price (Class match)</h3>
                  {(parseFloat(offer.travelerPricings[0].price.total) - parseFloat(data.markup_value)).toFixed(2)}
                </div>
              ) : null}
            </li>
          ) : (data.airline === "" || data.airline === offer.itineraries[0].segments[0].carrierCode) &&
            data.type === "P" && (data.trip === "" || data.trip === trip) && (data.cabin === "" || data.cabin === cabin) &&(data.class === "" || data.class === flightclass) && (data.stops === "" || data.stops === stops) && (data.origin === "" || data.origin === location.state.details.origin) && (data.destination === "" || data.destination === location.state.details.destination) ? (
            <li>
              {/* <h3>Percentage Price</h3> */}
              <h2 className="mb-3" style={{ fontSize: "25px" }}>
              {(parseFloat(offer.travelerPricings[0].price.total) - (parseFloat(data.markup_value) / 100) *
                  parseFloat(offer.travelerPricings[0].price.total)).toFixed(2)}</h2>
              {/* <br /> */}
            </li>
          ) : (
            <li>${offer.travelerPricings[0].price.total}</li>
          )}
        </ul>
      </div>
    );
  })}