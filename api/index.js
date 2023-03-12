const express = require('express');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
const authRoutes = require('./routes/Auth.js')
const uploadRoutes = require('./routes/Upload.js')
const productRoutes = require('./routes/Product.js')
const cartRoutes = require('./routes/Cart.js')
const orderRoutes = require('./routes/Order.js')
const checkoutRoutes = require('./routes/Stripe.js')
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
dotenv.config()

app.use(express.json())
app.use(cors())
app.use(cookieParser())

mongoose.connect(
    process.env.MONGODB_URL
).then(() => console.log(`Database Connected !`))
    .catch((err) => console.log(err));


app.use('/auth', authRoutes)
app.use('/upload', uploadRoutes)
app.use('/product', productRoutes)
app.use('/cart', cartRoutes)
app.use('/order', orderRoutes)
app.use('/checkout', checkoutRoutes)


app.listen(process.env.PORT, () => console.log(`Server running at ${process.env.PORT}`))
