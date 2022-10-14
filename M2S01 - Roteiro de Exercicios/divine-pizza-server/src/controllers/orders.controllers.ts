import { Request, Response } from 'express';
import { IOrder } from '../types/order.types';
import { v4 as uuidv4 } from 'uuid';

export function create(request: Request<{}, {}, IOrder>, response: Response) {
  const order: IOrder = {
    _id: uuidv4(),
    order_notes: request.body.order_notes,
    payment_method: request.body.payment_method,
    products: request.body.products,
    client_name: request.body.client_name,
    client_ssn: request.body.client_ssn,
    client_address: request.body.client_address,
    client_phone: request.body.client_phone,
    created_at: new Date().toLocaleDateString('pt-BR'),
  };

  //add persist here

  response.status(201).json(order);
}
