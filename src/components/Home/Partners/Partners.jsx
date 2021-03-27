import React, { useEffect, useState } from "react";
import OwlCarousel from "react-owl-carousel3";
import Partner from "./Partner";

const Partners = ({ values }) => {
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
    responsive: {
      0: {
        items: 2,
      },
      576: {
        items: 3,
      },
      768: {
        items: 4,
      },
      1200: {
        items: 5,
      },
    },
  };

  return (
    <div className="section-sm bg-grey-lighter" dir="ltr">
      <div className="container text-center">
        {
          values[0]["Images"].length && display ?
            <OwlCarousel
              className="partner-slider owl-carousel owl-theme"
              {...options}
            >
              { values[0]["Images"].map((item, key) => <Partner key={key} imgUrl={item.url} />) }
              
            </OwlCarousel> : null
        }
        
        {/* end owl-carousel */}
      </div>
      {/* end container */}
    </div>
  );
};



export default Partners;
