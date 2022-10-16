import { Container } from './styles'
import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <Container>
      <Link to={'/'}><h1>Divine Pizza</h1></Link>
      <nav>
        <ul>
          <Link to={'/kitchen'}>Kitchen</Link>
          <Link to={'/menu'}>Client</Link>
          <Link to={'/orders'}>Delivery</Link>
        </ul>
      </nav>
    </Container>
  )
}
