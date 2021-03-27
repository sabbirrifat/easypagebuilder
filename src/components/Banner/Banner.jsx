import React from "react";
import FormattedText from "../../hooks/FormattedText";

const Banner = ({ values }) => {
  return (
    <div
      className="section-xl bg-image parallax"
      style={{ backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}${values[0].Image.url})`}}
    >
      <div className="bg-black-06">
        <div className="container text-center">
          <h1 className="font-weight-light">
            <FormattedText objectName={values[0]} extension="title" />
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Banner;
