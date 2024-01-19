import React from 'react';
// import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';

const HomeCarousel = () => {
//   const carouselOptions = {
//     items: 3, // Number of items to display in the carousel
//     loop: true, // Enable looping
//     nav: true, // Display navigation arrows
//     dots: true, // Display navigation dots
//     margin: 10, // Space between items
//   };

  // Define an array of tour items
  const tourItems = [
    {
      imageSrc: 'images/hotel1.png',
      location: 'New beach, Thailand',
      hotelName: 'Kantua hotel, Thailand',
      rating: '4.8/5 Excellent',
      reviewCount: '(1214 reviews)',
      price: '$99.00',
    },
    // Add more tour items as needed
  ];

  return (
    <section id="promotional_tours" className="section_padding_top">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="promotional_tour_slider owl-theme owl-carousel dot_style" >
              {tourItems.map((item, index) => (
                <div key={index} className="theme_common_box_two img_hover">
                  <div className="theme_two_box_img">
                    <a href="hotel-details.html">
                      <img src={item.imageSrc} alt="img" />
                    </a>
                    <p>
                      <i className="fas fa-map-marker-alt" />
                      {item.location}
                    </p>
                  </div>
                  <div className="theme_two_box_content">
                    <h4>
                      <a href="hotel-details.html">{item.hotelName}</a>
                    </h4>
                    <p>
                      <span className="review_rating">{item.rating}</span>
                      <span className="review_count">{item.reviewCount}</span>
                    </p>
                    <h3>
                      {item.price} <span>Price starts from</span>
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCarousel;
