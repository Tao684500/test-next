import React, { useState } from 'react';
import styles from "../styles/address.module.css";

const Address = () => {
    const [formData, setFormData] = useState({
        Name: '',
        Street: '',
        City: '',
        state: '',
        zipcode: '',
        country: '',
        phoen: ''
      });
    
      const [states, setStates] = useState(['State 1', 'State 2', 'State 3']); 
      const [countries, setCountries] = useState(['Country 1', 'Country 2', 'Country 3']); 
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
      };
  return (
    <div className={`${styles.address}`}>
    <form onSubmit={handleSubmit} className={`${styles.address_form}`}>
      <label className={`${styles.label}`}>
        Name*
        <input type="text" name="Name" value={formData.Name} onChange={handleChange} className={`${styles.input}`} />
      </label>

      <label className={`${styles.label}`}>
        Street*
        <input type="text" name="Street" value={formData.Street} onChange={handleChange} className={`${styles.input}`} />
      </label>

      <label className={`${styles.label}`}>
        City*
        <input type="text" name="City" value={formData.City} onChange={handleChange} className={`${styles.input}`} />
      </label>

      <label className={`${styles.label}`}>
        State*
        <select name="state" value={formData.state} onChange={handleChange} className={`${styles.select}`}>
          <option value="">Select State</option>
          {states.map((state, index) => (
            <option key={index} value={state}>{state}</option>
          ))}
        </select>
      </label>

      <label className={`${styles.label}`}>
        Zip Code*
        <input type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} className={`${styles.input}`} />
      </label>

      <label className={`${styles.label}`}>
        Country*
        <select name="country" value={formData.country} onChange={handleChange} className={`${styles.select}`}>
          <option value="">United Country</option>
          {countries.map((country, index) => (
            <option key={index} value={country}>{country}</option>
          ))}
        </select>
      </label>

      <label className={`${styles.label}`}>
        Phone
        <input type="text" name="phoen" value={formData.phoen} onChange={handleChange} className={`${styles.input}`} />
      </label>

      <div className={`${styles.button}`}>
        <button className={`${styles.save}`} type="submit">Save</button>
        <button className={`${styles.cancel}`} type="">Cancel</button>
      </div>
    </form>
  </div>
  )
}

export default Address