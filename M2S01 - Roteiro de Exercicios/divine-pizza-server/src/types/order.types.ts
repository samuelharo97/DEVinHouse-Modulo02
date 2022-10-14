export interface IOrder {
  _id: string;
  order_notes: string;
  payment_method: string;
  products: string;
  client_name: string;
  client_ssn: number;
  client_address: string;
  client_phone: string;
  created_at: string;
}
