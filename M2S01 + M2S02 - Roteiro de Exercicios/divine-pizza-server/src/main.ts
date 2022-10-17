/* eslint-disable prefer-const */
import express from 'express';
import cors from 'cors';
import { orderRoutes } from './routes/order.routes';
import { pizzaRoutes } from './routes/pizza.routes';

const app = express();

app.use(express.json());
app.use(cors());
app.use(orderRoutes);
app.use(pizzaRoutes);

export default app;

/* const pizzas = [
  {
    id: uuidv4(),
    url: 'https://images.unsplash.com/photo-1604917877934-07d8d248d396?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    name: 'Cheese Pizza',
    description: '8/10 rated Pizza',
    price: 40,
    ingredients: ['Cheese', 'Special Sauce', 'More Cheese'],
  },
  {
    id: uuidv4(),
    url: 'https://images.unsplash.com/photo-1617470702892-e01504297e84?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80',
    name: 'Veggie Pizza',
    description: '7/10 rated Pizza',
    price: 35,
    ingredients: ['Cheese', 'Special Sauce', 'Veggies'],
  },
  {
    id: uuidv4(),
    url: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
    name: 'Peperoni Pizza',
    description: '10/10 rated Pizza',
    price: 45,
    ingredients: ['Cheese', 'Special Sauce', 'Peperoni'],
  },
  {
    id: uuidv4(),
    url: 'https://plus.unsplash.com/premium_photo-1664472696633-4b0b41e95202?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1076&q=80',
    name: 'Meat Pizza',
    description: '10/10 rated Pizza',
    price: 40,
    ingredients: ['Cheese', 'Special Sauce', 'Meat'],
  },
  {
    id: uuidv4(),
    url: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=781&q=80',
    name: 'Hawaiian Pizza',
    description: '10/10 Pizza',
    price: 48,
    ingredients: ['Cheese', 'Special Sauce', 'Pineapple'],
  },
]; */
