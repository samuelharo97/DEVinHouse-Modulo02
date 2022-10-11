import { useRef, useState } from 'react'

export const Form = () => {
  const [ingredientList, setIngredientList] = useState([])
  const ingredientRef = useRef()
  const addIngredient = value => {
    setIngredientList([...value])
  }
  return (
    <form action="">
      <div>
        <label htmlFor="name">Name:</label>
        <input type="text" name="name" id="name" />
      </div>
      <div>
        <label htmlFor="url">Image URL:</label>
        <input type="url" name="url" id="url" />
      </div>
      <div>
        <label htmlFor="description">Description:</label>
        <input type="text" name="description" id="description" />
      </div>
      <div>
        <label htmlFor="ingredients">Ingredients:</label>
        <div>
          <input
            ref={ingredientRef}
            type="text"
            name="ingredients"
            id="ingredients"
          />
          <button onClick={() => console.log(ingredientRef.value)}>+</button>
          {ingredientList.length > 0
            ? ingredientList.map(ingredient => {
                return <p>{ingredient}</p>
              })
            : ''}
        </div>
      </div>
    </form>
  )
}
