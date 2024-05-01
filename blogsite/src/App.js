import logo from './logo.svg';
import './App.css';
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import { AuthProvider } from './context/AuthContext';

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
    <AuthProvider>
    <RouterProvider router={router} /></AuthProvider>
  );
}

export default App;
