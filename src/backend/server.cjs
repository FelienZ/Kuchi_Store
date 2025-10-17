const express = require('express');
const app = express();
const cors = require('cors')
const cookieParser = require('cookie-parser')
const productRoutes = require('./router/productRoutes.cjs')
const authRoutes = require('./router/authRoutes.cjs')
const userRoutes = require('./router/userRoutes.cjs')

require('dotenv').config();
const port = process.env.PORT;
const host = process.env.HOST;

app.use(express.json())
app.use(cookieParser())
app.use(cors({origin: 'http://localhost:5173', credentials: true}))

app.use('/api/products', productRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

app.use(async(req, res)=> {
    res.json(`Cannot get PATH`)
})

app.listen(port, host, ()=> {
    console.log(`Server Run at http://${host}:${port}`)
})