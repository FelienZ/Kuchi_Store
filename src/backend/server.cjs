const express = require('express');
const app = express();
const cors = require('cors')
const storeRoutes = require('./router/router.cjs')

require('dotenv').config();
const port = process.env.PORT;
const host = process.env.HOST;

app.use(express.json())
app.use(cors({origin: 'http://localhost:5173'}))
app.use('/api/products', storeRoutes)
app.use(async(req, res)=> {
    res.json(`Cannot get PATH`)
})

app.listen(port, host, ()=> {
    console.log(`Server Run at http://${host}:${port}`)
})