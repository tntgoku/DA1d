import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./components/admin/Dashboard";
import './index.css'
import App from './App.jsx'
import Detail from './page/Detail.jsx';
import ViewPayment from './page/gotopayment.jsx';
import Cart from './page/Cart.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/admin" element={<Dashboard />} />
        <Route path="/detail" element={<Detail />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path='/cart' element={<Cart/>}/>
        <Route path="*" element={<div>Not Found</div>} />
        <Route path="/admin/*" element={<Dashboard />} />
        <Route path='/payment' element={<ViewPayment />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>,
)

