import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../styles/cards.module.css'; 
import Cart from './Cart'

const CardsPage = () => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://fakestoreapi.com/products');
        setData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = (productId) => {
    const itemToAdd = data.find(item => item.id === productId);
    setCart([...cart, { ...itemToAdd, quantity: 1 }]);
  };

  const handleIncreaseQuantity = (productId) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: item.quantity + 1 };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const handleDecreaseQuantity = (productId) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId && item.quantity > 1) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });
    setCart(updatedCart.filter(item => item.quantity > 0));
  };

  const handleRemoveFromCart = (productId) => {
    const updatedCart = cart.filter(item => item.id !== productId);
    setCart(updatedCart);
  };

  const handleQuantityChange = (productId, newQuantity) => {
    const updatedCart = cart.map(item => {
      if (item.id === productId) {
        return { ...item, quantity: parseInt(newQuantity) || 1 }; 
      }
      return item;
    });
    setCart(updatedCart);
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePagination = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  return (
    <div className={styles.container}>
      <h1>API Cards</h1>
      <div className={styles.cards_container}>
        {currentItems.map(item => (
          <div key={item.id} className={styles.card}>
            <img src={item.image} alt={item.title} className={styles.product_image} />
            <h2>{item.title}</h2>
            <p>{item.price}</p>
            <button onClick={() => handleAddToCart(item.id)}>Add to Cart</button>
          </div>
        ))}
      </div>
      <div className={styles.pagination}>
        <button onClick={() => handlePagination(1)}>First</button>
        <button onClick={() => handlePagination(currentPage - 1)} disabled={currentPage === 1}>Previous</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button key={i} onClick={() => handlePagination(i + 1)} className={currentPage === i + 1 ? styles.active : null}>
            {i + 1}
          </button>
        ))}
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
        <button onClick={() => handlePagination(totalPages)}>Last</button>
      </div>
      <Cart
        cart={cart}
        handleDecreaseQuantity={handleDecreaseQuantity}
        handleIncreaseQuantity={handleIncreaseQuantity}
        handleRemoveFromCart={handleRemoveFromCart}
        handleQuantityChange={handleQuantityChange}
        totalPrice={calculateTotalPrice()}
      />
    </div>
  );
};

export default CardsPage;
