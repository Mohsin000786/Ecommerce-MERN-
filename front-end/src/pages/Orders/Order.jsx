import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const Order = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const fetchedOrder = async () => {
            await fetch('http://localhost:8800/order', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'token': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDU3YzcwMzE1M2MyMDQ1NjI5ZWZjMSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NTE3MTI5MiwiZXhwIjoxNjc1Nzc2MDkyfQ.iH_RhIvEn72eU1NtrI70YF0lzV-cTmaCOnEE56ivPDo'
                }
            })
                .then(res => res.json())
                .then(data => setOrders(data))
                .catch(err => console.log(err))
        };
        fetchedOrder();
    }, [])

    return (
        <div>
            <h1 style={{ 'textAlign': 'center', 'marginBottom': '20px' }}>Orders</h1>
            <p style={{ 'textAlign': 'center', 'marginBottom': '20px', 'fontSize': '25px' }}>Data like name , description of particular product is not fetched yet</p>
            <div style={{ 'display': 'flex', 'flexDirection': 'column' ,'justifyContent': 'center', 'alignItems': 'center', 'height': 'fit-content', 'gap': '20px' , 'width': '100%'}}>
                {
                    orders?.map((order) => (
                        <div key={order._id} style={{ 'display': 'flex', 'flexDirection': 'column', 'justifyContent': 'center', 'alignItems': 'center', 'gap': '10px', "backgroundColor": 'yellow', 'width': '70%' }}>
                            <h1>{order.amount}</h1>
                            <p>{order.address}</p>
                            <div style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'gap': '8px' }}>
                                {order.products?.map(x => (
                                    <div key={x._id}>
                                        <h2>{x.quantity}</h2>
                                        {/* <span>{x.desc}</span> */}
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Order