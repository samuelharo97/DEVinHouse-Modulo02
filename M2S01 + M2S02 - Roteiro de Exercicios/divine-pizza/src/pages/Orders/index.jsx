import axios from 'axios'
import { KitchenOrderCard } from '@components'
import { useEffect, useState } from 'react'
import { Container } from './styles'

export const Orders = () => {
  const [orders, setOrders] = useState([])

  const getOrders = async () => {
    try {
      const res = await axios
        .get(`http://127.0.0.1:3333/orders`)
        .then(res => setOrders(res.data))
    } catch (err) {
      console.log(err, 'falhou')
    }
  }

  useEffect(() => {
    getOrders()
  }, [])

  return (
    <Container>
      <h2>Orders</h2>
      {orders.map(order => {
        if (order.status == 'Order is on the way') {
          return <KitchenOrderCard key={order._id} order={order} />
        }
      })}
    </Container>
  )
}
