import React, { useEffect, useState } from 'react';
import './Receipt.css';

const Receipt = ({ orderData }) => {
  const [totalQty, setTotalQty] = useState(0);

  useEffect(() => {
    sumQty();
  })

  const sumQty = () => {
    let allQty = 0;
    orderData.items.forEach(element => {
      allQty += element.amount;
    });
    setTotalQty(allQty);
  }
  return (
    <div className="receipt">
      <h2>Receipt</h2>
      <div className="order-details">
        {/* Display order details here */}
        <p>Date: {orderData.date}</p>
        <p>Order ID: {orderData.orderId}</p>
        <p>Customer: {orderData.customerName}</p>
        {/* Other order details */}
      </div>
      <div className="items">
        {/* Display ordered items here */}
        <div className='about_items'>
          <div className='title'>Title</div>
          <div className='qty'>Qty</div>
          <div className='price'>Price</div>
          <div className='amount'>Amount</div>
        </div>
        <hr className='line'></hr>

        {orderData.items?.map((item, index) => (
          <div className='about_items' key={index}>
            <div className='title'>{item.title}</div>
            <div className='qty'>{item.amount}</div>
            <div className='price'>${item.price.toFixed(2)}</div>
            <div className='amount'>${(item.amount * item.price).toFixed(2)}</div>
          </div>
        ))}
        <hr className='line'></hr>
        <div className='about_items'>
          <div className='title'></div>
          <div className='qty'>{totalQty} Unit</div>
          <div className='price'></div>
          <div className='amount'></div>
        </div>
        <div className='total1'>
          <h4>Total:</h4>
          <h4>$ {orderData.total.toFixed(2)}</h4>
        </div>
        <div className='total1'>
          <h4>Discount:</h4>
          <h4>$ {orderData.discountPrice === 0 ? 0.00 : orderData.discountPrice.toFixed(2)}</h4>
        </div>
        <div className='total1'>
          <h4>Grand Total:</h4>
          <h4>$ {orderData.grandTotal === 0 && orderData.discountPrice === 0 ? orderData.total.toFixed(2) : orderData.grandTotal.toFixed(2)}</h4>
        </div>
      </div>
      <div className="total">
        <p>Thank you for choosing our product! We truly appreciate your support and trust in our brand. Your satisfaction is our top priority, and we look forward to serving you again in the future. Happy shopping!</p>
        <p>~~~ wwww.phearith.com ~~~</p>
      </div>
    </div>
  );
};

export default Receipt;
