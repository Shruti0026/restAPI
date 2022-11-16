const express = require('express')

const app = express()

app.use(express.json())

const products = [
    { productName: 'Laptop', price: 27 },
    { productName: 'Charger', price: 32 },
    { productName: 'mobile phone', price: 45 },
]

app.get('/', (req, resp) => {
    resp.send('This is the Products API')
})

//get list of products
app.get('/api/product', (req, resp) => {
    resp.send(products)
})

//get list of products by price
app.get('/api/product/price/:price', (req, resp) => {
    const product = products.find(v => v.price === parseInt(req.params.price))
    if (!products) resp.status(404).send('Data not found.')
    resp.send(product)
})


//add new product
app.post('/api/product/addProduct', (req, resp) => {
    const product = {
        price: req.body.price,
        productName: req.body.productName
    }
    products.push(product)
    resp.send(product)
})

//update changes in product list
app.put('/api/product/add/:price', (req, resp) => {
    const product = products.find(v => v.price === parseInt(req.params.price))
    if (!products) resp.status(404).send('Data not found.')

    product.productName = req.body.productName
    resp.send(product)
})

//delete product by price
app.delete('/api/product/:price', (req, resp) => {
    const product = products.find(v => v.price === parseInt(req.params.price))
    if (!products) resp.status(404).send('Data not found.')
    const index = products.indexOf(product)
    products.splice(index, 1)
    resp.send(product)
})

//delete product by name
app.delete('/api/product/name/:productName', (req, resp) => {
    const product = products.find(p => p.productName === req.params.productName)
    if (!products) resp.status(404).send('Data not found.')
    const index = products.indexOf(product)
    products.splice(index, 1)
    resp.send(product)
})


app.listen(8080)