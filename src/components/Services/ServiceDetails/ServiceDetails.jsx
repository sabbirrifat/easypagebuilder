import React from "react";
import { connect } from "react-redux";
import DetailsBox from "./DetailsBox";

const ServideDetails = ({ values, translation }) => {
  return (
    <div className="section border-top">
      <div className="container">
        {values.map((item, key) => {
          if ((key + 1) % 2 === 0) {
            return (
              <DetailsBox
                key={key}
                right={true}
                imgUrl={item.Image.url}
                item={item}
                link={item.Link}
                translation={translation}
              />
            );
          } else {
            return (
              <DetailsBox
                key={key}
                right={false}
                imgUrl={item.Image.url}
                item={item}
                link={item.Link}
                translation={translation}
              />
            );
          }
        })}
      </div>
    </div>
  );
};

const mapStateToProps = ({ pages }) => ({
  translation: pages.translation,
});

export default connect(mapStateToProps)(ServideDetails);
