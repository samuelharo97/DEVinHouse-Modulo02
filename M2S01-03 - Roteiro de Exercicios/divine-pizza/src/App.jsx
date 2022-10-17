import { Header } from '@components'
import { AppRoutes } from '@router'
import { GlobalStyles } from '@styles'
import { BrowserRouter } from 'react-router-dom'

function App() {
  return (
    <BrowserRouter>
      <GlobalStyles />
      <Header />
      <main>
        <AppRoutes />
      </main>
    </BrowserRouter>
  )
}

export default App
