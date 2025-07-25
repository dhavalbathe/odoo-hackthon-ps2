import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Register } from './pages/Register';
import { Login } from './pages/Login';
import { Home } from './pages/Home';
import { AskQuestionForm } from './pages/AskQuestionForm';

const App = () => {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home />
        },  
      {
          path: '/login',
          element: <Login />
        },
      
        {
          path: '/ask-question',
          element: <AskQuestionForm/>
        }
      ]
    },

    {
       path: '/register',
       element: <Register />
    },
  ]);
 
  return <RouterProvider router={router} />
}

export default App;