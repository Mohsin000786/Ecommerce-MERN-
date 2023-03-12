import React from 'react';
import './Checkout.scss'

const Checkout = () => {
    return (
        <div className='checkContainer'>
            <h1>Please ! Fill Your details</h1>
            <form>
                <div className='formGroup'>
                    <label htmlFor='name'>Name</label>
                    <input type="text" name="name" id="name" placeholder="Full name" />
                </div>
                <div className='formGroup'>
                    <label htmlFor='email'>Email</label>
                    <input type="email" name="email" id="email" placeholder="Email Address" />
                </div>
                <div className='formGroup'>
                    <label htmlFor='address'>Address</label>
                    <input type="text" name="address" id="address" placeholder="Full address" />
                </div>
                <div className='formGroup'>
                    <label htmlFor='city'>City</label>
                    <input type='text' name='city' id="city" placeholder="City name" />
                </div>
                <div className='formGroup'>
                    <label htmlFor='zipcode'>Zip Code</label>
                    <input type='number' name="zipcode" id="city" placeholder="Zip Code" />
                </div>

                <div className='formGroup'>
                    <label htmlFor='country'>Country</label>
                    <input type="text" name="country" id="country" placeholder="Country Name" />
                </div>
                <button>Proceed</button>
            </form>
        </div>
    )
}

export default Checkout