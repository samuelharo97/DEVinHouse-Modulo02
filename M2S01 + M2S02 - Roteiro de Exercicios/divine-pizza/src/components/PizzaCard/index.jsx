import { Container } from './styles'

export const PizzaCard = ({ pizza, add }) => {
  return (
    <Container>
      <img src={pizza.url} alt="pizza" />
      <h4>{pizza.name}</h4>
      <p>{pizza.description}</p>
      <p>
        {pizza.ingredients.map((item, index) => {
          if (pizza.ingredients.length == index + 1) {
            return `${item}`
          }
          return `${item}, `
        })}
      </p>
      <span>{pizza.price}$</span>

      <button onClick={add}>Add to cart</button>
    </Container>
  )
}
