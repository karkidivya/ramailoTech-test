import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';

const router = createBrowserRouter([
  {
    path: "/",
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <Signup /> },
      
    ]
  }
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
