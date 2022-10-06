import express from 'express'
import { v4 as uuidv4 } from 'uuid'

const app = express()

app.use(express.json())

let pizzas = [
  /*  {
    id: uuidv4(),
    name: 'Pepperoni',
    description: '10/10 Pizza',
    price: '43,00',
    ingredients: 'Cheese, Special Sauce, Pepperoni '
  },
  {
    id: uuidv4(),
    name: 'Pepperoni',
    description: '10/10 Pizza',
    price: '43,00',
    ingredients: 'Cheese, Special Sauce, Pepperoni '
  },
  {
    id: uuidv4(),
    name: 'Pepperoni',
    description: '10/10 Pizza',
    price: '43,00',
    ingredients: 'Cheese, Special Sauce, Pepperoni '
  },
  {
    id: uuidv4(),
    name: 'Pepperoni',
    description: '10/10 Pizza',
    price: '43,00',
    ingredients: 'Cheese, Special Sauce, Pepperoni '
  },
  {
    id: uuidv4(),
    name: 'Pepperoni',
    description: '10/10 Pizza',
    price: '43,00',
    ingredients: 'Cheese, Special Sauce, Pepperoni '
  } */
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
    products: [],
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

app.listen(3333, () => {
  console.log('Server is online')
})
