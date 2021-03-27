import React from "react";
import FormattedText from "../../../hooks/FormattedText";

const ContactBox = ({ icon, item }) => {
  return (
    <div className="col-12 col-sm-6 col-md-3">
      <i className={`${icon} text-dark margin-bottom-20`} />
      <h6 className="font-weight-normal margin-0">
        {<FormattedText objectName={item} extension="Name" />}:
      </h6>
      <p>
        <FormattedText objectName={item} extension="Details" />
      </p>
    </div>
  );
};

export default ContactBox;
