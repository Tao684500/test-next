import React, { useState } from "react";
import styles from "../styles/header.module.css";
import { useAuth } from '../context/AuthContext';
import { useRouter } from 'next/router'; 

export const Header = () => {
  const { currentUser, logout } = useAuth();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false); 

  const handleLogoutClick = () => {
    if (currentUser) {
      logout(); 
      router.push('/'); 
    }
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className={styles.header}>
      <h1 className="">NUTTAWUT TAO</h1>
      <div className={styles.link}>
        <div><a href="/">Home</a></div>
        <div><a href="/UserDashboard">ToDo</a></div>
        <div className={styles.dropdown}>
          <i className={`fa-solid fa-user ${styles.icon} ${dropdownOpen ? styles.active : ''}`} onClick={toggleDropdown}></i>
          <div className={`${styles.dropdownContent} ${dropdownOpen ? styles.show : ''}`}>
            {currentUser ? (
              <div>
                <div>สวัสดีครับ</div>
                <button onClick={handleLogoutClick}>Logout</button>
              </div>
            ) : (
              <div>
                <div>กรุณาล็อกอิน</div>
                <button onClick={() => router.push('/login')}>Login</button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
