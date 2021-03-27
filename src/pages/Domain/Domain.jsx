import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header/Header";
import { addCartItem } from "../../Redux/Cart/cart-action";
import axios from 'axios'
import {
  updateCustomDomain,
  updateUserDomain,
} from "../../Redux/Domain/domain-action";
import "./Domain.css";
import DomainAvailability from "./DomainAvailability/DomainAvailability";

const Domain = ({
  updateCustomDomain,
  updateUserDomain,
  addCartItem,
  cartItems,
  translation,
}) => {
  const [searchStatus, setSearchStatus] = useState(false);
  const [customDomainName, setCustomDomainName] = useState("");
  const [userDomainName, setUserDomainName] = useState("");
  const [domainClientAPI, setDomainClientAPI] = useState("");
  const [domainNameEmpty, setDomainNameEmpty] = useState(false);
  const [userDomainValidate, setUserDomainValidate] = useState(false);
  const [customDomainValidate, setCustomDomainValidate] = useState(false);
  const [domainprice,setdomainprice] = useState({});
  const [domainData,setdomainData] = useState({});
  useEffect(() => {
    axios.get(process.env.REACT_APP_BACKEND_URL+'/domain-price').then(res=>{
      setdomainData({
        id: 11,
        Package_Name_English: "Domain - Registration",
        Price: res.data.Price,
        Type: "custom",
      })
    })
  }, []);
  let history = useHistory();
  const handleCustomDomain = (event) => {
    let re = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/;
    if (re.test(String(event.target.value).toLowerCase())) {
      setCustomDomainValidate(false);
      setSearchStatus(false);
    }
    else{
      setCustomDomainValidate(true);
    }
    setCustomDomainName(event.target.value);
  };
  const handleUserDomain = (event) => {
    setUserDomainName(event.target.value);
    let re = /^((https?|ftp|smtp):\/\/)?(www.)?[a-z0-9]+\.[a-z]+(\/[a-zA-Z0-9#]+\/?)*$/;
    if (re.test(String(event.target.value).toLowerCase())) {
      setUserDomainValidate(false);
    }
    else{
      setUserDomainValidate(true);
    }
  };
  const handleNext = (status) => {
    if (status === "custom") {
      addCartItem(domainData);
      updateCustomDomain(customDomainName);
      setSearchStatus(false);
      setCustomDomainName("");
      setUserDomainName("");
      history.push("/cart");
    } else if (status === "user") {
      if (userDomainName) {
        setDomainNameEmpty(false);
        updateUserDomain(userDomainName);
        setSearchStatus(false);
        setCustomDomainName("");
        setUserDomainName("");
        history.push("/cart");
      } else {
        setDomainNameEmpty(true);
      }
    }
  };

  const handleDomainSearch = () => {
    if(!customDomainValidate && customDomainName){
      setSearchStatus(true) 
    }
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/domain-availability`)
      .then((res) => res.json())
      .then((data) => setDomainClientAPI(data.API));
  }, []);

  return (
    <>
      <Header blackBack={true} />
      <div
        className="container domain-choose-section"
        style={{ marginTop: "180px", marginBottom: "280px" }}
      >
        {cartItems.length ? (
          <>
            {translation === "Hebrew" ? (
              <div className="row domain-choose-header">
                <h1 className="text-center col-md-12 col-lg-12">
                  ראשית, בוא נקבל את הגדרת הדומיין שלך
                </h1>
                <p className="text-center col-md-12 col-lg-12">
                  הדומיין שלך יהיה הכתובת לאתר שלך.
                </p>
                <p className="text-center col-md-12 col-lg-12">
                  אתה יכול לרשום דומיין חדש או להשתמש בתחום שכבר בבעלותך.
                </p>
              </div>
            ) : (
              <div className="row domain-choose-header">
                <h1 className="text-center col-md-12 col-lg-12">
                  First, Let's Get Your Domain Setup
                </h1>
                <p className="text-center col-md-12 col-lg-12">
                  Your domain will be the address to your website.
                </p>
                <p className="text-center col-md-12 col-lg-12">
                  You can register a new domain or use one you already own.
                </p>
              </div>
            )}

            <div className="row domain-choose-body">
              <div className="domain-choose-box col-md-5 col-lg-5">
                {translation === "Hebrew" ? (
                  <>
                    <h1>רשום דומיין חדש</h1>
                    <p>חפש דומיינים זמינים</p>
                    {customDomainValidate ? (
                      <p style={{ color: "red" }}>* הזן דומיין חוקי </p>
                    ) : null}
                    <input
                      type="text"
                      onChange={handleCustomDomain}
                      value={customDomainName}
                      placeholder="חפש דומיין ..."
                    />
                    <button onClick={handleDomainSearch}>לחפש</button>
                  </>
                ) : (
                  <>
                    <h1>Register a new domain</h1>
                    <p>Search available domains</p>
                    {customDomainValidate ? (
                      <p style={{ color: "red" }}>Enter a valid domain *</p>
                    ) : null}
                    <input
                      type="text"
                      onChange={handleCustomDomain}
                      value={customDomainName}
                      placeholder="Search domain..."
                    />
                    <button onClick={handleDomainSearch}>
                      Search
                    </button>
                  </>
                )}
              </div>
              <div className="choose-box-middle col-md-1 col-lg-1">
                <p>{translation === "Hebrew" ? "אוֹ" : "or"}</p>
              </div>
              <div className="domain-choose-box col-md-5 col-lg-5">
                {translation === "Hebrew" ? (
                  <>
                    <h1>השתמש בדומיין שבבעלותך</h1>
                    <p>הזן את התחום הקיים שלך</p>
                    {domainNameEmpty ? (
                      <p style={{ color: "red" }}>* זהו שדה חובה </p>
                    ) : null}
                    {userDomainValidate ? (
                      <p style={{ color: "red" }}>* הזן דומיין חוקי </p>
                    ) : null}
                    <input
                      type="text"
                      onChange={handleUserDomain}
                      value={userDomainName}
                      placeholder="הזן את הדומיין שלך ..."
                    />
                  </>
                ) : (
                  <>
                    <h1>Use a domain you own</h1>
                    <p>Enter your existing domain</p>
                    {domainNameEmpty ? (
                      <p style={{ color: "red" }}>This field is required *</p>
                    ) : null}
                    {userDomainValidate ? (
                      <p style={{ color: "red" }}>Enter a valid domain *</p>
                    ) : null}

                    <input
                      type="text"
                      onChange={handleUserDomain}
                      value={userDomainName}
                      placeholder="Enter your domain..."
                    />
                  </>
                )}
                <button onClick={() => handleNext("user")}>
                  {translation === "Hebrew" ? "הַבָּא" : "Next"}
                </button>
              </div>
            </div>
            {searchStatus ? (
              <DomainAvailability
                domainName={customDomainName}
                handleNext={handleNext}
                clientAPI={domainClientAPI}
              />
            ) : null}
          </>
        ) : translation === "Hebrew" ? (
          <h1 className="text-center" style={{ marginBottom: "600px" }}>
            העגלה שלך ריקה
          </h1>
        ) : (
          <h1 className="text-center" style={{ marginBottom: "600px" }}>
            Your Cart is Empty
          </h1>
        )}
      </div>
      <Footer />
    </>
  );
};

const mapStateToProps = ({ cart, pages }) => ({
  cartItems: cart.cart,
  translation: pages.translation,
});

const mapDispatchToProps = (dispatch) => ({
  updateCustomDomain: (name) => dispatch(updateCustomDomain(name)),
  updateUserDomain: (name) => dispatch(updateUserDomain(name)),
  addCartItem: (item) => dispatch(addCartItem(item)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Domain);
