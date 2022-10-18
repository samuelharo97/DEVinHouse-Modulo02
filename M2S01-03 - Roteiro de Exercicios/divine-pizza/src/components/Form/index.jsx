import { useRef, useState } from 'react'
import { ColumnWrapper, Container, RowWrapper } from './styles'
import { useForm } from 'react-hook-form'
import { useAxios } from '@hooks'

export const Form = () => {
  const [ingredientList, setIngredientList] = useState([])
  const { handleSubmit, register, setValue } = useForm()
  const ingredientRef = useRef()
  const { postPizza } = useAxios()

  const addIngredient = value => {
    if (value == '') {
      return
    }

    setIngredientList([...ingredientList, value])
    setValue(ingredientRef.current, '')
  }

  const submitForm = data => {
    postPizza(data, ingredientList)
  }

  return (
    <Container onSubmit={handleSubmit(submitForm)}>
      <section>
        <h2>Suggest a pizza: </h2>
        <ColumnWrapper>
          <label htmlFor="name">Pizza name:</label>
          <input type="text" name="name" id="name" {...register('name')} />
        </ColumnWrapper>
        <ColumnWrapper>
          <label htmlFor="url">Image (URL):</label>
          <input type="url" name="url" id="url" {...register('url')} />
        </ColumnWrapper>
        <ColumnWrapper>
          <label htmlFor="price">Price:</label>
          <input type="number" name="price" id="price" {...register('price')} />
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
              onClick={() => addIngredient(ingredientRef.current.value)}
            >
              +
            </button>
          </RowWrapper>
        </ColumnWrapper>
        <button className="submit" type="submit" /* onClick={} */>
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
