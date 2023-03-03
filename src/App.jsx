import { BrowserRouter } from 'react-router-dom'

import AppProvider from './hooks'

import AppRoutes from './routes'

import GlobalStyle from './styles/global'

const App = () => {
  return (
    <BrowserRouter>
      <AppProvider>
        <AppRoutes />
      </AppProvider>
      <GlobalStyle />
    </BrowserRouter>
  )
}

export default App
