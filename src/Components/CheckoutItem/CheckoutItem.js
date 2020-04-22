import React from "react";
import "./CheckoutItem.scss";

import { connect } from "react-redux";
import {
  clearItemFromCart,
  addItem,
  removeItem,
} from "../../Redux/Cart/cartActions";

//destructure
const CheckoutItem = ({ item, clearItem, addItem, removeItem }) => {
  const { name, imageUrl, price, quantity } = item;
  //this way we have acces to the whole item,
  //and the singledestructured properties

  return (
    <div className="checkout-item">
      <div className="image-container">
        <img src={imageUrl} alt="item" />
      </div>
      <span className="name">{name}</span>
      <span className="quantity">
        <div className="arrow" onClick={() => removeItem(item)}>
          &#10094;
        </div>
        <span className="value">{quantity}</span>
        <div className="arrow" onClick={() => addItem(item)}>
          &#10095;
        </div>
      </span>
      <span className="price">{price}</span>
      <div className="remove-button" onClick={() => clearItem(item)}>
        &#10005;
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  clearItem: (item) => dispatch(clearItemFromCart(item)),
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
});
//!image container: easier to control the size, restraining the image without affecting other sections
//*UTF 8 "icons"
export default connect(null, mapDispatchToProps)(CheckoutItem);
