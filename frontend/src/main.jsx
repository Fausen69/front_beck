import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter> 
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> 
      </Routes>
    </BrowserRouter>
)