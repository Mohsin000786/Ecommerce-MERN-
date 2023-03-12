import React from 'react';
import './Navbar.scss'
import { Link } from 'react-router-dom';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity);
    return (
        <div className='navContainer'>
            <div className='logo'>
                <Link to="/" className='link'>
                    <span>Ecommerce Cart</span>
                </Link>
            </div>
            <div className='links'>
                <Link to="/" className='link'>About</Link>
                <Link to="/" className='link'>Contact</Link>
                <Link to="" className='link'>Products</Link>
                <Link to='/orders' className='link'>Orders</Link>
            </div>
            <div className='tools'>
                <Link to="/cart" className='link'>Cart
                    <ShoppingCartOutlined className='cartLogo' />
                    <span className='cartQty'>{quantity}</span>
                </Link>
            </div>
        </div>
    )
}

export default Navbar