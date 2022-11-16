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


app.get('/api/product', (req, resp) => {
    resp.send(products)
})

app.get('/api/customer/:id', (req, resp) => {
    const product = products.find(v => v.price === parseInt(req.params.price))
    if (!products) resp.status(404).send('Data not found.')
    resp.send(product)
})



app.post('/api/product/addProduct', (req, resp) => {
    const product = {
        price: req.body.price,
        productName: req.body.productName
    }
    products.push(product)
    resp.send(product)
})

app.put('/api/product/add/:price', (req, resp) => {
    const product = products.find(v => v.price === parseInt(req.params.price))
    if (!products) resp.status(404).send('Data not found.')

    product.productName = req.body.productName
    resp.send(product)
})

app.delete('/api/product/:price', (req, resp) => {
    const product = products.find(v => v.price === parseInt(req.params.price))
    if (!products) resp.status(404).send('Data not found.')
    const index = products.indexOf(product)
    products.splice(index, 1)
    resp.send(product)
})

app.delete('/api/product/name/:productName', (req, resp) => {
    const product = products.find(p => p.productName === req.params.productName)
    if (!products) resp.status(404).send('Data not found.')
    const index = products.indexOf(product)
    products.splice(index, 1)
    resp.send(product)
})


app.listen(8080)