import React from "react";
import styles from "../styles/confirmation.module.css";

const DeleteConfirmationModal = ({ handleConfirmRemove, toggleDeleteConfirmation, closeModal }) => {
  return (
    <div className={styles.modal}>
      <div className={styles.modal_content}>
        <p>คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้ออกจากตะกร้า?</p>
        <button className={styles.checkoutButton} onClick={handleConfirmRemove}>ใช่, ลบ</button>
        <button className={styles.closeButton} onClick={toggleDeleteConfirmation}>ยกเลิก</button>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
