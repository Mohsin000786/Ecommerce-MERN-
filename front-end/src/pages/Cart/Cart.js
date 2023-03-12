import React, { useEffect, useState } from 'react';
import './Cart.scss';
import { popularProducts } from '../../data/data';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { decQty, deleteItem, incQty } from '../../redux/cartReducer';
import { useDispatch } from 'react-redux';
import {loadStripe} from '@stripe/stripe-js';
const stripePromise = loadStripe('pk_test_51MVbLkSIln4zOh15wosoQgUnn21bu6s8P4AMTeqswyelMPdv27F169aTkgQ1xFFr7l0tKfempPE3szBtxIasnEL900zf58Mhwx');
import axios from 'axios'


const Cart = () => {
  const cart = useSelector(state => state.cart);
  const dispatch = useDispatch();

  console.log(cart)

  // console.log(stripeToken)

  // useEffect(() => {
  //   const makeRequest = async () => {
  //     try {
  //       const res = await axios.post("http://localhost:8800/checkout/payment", {
  //         tokenId: stripeToken.id,
  //         amount: cart.total * 100,
  //       });
  //       navigate("/success", {
  //         stripeData: res.data,
  //         products: cart
  //       });
  //     } catch(err) {
  //       console.log(err)
  //     }
  //   };
  //   stripeToken && makeRequest();
  // }, [stripeToken, cart.total, history]);

  const handleCheckout = async () => {
    const stripe = await stripePromise;
    await fetch("http://localhost:8800/checkout/payment", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(cart)
    }).then((res) => res.json())
      .then(async (val )=> {
        await stripe.redirectToCheckout({
          sessionId: val.session.id
        });
      })
      .catch(err => console.log(err))
  }

  return (
    <div className='cartContainer'>
      <h1>Cart</h1>
      <div style={{ 'display': 'flex' }}>
        <div className='cartData'>
          {
            cart.products.map(cartData => {
              const findItem = cart.products.find(x => x._id === cartData._id);
              return (
                < div className='cartContent' key={cartData._id} >
                  <div className='cartImgContainer'>
                    <img src={`../uploads/${cartData.image}`} alt='name' />
                  </div>
                  <div className='cartBody'>
                    <span>{cartData.title}</span>
                    <span>Price : {cartData.price}</span>
                    <div className='cartBtns'>
                      <button onClick={() =>  dispatch(decQty(cartData))} >-</button>
                      <span>{findItem?.quantity}</span>
                      <button onClick={() => dispatch(incQty(cartData))}>+</button>
                    </div>
                    <button onClick={() => dispatch(deleteItem(cartData))}>Delete</button>
                  </div>
                </div>
              )
            })
          }
          <hr className='hr' />
        </div>
        <div className='cartSummary'>
          <h1>Order Summary</h1>
          <div className='cartValue'>
            <div className='cartBalance'>
              <span>SubTotal</span>
              <span>50$</span>
            </div>
            <div className='cartBalance'>
              <span>Shipping Charges</span>
              <span>5$</span>
            </div>
            <div className='cartBalance'>
              <span>Discount</span>
              <span>2$</span>
            </div>
            <div className='cartBalance'>
              <span>Total</span>
              <span>{cart?.total} $</span>
            </div>
            {/* <StripeCheckout
              name="Ecommerce Store"
              image="https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.pngegg.com%2Fen%2Fpng-zygxn&psig=AOvVaw3GQvFWrVtoEGs73Z-NQrwk&ust=1675089208613000&source=images&cd=vfe&ved=0CBAQjRxqFwoTCPjf0d__7PwCFQAAAAAdAAAAABAD"
              billingAddress
              shippingAddress
              description={`Your total is $${cart.total}`}
              amount={cart.total * 100}
              token={onToken}
              stripeKey={KEY}
            >
            </StripeCheckout> */}
            <button onClick={handleCheckout}>Checkout</button>
          </div>
        </div>
      </div>
    </div >
  )
}

export default Cart