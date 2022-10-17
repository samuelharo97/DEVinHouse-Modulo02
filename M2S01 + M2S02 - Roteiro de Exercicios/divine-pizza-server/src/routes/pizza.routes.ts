import { Router } from 'express';
import {
  create,
  findAll,
  findOne,
  destroy,
  update,
} from '../controllers/pizzas.controllers';

export const pizzaRoutes = Router();

pizzaRoutes.get('/pizzas', findAll);

pizzaRoutes.get('/pizzas/:id', findOne);

pizzaRoutes.post('/pizzas', create);

pizzaRoutes.put('/pizzas/:id', update);

pizzaRoutes.delete('/pizzas/:id', destroy);
