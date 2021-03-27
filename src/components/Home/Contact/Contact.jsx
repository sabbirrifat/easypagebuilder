import React from "react";
import ContactBox from "./ContactBox";

const Contact = ({ values }) => {
  return (
    <div className="section">
      <div className="container">
        <div className="row">
          {values.length
            ? values.map((item, key) => <ContactBox key={key} item={item} />)
            : null}
        </div>
        {/* end row */}
      </div>
      {/* end container */}
    </div>
  );
};

export default Contact;
