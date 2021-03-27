import React from "react";
import "./CartItem.css";

const CartItem = ({
  item,
  domainName,
  deleteItem,
  hosting,
  priceWithYear,
  billingYear,
}) => {
  return (
    <div className="row cart-items-data d-flex justify-content-between">
      <div className="col-md-6 col-lg-7">
        {hosting ? (
          <p className="product-name">
            {item.Package_Name_English} - Web Hosting
          </p>
        ) : (
          <p className="product-name">{item.Package_Name_English}</p>
        )}

        <p className="poduct-domain">{domainName}</p>
      </div>

      <div className="col-md-3 col-lg-3">
        <p className="product-price">
          $
          {Object.prototype.hasOwnProperty.call(item, "Two_Year_Package_Price")
            ? priceWithYear(item, billingYear)
            : item.Price}{" "}
          USD
        </p>
      </div>

      <div className="col-md-2 col-lg-2">
        <button className="cart-item-delete" onClick={() => deleteItem(item)}>
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
