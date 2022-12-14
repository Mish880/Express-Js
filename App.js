const express = require('express')
const customer = require('./Routes/customer')
const item = require('./Routes/item')
const order = require('./Routes/order')

const app = express()
const port = 3000

app.use(express.json())

app.use('/customer',customer)
app.use('/item',item)
app.use('/order',order)


app.get('/', (req, res) => {
  res.send('Hello Express!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})