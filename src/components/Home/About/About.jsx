import React from "react";
import { connect } from "react-redux";
import FormattedText from "../../../hooks/FormattedText";

const About = ({ values, translation }) => {
  return (
    <div className="section">
      <div className="container">
        <div className="row align-items-center col-spacing-50">
          <div className="col-12 col-lg-6">
            <img
              className="border-radius"
              src={`${process.env.REACT_APP_BACKEND_URL}${values[0].About_Small_Image.url}`}
              alt=""
            />
          </div>
          <div className="col-12 col-lg-6">
            <h3 className={`font-weight-light margin-bottom-20 ${translation === 'Hebrew' ? 'text-md-right' : ''}`}>
              <FormattedText objectName={values[0]} extension="Title" />
            </h3>
            <p>
              <FormattedText objectName={values[0]} extension="Description" />
            </p>
            <a
              className="button-text-3 margin-top-40"
              href={values[0].Button_Link}
            >
              <FormattedText objectName={values[0]} extension="Button_Text" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = ({ pages }) => ({
  translation: pages.translation,
});

export default connect(mapStateToProps)(About);
