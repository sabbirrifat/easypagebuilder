import React from "react";
import { connect } from "react-redux";
import "./CartBox.css";

const CartBox = ({ price, year, billingChange, value, billingBox, save, translation }) => {
  return (
    <div className="col-md-4 col-lg-4 cart-box-parent">
      <div className="cart-box" onClick={() => billingChange(value)}>
        <p>
          <div
            className={`check-point ${value === billingBox ? "active" : ""}`}
          >
          </div>
          {year} Years
        </p>
        <h2>${price} USD/mo</h2>
        {
          save ?
          <p className="discount-save">
          <span>{translation === "Hebrew" ? " לשמור " : " Save "} {save}%</span>
        </p> : null
        }
        
      </div>
    </div>
  );
};

const mapStateToProps = ({ pages }) => ({
  translation: pages.translation,
});

export default connect(mapStateToProps)(CartBox);
