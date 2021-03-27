import React from "react";
import FormattedText from "../../../hooks/FormattedText";

const IconBox = ({icon, item}) => {
  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-2">
      <i className={`${icon} text-dark margin-bottom-20`} />
      <h6 className="font-weight-normal margin-0">
        <FormattedText objectName={item} extension="Name" />
      </h6>
    </div>
  );
};

export default IconBox;
