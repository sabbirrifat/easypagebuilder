import React, { useEffect, useState } from "react";
import "./Footer.css";
import Logo from "../Header/Logo/Logo";
import SocialLinks from "../Header/SocialLinks/SocialLinks";
import { connect } from "react-redux";
import FormattedText from "../../hooks/FormattedText";
import parse from "html-react-parser";

const Footer = ({ translation, colors }) => {
  const [usefulLinks, setUsefulLinks] = useState([]);
  const [additionalLinks, setAdditionalLinks] = useState([]);
  const [contactInfo, setContactInfo] = useState({});
  const [description, setDescription] = useState("");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/useful-links`)
      .then((res) => res.json())
      .then((data) => setUsefulLinks(data));

    fetch(`${process.env.REACT_APP_BACKEND_URL}/additional-links`)
      .then((res) => res.json())
      .then((data) => setAdditionalLinks(data));

    fetch(`${process.env.REACT_APP_BACKEND_URL}/footer-contact-info`)
      .then((res) => res.json())
      .then((data) => setContactInfo(data));
  }, []);

  const replaceLineBreak = (search, current) => {
    const substring = new RegExp(search, "gi");
    const result = current.replace(substring, `<br />`);
    return result;
  };

  useEffect(() => {
    const searchTerm = "\n";
    if (Object.keys(contactInfo).length) {
      setDescription(parse(replaceLineBreak(searchTerm, contactInfo.Info)));
    }
  }, [contactInfo]);

  return (
    <footer>
      <div className="section-sm" style={{ background: JSON.parse(colors.footers_color).css }}>
        <div className="container">
          <div className="row col-spacing-20">
            <div className="col-6 col-sm-6 col-lg-3">
              <div>
                <Logo />
              </div>
            </div>

            <div className="col-6 col-sm-6 col-lg-3 d-flex flex-column align-items-center">
              <h6 className="font-small font-weight-normal uppercase">
                {translation === "Hebrew" ? "קישורים שימושיים" : "Useful Links"}
              </h6>
              <ul className="list-dash">
                {usefulLinks.length
                  ? usefulLinks.map((item, key) => (
                      <li key={key}>
                        <a href={item.Link}>
                          {<FormattedText objectName={item} extension="Name" />}
                        </a>
                      </li>
                    ))
                  : null}
              </ul>
            </div>

            <div className="col-6 col-sm-6 col-lg-3 d-flex flex-column align-items-center">
              <h6 className="font-small font-weight-normal uppercase">
                {translation === "Hebrew"
                  ? "קישורים נוספים"
                  : "Additional Links"}
              </h6>
              <ul className="list-dash">
                {additionalLinks.length
                  ? additionalLinks.map((item, key) => (
                      <li key={key}>
                        <a href={item.Link}>
                          {<FormattedText objectName={item} extension="Name" />}
                        </a>
                      </li>
                    ))
                  : null}
              </ul>
            </div>

            <div className="col-6 col-sm-6 col-lg-3">
              <h6 className="font-small font-weight-normal uppercase">
                {translation === "Hebrew" ? "פרטים ליצירת קשר" : "Contact Info"}
              </h6>
              <ul className="list-unstyled">
                <p>{description}</p>
              </ul>
            </div>
          </div>
          {/* <!-- end row(1) --> */}
          <hr className="margin-top-30 margin-bottom-30" />
          <div className="row col-spacing-10">
            {translation === "Hebrew" ? (
              <>
                <div className="col-12 col-md-6 text-center text-md-right">
                  <SocialLinks />
                </div>
                <div className="col-12 col-md-6 text-center text-md-left">
                  <p>&copy; {new Date().getFullYear()} , כל הזכויות שמורות</p>
                </div>
              </>
            ) : (
              <>
                <div className="col-12 col-md-6 text-center text-md-left">
                  <p>&copy; {new Date().getFullYear()}, All Rights Reserved.</p>
                </div>
                <div className="col-12 col-md-6 text-center text-md-right">
                  <SocialLinks />
                </div>
              </>
            )}
          </div>{" "}
          {/* <!-- end row(2) --> */}
        </div>{" "}
        {/* <!-- end container --> */}
      </div>
    </footer>
  );
};

const mapStateToProps = ({ pages }) => ({
  translation: pages.translation,
  colors: pages.colors,
});

export default connect(mapStateToProps)(Footer);
