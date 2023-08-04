import React, { useEffect, useState } from 'react';
import '../navbar/Navbar.css';
import { BsFillCartPlusFill } from "react-icons/bs";
import Carts from "../carts/Carts.js";
import Amazon from '../amazon/Amazon';

const Navbar = () => {
  const [page, setPage] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const handleAmazon = () => {
    setPage(false);
  }
  const handleCarts = () => {
    setPage(true);
  }


  const handleAdd = (item) => {
    let isPresent = false;
    cartItems?.forEach(data => {
      if (data.id === item.id) {
        isPresent = true;
      }
    })
    if (isPresent) {
      alert("This product already add!!");
      return;
    }
    setCartItems([...cartItems, item]);
  }
  useEffect(()=>{
    setTotal(cartItems.length);
  },[cartItems])
  const totalProduct = (total) =>{
    setTotal(total);
  }
  const finished = (value) =>{
    if(value === true){
      setCartItems([]);
      setPage(false);
      cartItems.forEach((data)=> data.amount = 1);
    }
  }
  return (
    <div>
      <nav className='wrapper'>
        <div className='container'>
          <div className='logo' onClick={handleAmazon}>Amazon</div>
          <div className='card' onClick={handleCarts}>
            <BsFillCartPlusFill />
            <span className='number'>{total}</span></div>
        </div>
      </nav>
      <div className='content'>
      {page ? <Carts setItem={cartItems} totalProduct={totalProduct} finished = {finished} /> : <Amazon handleAdd={handleAdd} />}
      </div>
    </div>

  );
}

export default Navbar;
