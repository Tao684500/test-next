import React from "react";
import styles from "../styles/cart_item.module.css";

const CartItem = ({ item, handleQuantityChange, handleRemoveFromCart }) => {
  const calculateItemPrice = (item) => {
    return item.price * item.quantity;
  };

  return (
    <div>
      <div key={item.id} className={styles.cart_item}>
        <img src={item.image} alt={item.title} />
        <div className={styles.cart_item_info}>
          <h3>{item.title}</h3>
          <p>Price: {item.price}</p>
          <div>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
            />
          </div>
          <p>Total Price: ${calculateItemPrice(item)}</p>
          <button onClick={() => handleRemoveFromCart(item.id)}>Remove</button>
        </div>
      </div>
    </div>
  );
};

const Cart = ({
  cart,
  handleQuantityChange,
  handleRemoveFromCart,
  totalPrice,
}) => {
  return (
    <div className={styles.cart_container}>
      <div>
        <i class="fa-solid fa-basket-shopping"></i>
        <div>My Cart</div>
      </div>
      {cart.map((item) => (
        <CartItem
          key={item.id}
          item={item}
          handleQuantityChange={handleQuantityChange}
          handleRemoveFromCart={handleRemoveFromCart}
        />
      ))}
      <div>Total Price: ${totalPrice}</div>{" "}
      {/* แสดงค่า Total Price ที่ได้รับมา */}
    </div>
  );
};

export default Cart;
