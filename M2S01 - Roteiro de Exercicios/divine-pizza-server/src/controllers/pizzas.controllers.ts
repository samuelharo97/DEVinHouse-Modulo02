import { Request, Response } from 'express';
import { IPizzas } from '../types/pizza.types';
import { v4 as uuidv4 } from 'uuid';

export function create(request: Request<{}, {}, IPizzas>, response: Response) {
  const new_pizza: IPizzas = {
    id: uuidv4(),
    name: request.body.name,
    url: request.body.url,
    description: request.body.description,
    price: request.body.price,
    ingredients: request.body.ingredients,
  };

  //add persist here

  response.status(201).json(new_pizza);
}
