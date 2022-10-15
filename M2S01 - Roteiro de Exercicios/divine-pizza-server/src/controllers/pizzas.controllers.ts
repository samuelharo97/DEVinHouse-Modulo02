/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from 'express';
import { IPizzas } from '../types/pizza.types';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';

const PIZZAS_DB = 'pizzas.json';

function getPizzaData() {
  const data = fs.readFileSync(PIZZAS_DB).toString();
  const pizzas: IPizzas[] = JSON.parse(data);
  return pizzas;
}

export function create(request: Request<{}, {}, IPizzas>, response: Response) {
  const new_pizza: IPizzas = {
    id: uuidv4(),
    name: request.body.name,
    url: request.body.url,
    description: request.body.description,
    price: request.body.price,
    ingredients: request.body.ingredients,
  };

  const pizzas = getPizzaData();

  const new_data = [...pizzas, new_pizza];

  fs.writeFileSync(PIZZAS_DB, JSON.stringify(new_data));

  response.status(201).json(new_pizza);
}

export function findAll(request: Request, response: Response) {
  const pizzas = getPizzaData();
  response.status(200).json(pizzas);
}

export function findOne(request: Request, response: Response) {
  const pizzas = getPizzaData();
  const findPizza = pizzas.find((pizza) => pizza.id === request.params.id);

  if (!findPizza) {
    return response.status(404).json({ error: 'Sorry, pizza not found!' });
  }

  response.json(findPizza);
}

export function update(request: Request, response: Response) {
  const pizzas = getPizzaData();

  const findPizzas = pizzas.find((pizzas) => pizzas.id === request.params.id);

  if (!findPizzas) {
    return response.status(404).json({ error: 'Sorry, pizza not found!' });
  }

  const updatedPizza = pizzas.map((pizza) => {
    if (pizza.id === request.params.id) {
      pizza.name = request.body.name || pizza.name;
      pizza.url = request.body.url || pizza.url;
      pizza.description = request.body.description || pizza.description;
      pizza.price = request.body.price || pizza.price;
      pizza.ingredients = request.body.ingredients || pizza.ingredients;
    }
    return pizza;
  });

  fs.writeFileSync(PIZZAS_DB, JSON.stringify(updatedPizza));

  response.json({ sucess: 'Pizza updated!' });
}

export function destroy(request: Request, response: Response) {
  const pizzas = getPizzaData();

  const findPizzas = pizzas.find((pizzas) => pizzas.id === request.params.id);

  if (!findPizzas) {
    return response.status(404).json({ error: 'Sorry, pizza not found!' });
  }

  const filteredPizzas = pizzas.filter(
    (pizza) => pizza.id !== request.params.id,
  );

  console.log(filteredPizzas);

  if (!filteredPizzas) {
    return response.status(404).json({ error: 'Sorry, pizza not found!' });
  }

  fs.writeFileSync(PIZZAS_DB, JSON.stringify(filteredPizzas));

  response.json({ sucess: 'Pizza deleted!' });
}
