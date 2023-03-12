import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import Cart from './pages/Cart/Cart.js';
import Checkout from './pages/Checkout/Checkout.js';
import Navbar from './pages/Navbar/Navbar.js';
import Order from './pages/Orders/Order.jsx';
import Products from './pages/Products/Products.js'
import Success from './pages/Success/Success.js';

const Layout = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  )
}


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Products />
      },
      {
        path: '/cart',
        element: <Cart />
      },
      {
        path: '/checkout',
        element: <Checkout />
      },
      {
        path: '/success',
        element: <Success />
      },
      {
        path: '/orders',
        element: <Order />
      }

    ]
  }

])

function App() {
  return (
    <>
    <RouterProvider router={router} />
    </>
  );
}

export default App;
