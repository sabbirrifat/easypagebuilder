import React from "react";

const Partner = ({imgUrl}) => {
  return (
    <div className="client-box">
      <a href="/">
        <img src={`${process.env.REACT_APP_BACKEND_URL}${imgUrl}`} alt="" />
      </a>
    </div>
  );
};

export default Partner;
