import React from "react";
import TextBox from "./TextBox";

const TextSection = ({values}) => {
  return (
    <div className="section">
      <div className="container">
        <div className="row col-spacing-40">
          {
              values.map((item, key) => <TextBox key={key} item={item} />)
          }
        </div>
      </div>
    </div>
  );
};

export default TextSection;
