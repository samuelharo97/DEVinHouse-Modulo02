import { useRef, useState } from 'react'
import { ColumnWrapper, Container, RowWrapper } from './styles'
import { useForm } from 'react-hook-form'

export const Form = () => {
  const [ingredientList, setIngredientList] = useState([])
  const { handleSubmit, register } = useForm()
  const ingredientRef = useRef()

  const addIngredient = value => {
    setIngredientList([...ingredientList, value])
  }

  const submitForm = data => {
    console.log(data)
  }

  console.log(ingredientList)

  return (
    <Container onSubmit={handleSubmit(submitForm)}>
      <section>
        <h2>Suggest a pizza: </h2>
        <ColumnWrapper>
          <label htmlFor="pizza">Pizza name:</label>
          <input type="text" name="pizza" id="pizza" {...register('pizza')} />
        </ColumnWrapper>
        <ColumnWrapper>
          <label htmlFor="url">Image (URL):</label>
          <input type="url" name="url" id="url" {...register('url')} />
        </ColumnWrapper>
        <ColumnWrapper>
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            name="description"
            id="description"
            {...register('description')}
          />
        </ColumnWrapper>
        <ColumnWrapper>
          <label htmlFor="ingredients">Ingredients:</label>
          <RowWrapper>
            <input
              ref={ingredientRef}
              type="text"
              name="ingredients"
              id="ingredients"
            />
            <button
              type="button"
              onClick={() =>
                setIngredientList([
                  ...ingredientList,
                  ingredientRef.current.value
                ])
              }
            >
              +
            </button>
          </RowWrapper>
        </ColumnWrapper>
        <button className="submit" type="submit">
          Submit
        </button>
      </section>
      <aside>
        <ul>
          <h4>Ingredient List</h4>
          {ingredientList.map(ingredient => (
            <li>{ingredient}</li>
          ))}
        </ul>
      </aside>
    </Container>
  )
}
