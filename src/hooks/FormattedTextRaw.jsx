import React from "react";
import { connect } from "react-redux";

const FormattedText = ({translation, text}) => {
  return (
      <>
      {
          objectName ? objectName[`${extension}_${translation}`] : null
      }
      </>
  )
};

const mapStateToProps = ({ pages }) => ({
  translation: pages.translation,
});

export default connect(mapStateToProps)(FormattedText);
