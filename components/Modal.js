import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { useAuth } from '../context/AuthContext';
import styles from '../styles/modal.module.css'; // Import your modal styles

export const Modal = (props) => {
  const { setOpenModal } = props;
  const { logout } = useAuth();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      setOpenModal(false);
    }, 300); // Adjust the duration to match your CSS transition time
  };

  const modalStyles = {
    modalContainer: {
      position: 'fixed',
      inset: 0,
      backgroundColor: 'white',
      color: '#374151',
      fontSize: '1.25rem',
      display: 'flex',
      flexDirection: 'column',
      transform: isVisible ? 'translateX(0)' : 'translateX(100%)',
      transition: 'transform 0.5s',
    },
    header: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottom: '1px solid #374151',
      padding: '1rem',
    },
    title: {
      fontWeight: 'bold',
      fontSize: '1.25rem',
      userSelect: 'none',
    },
    closeIcon: {
      fontSize: '1rem',
      cursor: 'pointer',
    },
    content: {
      padding: '1rem',
      display: 'flex',
      flexDirection: 'column',
      gap: '0.75rem',
    },
    logoutButton: {
      cursor: 'pointer',
      transition: 'padding-left 0.5s',
      ':hover': {
        paddingLeft: '0.5rem',
      },
    },
  };

  return ReactDOM.createPortal(
    <div style={modalStyles.modalContainer}>
      <div style={modalStyles.header}>
        <h1 style={modalStyles.title}>MENU</h1>
        <i onClick={closeModal} className="fa-solid fa-xmark" style={modalStyles.closeIcon}></i>
      </div>
      <div style={modalStyles.content}>
        <h2
          onClick={() => {
            logout();
            closeModal();
          }}
          style={modalStyles.logoutButton}
        >
          Logout
        </h2>
      </div>
    </div>,
    document.getElementById('portal')
  );
};
