import axios from 'axios'

const URL = '127.0.0.1:3333'

export const useAxios = () => {
  const postPizza = (data, ingredients) => {
    const { name, url, description, price } = data

    const body = {
      name,
      url,
      description,
      price,
      ingredients
    }

    console.log(body)

    axios
      .post('http://127.0.0.1:3333/pizzas', body)
      .then(res => console.log(res))
      .catch(err => console.log(err))
  }

  return {
    postPizza
  }
}
