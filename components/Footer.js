import React from 'react'
import styles from "../styles/footer.module.css";

export const Footer = () => {
  return (
    <>
     <div className={`${styles.footer}`}>
    <a href="#">
        <i className="fa-brands fa-instagram"></i>
      </a>
      <i className="fa-brands fa-linkedin"></i>
      <i className="fa-brands fa-github-alt"></i>
    </div>
    </>
  )
}
