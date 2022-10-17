import { Menu } from '@components'
import axios from 'axios'
import { useEffect, useState } from 'react'

export const DivineMenu = () => {
  const [pizzas, setPizzas] = useState([])

  const getPizzas = async () => {
    try {
      const res = await axios
        .get(`http://127.0.0.1:3333/pizzas`)
        .then(res => setPizzas(res.data))
    } catch (err) {
      console.log(err, 'falhou')
    }
  }

  useEffect(() => {
    getPizzas()
  }, [])

  return <Menu pizzas={pizzas} />
}
