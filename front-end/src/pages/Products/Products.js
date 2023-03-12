import React, { useEffect, useState } from 'react';
import './Products.scss'
import { popularProducts } from '../../data/data';
import { Link } from 'react-router-dom';
import { addProduct } from '../../redux/cartReducer';
import { useDispatch, useSelector } from 'react-redux';

const Products = () => {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cart)
  // const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchedProducts = async () => {
      await fetch("http://localhost:8800/product", {
        method: 'GET',
        headers: {
          'Content-type': 'application-json',
          // 'token': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDU3YzcwMzE1M2MyMDQ1NjI5ZWZjMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NDk3MzUyNiwiZXhwIjoxNjc1NTc4MzI2fQ.HONPZMnyZRAeVqd8CmTO1Xp4CsPge8IxtVCtjdMkvHk'
        },
      }).then(data => data.json())
        .then(val => {
          setProducts(val)
        })
        .catch(err => console.log(err))
    };

    fetchedProducts();
  }, []);

  console.log("PRODUCTS", cart)

  // useEffect(() => {
  //   const fetchedCarts = async () => {
  //     await fetch("http://localhost:8800/cart", {
  //       method: 'GET',
  //       headers: {
  //         'Content-type': 'application-json',
  //         'token': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDU3YzcwMzE1M2MyMDQ1NjI5ZWZjMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NDk3MzUyNiwiZXhwIjoxNjc1NTc4MzI2fQ.HONPZMnyZRAeVqd8CmTO1Xp4CsPge8IxtVCtjdMkvHk'
  //       },
  //     }).then(data => data.json())
  //       .then(val => {
  //         setCart(val)
  //       })
  //       .catch(err => console.log(err))
  //   };

  //   fetchedCarts();
  // }, []);

  // console.log("CART", cart)

  const handleCart = async(product) => {
    dispatch(addProduct({...product, quantity: 1}))
  }

  return (
    <div className='container'>
      <h1>Products</h1>
      <div className='products'>
        {
          products.map(product => (
            <div className='product' key={product._id}>
              <div className='imgContainer'>
                <img src={`../uploads/${product.image}`} alt="name" />
                <span>{product.title}</span>
              </div>
              <div className='productContent'>
                <span>{product.price}$</span>
                <p>{product.desc}</p>
                <button onClick={() => handleCart(product)}>Add to Cart</button>
              </div>

            </div>
          ))
        }

      </div>
    </div>
  )
}

export default Products;