import { Container } from './styles'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <Container>
      <h1>Divine Pizza</h1>
      <nav>
        <ul>
          <Link to={'/'}>Home</Link>
          <Link to={'/menu'}>Menu</Link>
          <Link to={'/orders'}>Orders</Link>
        </ul>
      </nav>
    </Container>
  )
}
