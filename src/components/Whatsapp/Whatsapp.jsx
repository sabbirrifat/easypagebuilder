import React, { useEffect, useState } from "react";
import WhatsAppWidget from "react-whatsapp-widget";
import "./WhatsApp.css";
import "react-whatsapp-widget/dist/index.css";
import { connect } from "react-redux";

const Whatsapp = ({ translation }) => {
  const [whatsAppData, setWhatsAppData] = useState("");
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/whats-app`)
      .then((res) => res.json())
      .then((data) => setWhatsAppData(data));
  }, []);

  return (
    <>
      {Object.keys(whatsAppData).length ? (
        <>
          {translation === "Hebrew" ? (
            <div
              className="whatsapp-button left"
              dir="rtl"
            >
              <WhatsAppWidget
                phoneNumber={whatsAppData.Phone}
                textReplyTime={whatsAppData[`Reply_Delay_Text_${translation}`]}
                companyName={whatsAppData[`CompanyName_${translation}`]}
                message={whatsAppData[`Initial_Message_${translation}`]}
                sendButton={whatsAppData[`Sendbutton_Text_${translation}`]}
              />
            </div>
          ) : (
            <div
              className="whatsapp-button"
            >
              <WhatsAppWidget
                phoneNumber={whatsAppData.Phone}
                textReplyTime={whatsAppData[`Reply_Delay_Text_${translation}`]}
                companyName={whatsAppData[`CompanyName_${translation}`]}
                message={whatsAppData[`Initial_Message_${translation}`]}
                sendButton={whatsAppData[`Sendbutton_Text_${translation}`]}
              />
            </div>
          )}
        </>
      ) : null}
    </>
  );
};

const mapStateToProps = ({ pages }) => ({
  translation: pages.translation,
});

export default connect(mapStateToProps)(Whatsapp);
