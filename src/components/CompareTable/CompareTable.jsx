import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import FormattedText from "../../hooks/FormattedText";
import "./CompareTable.css";

const CompareTable = ({ prices, handleCart, translation }) => {
  const [packages, setPackages] = useState([]);
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_URL}/web-hosting-packages`)
      .then((res) => res.json())
      .then((data) => {
        setPackages(data);
      });
  }, []);

  const saveCalc = (initialAmount, finalAmount) => {
    const result = 100 - (100 / initialAmount) * finalAmount;
    return Math.round(result);
  };

  return (
    <div className="container">
      <h1 className="text-center">
        {translation === "Hebrew"
          ? "השווה את חבילות אירוח האתרים שלנו"
          : "Compare Our Web Hosting Packages"}
      </h1>
      {packages.length ? (
        <div className="table-responsive">
          <table class="table table-bordered package-table">
          <thead>
            <tr>
              <th scope="col" style={{ height: "100px" }}></th>
              {packages.map((item, key) => {
                return (
                  <th
                    scope="col"
                    style={{
                      fontSize: "20px",
                      height: "100px",
                      lineHeight: "24px",
                      color: "#112240",
                    }}
                    key={key}
                  >
                    <FormattedText objectName={item} extension="Package_Name" />
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {packages[0].Features.map((subItem, subKey) => {
              return (
                <tr>
                  <th
                    scope="row"
                    style={{ width: "34%", color: "#112240", height: "50px" }}
                  >
                    <FormattedText objectName={subItem} extension="Feature_Name" />
                  </th>

                  {packages.map((item, key) => (
                    <td
                      key={key}
                      style={{ width: "22%", color: "#536080", height: "50px" }}
                    >
                      {item.Features[subKey].Check_Mark ? (
                        <i
                          class="fas fa-check"
                          style={{ color: "#ff7800", fontSize: "18px" }}
                        ></i>
                      ) : item.Features[subKey].Minus_Check ? (
                        <i
                          class="fas fa-minus"
                          style={{
                            color: "rgba(26, 26, 26, 0.5)",
                            fontSize: "18px",
                          }}
                        ></i>
                      ) : (
                        item.Features[subKey].Quota
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
            <tr>
              <th
                scope="row"
                style={{ width: "34%", color: "#112240", height: "120px" }}
              ></th>
              {prices.map((item, key) => {
                return (
                  <td key={key}>
                    <p
                      style={{
                        color: "rgba(26, 26, 26, 0.3)",
                        fontSize: "14px",
                        marginBottom: "8px",
                      }}
                    >
                      
                      <span style={{ textDecoration: "line-through" }}>
                        
                        ${item.Retail_Price}
                      </span>
                      <span
                        style={{
                          color: "#ff7800",
                          fontSize: "17px",
                          fontWeight: "bold",
                        }}
                      >
                        {translation === "Hebrew" ? " לשמור " : " Save "}
                        {saveCalc(item.Retail_Price, item.Price)}%
                      </span>
                    </p>
                    <span style={{ fontSize: "24px", marginTop: "8px" }}>
                      ${item.Price} USD
                    </span>
                    <button
                      className="button button-md button-grey button-rounded order-button"
                      style={{ marginTop: "12px" }}
                      onClick={() => handleCart(item)}
                    >
                      Order Now
                    </button>
                  </td>
                );
              })}
            </tr>
          </tbody>
        </table>
        </div>
        
      ) : null}
    </div>
  );
};

const mapStateToProps = ({ pages }) => ({
  translation: pages.translation,
});

export default connect(mapStateToProps)(CompareTable);
