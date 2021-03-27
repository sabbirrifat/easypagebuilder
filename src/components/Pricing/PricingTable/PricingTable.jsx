import React from "react";
import { addCartItem, addHostingItem } from "../../../Redux/Cart/cart-action";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import CompareTable from "../../CompareTable/CompareTable";
import PriceBox from "./PriceBox";

const PricingTable = ({ values, translation, addItem, addHostingPack }) => {
  const history = useHistory();
  const handleCart = (item) => {
    addItem(item);
    addHostingPack(item);
    history.push("/domain");
  };

  return (
    <>
      <div className="section-lg padding-bottom-2">
        <div className="container">
          <div className="margin-bottom-70">
            <div className="row text-center">
              <div className="col-12 col-md-10 offset-md-1 col-lg-8 offset-lg-2">
                <h2>
                  {translation === "Hebrew" ? "טבלת תמחור" : "Pricing Table"}
                </h2>
                <p>
                  {translation === "Hebrew"
                    ? "מחקר לתואר ראשון. מסה של יסמין. כאשר מושך קרניים הרי סופרבול באופן מיידי"
                    : "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus"}
                </p>
              </div>
            </div>
          </div>
          <div className="row">
            {translation === "English"
              ? values.map((item, key) => {
                  if (key === 1) {
                    return (
                      <PriceBox
                        key={key}
                        item={item}
                        price={item.Price}
                        recommended={true}
                        handleCart={handleCart}
                      />
                    );
                  } else {
                    return (
                      <PriceBox
                        key={key}
                        item={item}
                        price={item.Price}
                        recommended={false}
                        handleCart={handleCart}
                      />
                    );
                  }
                })
              : values.map((item, key) => {
                  if (key === 1) {
                    return (
                      <PriceBox
                        key={key}
                        item={item}
                        price={item.Price}
                        recommended={true}
                        handleCart={handleCart}
                      />
                    );
                  } else {
                    return (
                      <PriceBox
                        key={key}
                        item={item}
                        price={item.Price}
                        recommended={false}
                        handleCart={handleCart}
                      />
                    );
                  }
                })}
          </div>
        </div>
      </div>
      <CompareTable prices={values} handleCart={handleCart} />
    </>
  );
};

const mapStateToProps = ({ pages }) => ({
  translation: pages.translation,
});

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addCartItem(item)),
  addHostingPack: (item) => dispatch(addHostingItem(item))
});

export default connect(mapStateToProps, mapDispatchToProps)(PricingTable);
