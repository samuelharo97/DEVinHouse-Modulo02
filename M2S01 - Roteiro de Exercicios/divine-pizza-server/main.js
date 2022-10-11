import express from 'express'
import { v4 as uuidv4 } from 'uuid'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

let pizzas = [
  {
    id: uuidv4(),
    url: 'https://images.unsplash.com/photo-1604917877934-07d8d248d396?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    name: 'Cheese Pizza',
    description: '8/10 rated Pizza',
    price: 40,
    ingredients: ['Cheese', 'Special Sauce', 'More Cheese']
  },
  {
    id: uuidv4(),
    url: 'https://images.unsplash.com/photo-1617470702892-e01504297e84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
    name: 'Veggie Pizza',
    description: '7/10 rated Pizza',
    price: 35,
    ingredients: ['Cheese', 'Special Sauce', 'Veggies']
  },
  {
    id: uuidv4(),
    url: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
    name: 'Peperoni Pizza',
    description: '10/10 rated Pizza',
    price: 45,
    ingredients: ['Cheese', 'Special Sauce', 'Peperoni']
  },
  {
    id: uuidv4(),
    url: 'https://plus.unsplash.com/premium_photo-1664472696633-4b0b41e95202?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1076&q=80',
    name: 'Meat Pizza',
    description: '10/10 rated Pizza',
    price: 40,
    ingredients: ['Cheese', 'Special Sauce', 'Meat']
  },
  {
    id: uuidv4(),
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=781&q=80',
    name: 'Hawaiian Pizza',
    description: '10/10 Pizza',
    price: 48,
    ingredients: ['Cheese', 'Special Sauce', 'Pineapple']
  }
]

let orders = []

app.get('/pizzas', (request, response) => {
  response.status(200).json(pizzas)
})

app.post('/pizzas', (request, response) => {
  const new_pizza = {
    id: uuidv4(),
    name: request.body.name,
    description: request.body.description,
    price: request.body.price,
    ingredients: request.body.ingredients
  }

  pizzas.push(new_pizza)

  response.status(201).json(new_pizza)
})

app.get('/orders', (request, response) => {
  response.status(200).json(orders)
})

app.post('/orders', (request, response) => {
  const order = {
    _id: uuidv4(),
    order_notes: request.body.order_notes,
    payment_method: request.body.payment_method,
    products: request.body.products,
    client_name: request.body.client_name,
    client_ssn: request.body.client_ssn,
    client_address: request.body.client_address,
    client_phone: request.body.client_phone,

    created_at: new Date().toLocaleDateString('pt-BR')
  }

  orders.push(order)

  response.status(201).json(order)
})

app.get('/orders/:id', (request, response) => {
  const findOrder = orders.find(order => order._id === request.params.id)

  if (!findOrder) {
    return response.status(404).json({ error: 'Sorry, order not found!' })
  }

  response.json(findOrder)
})

app.put('/orders/:id', (request, response) => {
  const findOrder = orders.find(order => order._id === request.params.id)

  if (!findOrder) {
    return response.status(404).json({ error: 'Sorry, order not found!' })
  }

  const updatedOrder = orders.map(order => {
    if (order._id === request.params.id) {
      order.order_notes = request.body.order_notes
      order.payment_method = request.body.payment_method
      order.products = request.body.products
      order.client_name = request.body.client_name
      order.client_ssn = request.body.client_ssn
      order.client_address = request.body.client_address
      order.client_phone = request.body.client_phone
    }
    return order
  })
  orders = [...updatedOrder]

  response.json(findOrder)
})

app.delete('/orders/:id', (request, response) => {
  const findOrder = orders.find(order => order._id === request.params.id)

  if (!findOrder) {
    return response.status(404).json({ error: 'Order not found!' })
  }

  const filteredOrders = orders.filter(order => order._id !== request.params.id)

  orders = [...filteredOrders]

  response.json({ success: 'Order deleted!' })
})

app.listen(3333, () => {
  console.log('Server is online')
})
