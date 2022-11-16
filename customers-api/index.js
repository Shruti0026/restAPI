const express = require('express')

const app = express()

app.use(express.json())

const customers = [
    { firstName: 'John', id: 27 },
    { firstName: 'James', id: 32 },
    { firstName: 'Robert', id: 45 },
]

app.get('/', (req, resp) => {
    resp.send('This is the customers API')
})

app.get('/api/customer', (req, resp) => {
    resp.send(customers)
})

app.get('/api/customer/:id', (req, resp) => {
    const customer = customers.find(v => v.id === parseInt(req.params.id))
    if (!customers) resp.status(404).send('Data not found.')
    resp.send(customer)
})


app.get('/api/customer/firstName/:firstName', (req, resp) => {
    //console.log("helloo")
    const customer = customers.find(c => c.firstName === req.params.firstName)
    if (!customers) resp.status(404).send('Data not found.')
    resp.send(customer)

})

app.listen(3000)