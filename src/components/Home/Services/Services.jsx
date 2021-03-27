import React from "react";
import Service from "./Service";

const Services = ({ values }) => {
  return (
    <div className="section">
      <div className="container">
        <div className="margin-bottom-70">
          <div className="row">
            <div className="col-12 col-md-10 col-lg-8 col-xl-7">
            </div>
          </div>
          {/* end row */}
        </div>
        <div className="row">
          {values.length
            ? values.map((item, key) => (
                <Service
                  key={key}
                  icon={item.Icon}
                  item={item}
                />
              ))
            : null}
        </div>
        {/* end row */}
      </div>
      {/* end container */}
    </div>
  );
};



export default Services;
