import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import ErrorContainer from './UI/ErrorContainer.tsx'
import routes from './routes.tsx'

const router = createBrowserRouter(routes)

function App() {
  return (
    <div>
      <RouterProvider router={router} />
      <ErrorContainer />
    </div>
  )
}

export default App
