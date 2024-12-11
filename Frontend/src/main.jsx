import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import LoginTypeSelect from './components/LoginTypeSelect.jsx'
import Login from './components/Login.jsx'
import LoginByEmail from "./components/LoginByEmail.jsx"
import Register from './components/Register.jsx'
import AccessDemo from './components/AccessDemo.jsx'


import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/login-username", element: <Login />},
  { path: "/login-email", element: <LoginByEmail />},
  { path: "/register", element: <Register />},
  { path: "/accessDemo", element: <AccessDemo />},
  { path: "/LoginTypeSelect", element: <LoginTypeSelect />},
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
