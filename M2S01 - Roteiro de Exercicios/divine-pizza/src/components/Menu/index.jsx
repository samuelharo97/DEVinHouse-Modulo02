import { PizzaCard } from '@components'

export const Menu = ({ pizzas }) => {
  return (
    <div>
      <ul>
        {pizzas ? (
          pizzas.map(pizza => (
            <PizzaCard pizza={pizza} add={console.log(pizza)} key={pizza._id} />
          ))
        ) : (
          <h1>Loading pizzas..</h1>
        )}
      </ul>
    </div>
  )
}
