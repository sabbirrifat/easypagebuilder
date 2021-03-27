import React from "react";
import { connect } from "react-redux";
import FormattedText from "../../../hooks/FormattedText";

const Feature = ({ icon, item, translation }) => {
  return (
    <>
      {translation === "Hebrew" ? (
        <div className="col-12 col-lg-4">
          <div className="text-dark margin-bottom-20 margin-lg-bottom-30 d-flex">
            <i className={icon} />
          </div>
          <h6 className="font-weight-medium font-small uppercase d-flex">
            <FormattedText objectName={item} extension="Name" />
          </h6>
          <p>
            <FormattedText objectName={item} extension="Description" />
          </p>
        </div>
      ) : (
        <div className="col-12 col-lg-4">
          <div className="text-dark margin-bottom-20 margin-lg-bottom-30">
            <i className={icon} />
          </div>
          <h6 className="font-weight-medium font-small uppercase">
            <FormattedText objectName={item} extension="Name" />
          </h6>
          <p>
            <FormattedText objectName={item} extension="Description" />
          </p>
        </div>
      )}
    </>
  );
};

const mapStateToProps = ({ pages }) => ({
  translation: pages.translation,
});

export default connect(mapStateToProps)(Feature);
