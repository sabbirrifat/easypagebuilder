import React from "react";
import ContactBox from "./ContactBox";

const ContactRow = ({ values }) => {
  return (
    <div className="section">
      <div className="container">
        <div className="row icon-4xl">
          {values.map((item, key) => (
            <ContactBox
              key={key}
              icon={item.Icon}
              item={item}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactRow;
