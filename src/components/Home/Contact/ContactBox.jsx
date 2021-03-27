import React, { useEffect, useState } from "react";
import parse from "html-react-parser";
import { connect } from "react-redux";

const ContactBox = ({ translation, item }) => {
  const [description, setDescription] = useState("");

  const replaceLineBreak = (search, current) => {
    const substring = new RegExp(search, "gi");
    const result = current.replace(substring, `<br />`);
    return result;
  };

  useEffect(() => {
    const searchTerm = "\n";
    setDescription(parse(replaceLineBreak(searchTerm, item[`Details_${translation}`] )));
  }, [item, translation]);

  return (
    <div className="col-12 col-sm-6 col-lg-3">
      <h6 className="font-small font-weight-medium uppercase">{item[`Name_${translation}`]}:</h6>
      <ul className="list-unstyled">
        <li>{description}</li>
      </ul>
    </div>
  );
};

const mapStateToProps = ({ pages }) => ({
  translation: pages.translation,
});
export default connect(mapStateToProps)( ContactBox);
