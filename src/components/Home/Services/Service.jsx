import React from "react";
import FormattedText from "../../../hooks/FormattedText";

const Service = ({ icon, item }) => {
  return (
    <div className="col-12 col-md-6 col-lg-4">
      <div className="feature-box dark">
        <div className="feature-box-icon">
          <i className={icon} />
        </div>
        <h5 className="font-weight-normal">
          <FormattedText objectName={item} extension="Name" />
        </h5>
        <p>
          <FormattedText objectName={item} extension="Description" />
        </p>
      </div>
    </div>
  );
};

export default Service;
