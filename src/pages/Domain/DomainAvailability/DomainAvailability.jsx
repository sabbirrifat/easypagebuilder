import React, { useEffect, useState } from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import "./DomainAvailability.css";
import { connect } from "react-redux";

const DomainAvailability = ({ domainName, handleNext,translation, clientAPI }) => {
  const [domainAvailability, setDomainAvailability] = useState("");

  useEffect(() => {
    fetch(`https://domain-availability.whoisxmlapi.com/api/v1?apiKey=${clientAPI}&domainName=${domainName}&credits=DA`)
      .then((res) => res.json())
      .then((data) => setDomainAvailability(data.DomainInfo.domainAvailability));
  }, [domainName]);

  return (
    <div className="row domain-availablity-check">
      {domainAvailability ? (
        <div className="domain-availablity-check-items col-md-12 col-lg-12">
          {domainAvailability === 'AVAILABLE' ? (
            <>
              <p style={{ color: "#078021" }}>
                {
                  translation === 'Hebrew' ? `מזל טוב, ה- ${domainName} שלך זמין.` : 
                  `Congratulation, your ${domainName} is available.`
                }
                
              </p>
              <button onClick={() => handleNext('custom')}>Next</button>
            </>
          ) : domainAvailability === 'UNAVAILABLE' ? (
            <p style={{ color: "#d31f1f" }}>
              {
                  translation === 'Hebrew' ? `מצטערים, ה- ${domainName} שלך אינו זמין.` : 
                  `Sorry, your ${domainName} is not available.`
                }
            </p>
          ) : null }
        </div>
      ) : (
        <CircularProgress color="inherit" />
      )}
    </div>
  );
};

const mapStateToProps = ({ pages }) => ({
  translation: pages.translation,
});

export default connect(mapStateToProps)(DomainAvailability);
