import React, { useState } from "react";
import styles from "../styles/header.module.css"
import { Modal } from "./Modal";

export const Header = () => {
  const [openModal, setOpenModal] = useState(false)

  return (
    <>
     {openModal && <Modal setOpenModal={setOpenModal} />}
      <div className={`${styles.header}`}>
        <h1 className="">TODO LIST</h1>
        <i onClick={() => setOpenModal(true)} className="fa-solid fa-user"></i>
      </div>
    </>
  );
};
