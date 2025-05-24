
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import Home from './pages/Home'
import HostedCheckout from './pages/HostedCheckout'
import Success from './pages/Success'
import Failure from './pages/Failure'

function App() {

  const router= createBrowserRouter([
     {
            path: "/",
            element: (
                <Home/>
            ),
        },
        {
            path: "/hosted-checkout",
            element: (
                <HostedCheckout/>
            )
        },
        {
            path: '/success',
            element: (
                <Success/>
            )
        },
        {
            path: '/failure',
            element: (
                <Failure/>
            )
        },
  ])
  return (
   <RouterProvider router={router}></RouterProvider>
  )
}

export default App
