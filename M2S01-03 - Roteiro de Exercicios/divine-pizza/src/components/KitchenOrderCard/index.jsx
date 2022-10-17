import PropTypes from 'prop-types'
import { Card } from './styles'

export const KitchenOrderCard = ({ order }) => {
  return (
    <Card>
      <div className="client">
        <p>Client: {order.client_name}</p>
        <p>Order: {order.products}</p>
        <p>Placed: {order.created_at}</p>
      </div>
      <div>
        <p> $ {order.total} </p>
      </div>
    </Card>
  )
}

KitchenOrderCard.propTypes = {
  order: PropTypes.shape({
    _id: PropTypes.string,
    order_notes: PropTypes.string,
    payment_method: PropTypes.string,
    products: PropTypes.array,
    client_name: PropTypes.string,
    client_ssn: PropTypes.string,
    client_address: PropTypes.string,
    client_phone: PropTypes.string,
    created_at: PropTypes.string,
    total: PropTypes.number,
    status: PropTypes.string
  })
}
