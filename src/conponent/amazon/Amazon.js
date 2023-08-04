import React, { useEffect, useState } from 'react'
import data from '../../data';
import "./Amazon.css";
import Cart from "../cart/Cart";

const Amazon = ({handleAdd}) => {
    const [items , setItems] = useState([]);
    const [searchText, setSearchText] = useState("");
    useEffect(()=>{
        setItems(data);
    },[])

    const handleSearch = () =>{
        if(searchText!==""){
            setItems(data.filter((item)=>item.title.toLowerCase().includes(searchText)));
        }else{
            setItems(data);
        }
    }

  return (
    <div>
    <input placeholder='Search' className='search' onChange={(e) => setSearchText(e.target.value)}></input>
    <button className='searchbtn' onClick={handleSearch}>Search</button>
    <div className='container_a'>
      {items?.map((item)=>(
        <Cart key={item.id} item = {item} handleAdd = {handleAdd}/>
      ))}
    </div>
    </div>
  )
}

export default Amazon;
