import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext'
import axios from 'axios';

const PlaceOrder = () => {
  const { getTotalCartAmount , token , food_list , cartItems , url} = useContext(StoreContext);
  
  const [data, setData] = useState({
    firstName: "",
    lasName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone:""
  })


  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data=>({...data, [name]:value}));
  }

  const placeOrder = async (event) => {
    event.preventDefault();
    let orderItems = [];
    food_list.map((item) => {
      if (cartItems[item._id] > 0) {
        let itemInfo = item;
        itemInfo["quantity"] = cartItems[item._id];
        orderItems.push(itemInfo);
        
      }
    })
    let orderData = {
      address: data,
      items: orderItems,
      amount:getTotalCartAmount()+10,
    }
    let response = await axios.post(url + "/api/order/place", orderData, { headers: { token } });
    if (response.data.success)   {
      const { session_url } = response.data;
      window.location.replace(session_url);
    }
    else {
      alert("Error in placing order");
    }
  }
 
  return (
    <div>
      <form className='place-order' onSubmit={placeOrder}>
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input onChange={onChangeHandler} name='firstName' value={data.firstName} type="text" placeholder='First Name' />
          <input onChange={onChangeHandler} name='lasName' value={data.lasName} type="text" placeholder='Last Name' />
        </div>

        <input onChange={onChangeHandler} name='email' value={data.email} type="email" placeholder='Email address'/>
        <input onChange={onChangeHandler} name='street' value={data.street} type="text" placeholder='Street' />

        <div className="multi-fields">
          <input onChange={onChangeHandler} name='city' value={data.city} type="text" placeholder='City' />
          <input onChange={onChangeHandler} name='state' value={data.state} type="text" placeholder='State' />
        </div>
        
        <div className="multi-fields">
          <input onChange={onChangeHandler} name='zipcode' value={data.zipcode} type="text" placeholder='Zip code' />
          <input onChange={onChangeHandler} name='country' value={data.country}  type="text" placeholder='Country' />
        </div>
        <input onChange={onChangeHandler} name='phone' value={data.phone} type="text" placeholder='Phone' />
      </div>

        <div className="place-order-right">
        <div className="cart-total">
          <h2>Cart Total</h2>
          <div>
          <div className="cart-total-details">
              <p>Subtotal</p>
              <p>{getTotalCartAmount()}</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Delivery Fee</p>
              <p>{getTotalCartAmount()===0?0:10}dh</p>
            </div>
            <hr />
            <div className="cart-total-details">
              <p>Total</p>
              <p>{getTotalCartAmount()===0?0:getTotalCartAmount()+10}dh</p>
            </div> 
          <button type='submit'>Proceed to Paiment</button>
        </div>
          </div>
        </div>
    </form>
    </div>
  )
}

export default PlaceOrder