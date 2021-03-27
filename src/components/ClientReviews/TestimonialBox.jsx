import React from "react";
import FormattedText from "../../hooks/FormattedText";


const TestimonialBox = ({ imgUrl, item }) => {
  return (
    <div className="testimonial-box">
      <p className="margin-bottom-30">
        "{<FormattedText objectName={item} extension="Review_Text" />}"
      </p>
      <img
        className="margin-bottom-20"
        src={`${process.env.REACT_APP_BACKEND_URL}${imgUrl}`}
        alt=""
        style={{ objectFit: "contain" }}
      />
      <h5 className="font-weight-normal margin-0 line-height-140">
        <FormattedText objectName={item} extension="Name" />
      </h5>
      <span>
        <FormattedText objectName={item} extension="Designation" />
      </span>
    </div>
  );
};

export default TestimonialBox;
