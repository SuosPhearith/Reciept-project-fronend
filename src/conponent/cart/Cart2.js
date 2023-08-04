import React from 'react'
import './Cart2.css'

const Cart2 = ({ item, id, handleRemove, handleChange }) => {
  const { title, author, price, img, amount } = item;

  return (
    <div className='container_c'>
      <img className='image' src={img} alt={title}></img>
      <div className='wrapper_c'>
        <div>Title: <span>{title}</span></div>
        <div>Author: <span>{author}</span></div>
        <div>Price: <span>{price}$</span></div>
      </div>
      <div className='containerbtn'>
        <button className='btnt' onClick={() => handleRemove(id)}>Remove</button>
        <button className='btn1' onClick={()=>handleChange(item,+1)}>+</button>
        <div className='qty'>{amount}</div>
        <button className='btn2' onClick={()=>handleChange(item,-1)}>-</button>
      </div>
    </div>
  )
}

export default Cart2;
