import React from "react";
import { connect } from "react-redux";
import FormattedText from "../../hooks/FormattedText";

const Parallax = ({ values, translation }) => {  
    return (
        <div
        className="section-xl bg-image parallax"
        style={{ backgroundImage: `url(${process.env.REACT_APP_BACKEND_URL}${values[0].Banner_Image.url})`}}
      >
        {
          translation === 'Hebrew' ? <div className="bg-black-05">
          <div className="container text-right">
            <h1 className="font-weight-light">
              <FormattedText objectName={values[0]} extension="Banner_Text" />
            </h1>
            <a
              className="button button-lg button-radius button-white-3 margin-top-20"
              href={values[0].Button_Link}
            >
              <FormattedText objectName={values[0]} extension="Button_Text" />
            </a>
          </div>
        </div> :
        <div className="bg-black-05">
        <div className="container text-left">
          <h1 className="font-weight-light">
            <FormattedText objectName={values[0]} extension="Banner_Text" />
          </h1>
          <a
            className="button button-lg button-radius button-white-3 margin-top-20"
            href={values[0].Button_Link}
          >
            <FormattedText objectName={values[0]} extension="Button_Text" />
          </a>
        </div>
      </div>
        }
        



      </div>
    )
}

const mapStateToProps = ({ pages }) => ({
  translation: pages.translation,
});

export default connect(mapStateToProps)(Parallax)
