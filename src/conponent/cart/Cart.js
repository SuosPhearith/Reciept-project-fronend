import React from 'react';
import "./Cart.css";

const Cart = ({item,handleAdd}) => {
  const {title,author,price,img} = item;
  return (
    <div className='container_c'>
      <img className='image' src={img} alt={title}></img>
      <div className='wrapper_c'>
        <div>Title: <span>{title}</span></div>
        <div>Author: <span>{author}</span></div>
        <div>Price: <span>{price}$</span></div>
      </div>
        <div className='containerbtn'>
          <button className='btn' onClick={()=>handleAdd(item)}>Add to cart</button>
        </div>
    </div>
  );
}

export default Cart;
