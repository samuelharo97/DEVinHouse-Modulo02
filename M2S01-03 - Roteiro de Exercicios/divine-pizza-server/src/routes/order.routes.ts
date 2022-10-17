import { Router } from 'express';
import {
  create,
  findAll,
  destroy,
  findOne,
  update,
} from '../controllers/orders.controllers';

export const orderRoutes = Router();

orderRoutes.get('/orders', findAll);
orderRoutes.get('/orders/:id', findOne);
orderRoutes.post('/orders', create);
orderRoutes.put('/orders/:id', update);
orderRoutes.delete('/orders/:id', destroy);
