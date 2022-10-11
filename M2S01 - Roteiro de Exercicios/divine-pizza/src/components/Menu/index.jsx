import { PizzaCard } from '@components'
import { Container } from './styles'

export const Menu = ({ pizzas }) => {
  return (
    <Container>
      <ul>
        {pizzas ? (
          pizzas.map(pizza => (
            <PizzaCard pizza={pizza} add={console.log(pizza)} key={pizza._id} />
          ))
        ) : (
          <h1>Loading pizzas..</h1>
        )}
      </ul>
    </Container>
  )
}
