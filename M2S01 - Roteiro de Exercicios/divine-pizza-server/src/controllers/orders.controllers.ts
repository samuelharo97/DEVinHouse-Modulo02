/* eslint-disable @typescript-eslint/ban-types */
import { Request, Response } from 'express';
import {
  IBodyUpdateOrder,
  IOrder,
  IRouteParamsOrders,
} from '../types/order.types';
import { v4 as uuidv4 } from 'uuid';
import { ORDER_STATUS } from '../utils/order_status';
import fs from 'fs';

const ORDERS_DB = 'orders.json';

function getOrderData() {
  const getOrders = fs.readFileSync(ORDERS_DB).toString();
  const ordersJson: IOrder[] = JSON.parse(getOrders);
  return ordersJson;
}

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
    total: request.body.total,
    status: ORDER_STATUS.PRODUCTION,
    created_at: new Date().toLocaleDateString('pt-BR'),
  };

  const orders = getOrderData();

  const new_data = [...orders, order];

  fs.writeFileSync(ORDERS_DB, JSON.stringify(new_data));

  response.status(201).json(order);
}

export function findAll(request: Request, response: Response) {
  const orders = getOrderData();
  response.status(200).json(orders);
}

export function findOne(
  request: Request<IRouteParamsOrders>,
  response: Response,
) {
  const orders = getOrderData();
  const findOrder = orders.find((order) => order._id === request.params._id);

  if (!findOrder) {
    return response.status(404).json({ error: 'Sorry, order not found!' });
  }

  response.json(findOrder);
}

export function destroy(
  request: Request<IRouteParamsOrders>,
  response: Response,
) {
  const orders = getOrderData();

  const findOrder = orders.find((order) => order._id === request.params._id);

  if (!findOrder) {
    return response.status(404).json({ error: 'Order not found!' });
  }

  if (findOrder.status === ORDER_STATUS.FINISHED || ORDER_STATUS.CANCELLED) {
    return response.status(401).json({
      error: 'Cannot update order when order is already finished or cancelled.',
    });
  }

  const filteredOrders = orders.filter(
    (order) => order._id !== request.params._id,
  );

  fs.writeFileSync(ORDERS_DB, JSON.stringify(filteredOrders));

  response.json({ success: 'Order deleted!' });
}

export function update(
  request: Request<IRouteParamsOrders, {}, IBodyUpdateOrder>,
  response: Response,
) {
  const orders = getOrderData();

  const findOrder = orders.find((order) => order._id === request.params._id);

  if (!findOrder) {
    return response.status(404).json({ error: 'Sorry, order not found!' });
  }

  const updatedOrder = orders.map((order) => {
    if (order._id === request.params._id) {
      order.order_notes = request.body.order_notes || order.order_notes;
      order.payment_method =
        request.body.payment_method || order.payment_method;
      order.products = request.body.products || order.products;
      order.client_name = request.body.client_name || order.client_name;
      order.client_ssn = request.body.client_ssn || order.client_ssn;
      order.client_address =
        request.body.client_address || order.client_address;
      order.client_phone = request.body.client_phone || order.client_phone;
      order.status = request.body.status || order.status;
    }
    return order;
  });

  // const data = [...orders, updatedOrder];

  fs.writeFileSync(ORDERS_DB, JSON.stringify(updatedOrder));

  response.json(findOrder);
}
