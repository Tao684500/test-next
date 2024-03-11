import React, { useState } from "react";
import styles from "../styles/cart_item.module.css";
import DeleteConfirmationModal from "./DeleteConfirmationModal";
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/router'; // เพิ่ม import

const CartItem = ({ item, handleQuantityChange, handleRemoveFromCart }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const toggleDeleteConfirmation = () => {
    setShowDeleteConfirmation(!showDeleteConfirmation);
  };

  const handleConfirmRemove = () => {
    handleRemoveFromCart(item.id);
    toggleDeleteConfirmation();
  };

  const calculateItemPrice = (item) => {
    return item.price * item.quantity;
  };

  return (
    <div>
      <div key={item.id} className={styles.cart_item}>
        <img src={item.image} alt={item.title} className={styles.image} />
        <div className={styles.cart_item_info}>
          <div className={styles.title}>{item.title}</div>
          <p className={styles.price}>${item.price}</p>
          <div>
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
              className={styles.input}
            />
          </div>
          <p className={styles.price}>${calculateItemPrice(item)}</p>
          <div>
            <button className={styles.closeButton} onClick={toggleDeleteConfirmation}>
              Remove
            </button>
          </div>
        </div>
      </div>
      {showDeleteConfirmation && (
        <DeleteConfirmationModal
          handleConfirmRemove={handleConfirmRemove}
          toggleDeleteConfirmation={toggleDeleteConfirmation}
        />
      )}
    </div>
  );
};

const Cart = ({
  cart,
  handleQuantityChange,
  handleRemoveFromCart,
  totalPrice,
  closeModal,
}) => {
  const { currentUser } = useAuth();
  const router = useRouter(); 

  const handleCheckout = () => {
    if (!currentUser) {
     
      alert("กรุณาล็อกอินเพื่อทำการสั่งซื้อสินค้า");
      router.push('/login'); 
    } else {
      alert("กำลังเดินทางไปยังหน้ากรอกที่อยู่...");
      router.push('/Address'); 
    }
  };
  

  return (
    <div className={styles.cart_container}>
      <div className={styles.text_detail}>
        <i className={`fa-solid fa-basket-shopping ${styles.icon_h}`}></i>
        <div className={`${styles.text_h}`}>ตะกร้าของฉัน</div>
      </div>
      <div className={styles.detail}>
        {cart.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            handleQuantityChange={handleQuantityChange}
            handleRemoveFromCart={handleRemoveFromCart}
          />
        ))}
      </div>
      <div className={`${styles.cart_item} ${styles.detail_total}`}>
        <div className={`${styles.price} `}>รวมทั้งหมด</div>
        <div className={styles.price}>${totalPrice}</div>{" "}
   
      </div>
      <button onClick={handleCheckout} className={styles.checkoutButton}>Checkout</button>
      <button onClick={closeModal} className={styles.closeButton}>ปิด</button>
    </div>
  );
};

export default Cart;
