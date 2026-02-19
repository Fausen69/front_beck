import { createRoot } from 'react-dom/client'
import './index.css'
import Login from './Login.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <BrowserRouter> 
      <Routes>
        <Route path="/login" element={<Login />} /> 
      </Routes>
    </BrowserRouter>
)