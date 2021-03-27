import React from 'react';
import Carousel from "react-bootstrap/Carousel";

const Slider = ({imgUrl, title, buttonText, buttonLink}) => {
    return (
      <Carousel.Item>
      <img
        className="d-block w-100"
        src={`${process.env.REACT_APP_BACKEND_URL}${imgUrl}`}
        alt="First slide"
      />
      <Carousel.Caption>
        <h1 className="font-weight-light">{title}</h1>
        <a
          className="button button-lg button-radius button-white-3 margin-top-30"
          href={buttonLink}
        >
          {buttonText}
        </a>
      </Carousel.Caption>
    </Carousel.Item>
    )
}


export default Slider
