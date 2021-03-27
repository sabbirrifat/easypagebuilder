import React from "react";
import FormattedText from "../../../hooks/FormattedText";

const AchievementBox = ({ item }) => {
  return (
    <div className="col-6 col-md-4 col-lg-2">
      <h2 className="font-weight-light margin-0">
        <span className="counter">
          <FormattedText objectName={item} extension="Number" />
        </span>
      </h2>
      <p>
        <FormattedText objectName={item} extension="Name" />
      </p>
    </div>
  );
};

export default AchievementBox;
