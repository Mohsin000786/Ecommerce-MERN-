const Order = require('../models/Order');

const router = require('express').Router();
const stripe = require('stripe')('sk_test_51MVbLkSIln4zOh15PSliQ6G8PBOdfB4z6EtnYddcYXo1bgAh0msuUQK92ynf7JhQq9SgM8ok43wUMwCwojdtfkNf00cNmthnnt');

// router.post('/payment', (req, res) => {
//     stripe.charges.create({
//         source: req.body.tokenId,
//         amount: req.body.amount,
//         currency: 'usd'
//     }, (err, success) => {
//         if(err) {
//             res.status(500).json(err);
//         }else{
//             res.status(200).json(success)
//         }
//     })
// })
router.post('/payment', async (req, res) => {
    const { products } = req.body;
    let lineItems = [];
    const mappedData = products.map(x => {
        return {
            productId: x._id,
            quantity: x.quantity
        }
    })
    const data = {
        products: mappedData,
        amount: products.reduce((curr, acc) => curr + acc.quantity, 0),
        address: "TEST ADDRESS"
    }
    // console.log('DATA', data);

    products.map(item => (
        lineItems.push({
            price_data: {
                currency: 'usd',
                product_data: {
                    name: item.title,
                },
                unit_amount: item.price * 100,
            },
            quantity: item.quantity
        })
    ))

    const session = await stripe.checkout.sessions.create({
        line_items: lineItems,
        mode: 'payment',
        success_url: 'http://localhost:3000' + `/success`,
        cancel_url: 'http://localhost:3000' + '/cancel',
        payment_method_types: ['card']
    });

    const newOrder = new Order(data);
    await newOrder.save();
    try {
        if (session) {
            res.status(200).json({ session: session });
        }
        else {
            res.status(404).json(error);
            // console.log(error)
        }
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;