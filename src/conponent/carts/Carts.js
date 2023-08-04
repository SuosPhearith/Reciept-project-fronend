import React, { useEffect, useState } from 'react';
import Cart2 from '../cart/Cart2';
import './Carts.css';
import Receipt from '../receipt/Receipt';
import { IoMdArrowRoundBack } from "react-icons/io";

const Carts = ({ setItem, totalProduct, finished }) => {
    const [items, setItems] = useState([]);
    const [amount, setAmount] = useState(0);
    const [orderID, setOderID] = useState("");
    const [date, setDate] = useState("");
    const [name, setName] = useState("");
    const [showItems, setShowItems] = useState(true);
    const [grandTotal, setGrandTotal] = useState(0);
    const [discount, setDiscount] = useState(0);
    const [discountPrice, setDiscountPrice] = useState(0);

    const handleClear = () => {
        setItems([]);
        setAmount(0);
        setOderID("");
        setDate("");
        setName("");
        setShowItems(true);
        setDiscount(0);
    }
    useEffect(() => {
        setItems(setItem);
    }, [setItem, items])

    useEffect(() => {
        totalPrice();
    })

    const totalPrice = () => {
        let total = 0;
        items.forEach((item) => {
            total += item.price * item.amount;
        })
        setAmount(total);
    }

    const handleRemove = (id) => {
        setDiscount(discount);
        let tempArr2 = items;
        tempArr2[id].amount = 1;
        tempArr2.splice(id,1);
        setItems(tempArr2);
        totalProduct(items.length);
    }

    const handleChange = (item, action) => {
        setDiscount(discount);
        let ind = -1;
        items.forEach((data, index) => {
            if (item.id === data.id) {
                ind = index;
            }
        })
        const tempArr = items;
        tempArr[ind].amount += action;
        if (tempArr[ind].amount === 0) {
            tempArr[ind].amount = 1;
        }
        setItems([...tempArr]);
    }

    const show = () => {
        if (name === "" || name === null || name === undefined || orderID === "" || date === "") {
            console.log(name);
            alert("Please input all field before print reciept!!");
            return;
        } else {
            setShowItems(false);
        }
    }
    const handleback = () =>{
        setShowItems(true);
    }

    const handleGrandTotal = () => {
        let dis = discount;
        let amountG = amount;
        let disPrice = (amount * dis) / 100;
        let final = amountG - disPrice;
        setGrandTotal(final);
        setDiscountPrice(disPrice);
    }

    useEffect(() => {
        handleGrandTotal();
    })


    const printReciept = () => {
        if (name === "" || name === null || name === undefined || orderID === "" || date === "") {
            alert("Please input all field before print reciept!!");
            return;
        } else {
            window.print();
            finished(true);
            handleClear();
        }
    }

    const orderData = {
        date: date,
        orderId: orderID,
        customerName: name,
        items: items,
        total: amount,
        grandTotal: grandTotal,
        discountPrice: discountPrice,

    };

    return (
        <div>
            {showItems ? (items.length === 0 ?
                <div className='please_select'>
                    <div onClick={() => finished(true)} className='please'>Please select any item!</div>
                    
                </div> :
                <div className='container_cs'>
                    <div className='wrapper_cs'>
                        {items.map((item, index) => (
                            <Cart2 key={item.id} item={item} id={index} handleRemove={handleRemove} handleChange={handleChange} />
                        ))}
                    </div>
                    <div className='receipt-c'>
                        <div style={{ backgroundColor: '#061938', borderRadius: '3px', width: '200px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><h3 style={{ color: "white" }}>Total : {amount.toFixed(2)}$</h3></div>
                        <div className='input_name'><input onChange={(e) => setDiscount(e.target.value)} type='number' min={0} max={100} placeholder='Discount %' autoComplete='none' value={discount}></input></div>
                        <div style={{ marginTop: '10px', backgroundColor: '#061938', borderRadius: '3px', width: '200px', height: '40px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}><h4 style={{ color: "white" }}>Grand total : {discount === 0 ? amount.toFixed(2) : grandTotal.toFixed(2)}$</h4></div>
                        <div className='input_name'><input onChange={(e) => setOderID(e.target.value)} type='text' placeholder='Order ID' autoComplete='none' value={orderID}></input></div>
                        <div className='input_name'><input onChange={(e) => setName(e.target.value)} type='text' placeholder='Customer name' autoComplete='none' value={name}></input></div>
                        <div className='input_name'><input onChange={(e) => setDate(e.target.value)} type='date' placeholder='Order date' autoComplete='none' value={date}></input></div>
                        <button onClick={show} className='view'>View receipt</button>
                        <button onClick={() => finished(true)} className='cancel'>Cancel</button>
                    </div>
                </div>
            )
                : (
                    <div className='reciept_center'>
                        <div className='print_aria'>
                            <button className='btn_back' onClick={handleback}><IoMdArrowRoundBack /></button>
                            <button className='btn_print' onClick={printReciept}>Print Receipt</button>
                        </div>
                        <Receipt orderData={orderData} />
                    </div>
                )}
        </div>

    );
}

export default Carts;
