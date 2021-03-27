import React, { useState, useEffect } from "react";
import OwlCarousel from "react-owl-carousel3";
import TestimonialBox from "./TestimonialBox";

const ClientReviews = ({ values }) => {
  const [display, setDisplay] = useState(false);
  let isMounted = false;

  useEffect(() => {
    isMounted = true;
    setDisplay(true);
    return () => {
      isMounted = false;
    };
  });

  const options = {
    loop: true,
    nav: false,
    dots: false,
    smartSpeed: 2000,
    margin: 30,
    autoplayHoverPause: true,
    autoplay: true,
    items: 1,
  };

  return (
    <div className="section border-top" dir="ltr">
      <div className="container">
        {values.length && display ? (
          <OwlCarousel className="owl-carousel" {...options}>
            {values.map((item, key) => (
              <TestimonialBox
                key={key}
                item={item}
                imgUrl={item.Profile_Picture.url}
              />
            ))}
          </OwlCarousel>
        ) : null}
        {/* end owl-carousel */}
      </div>
      {/* end container */}
    </div>
  );
};

export default ClientReviews;
