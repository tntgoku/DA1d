import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import Header from './components/client/Header'
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/client/responsive.css'
import Main from './components/client/Main';
import Footer from './components/client/Footer';
import FixedRight from './components/client/Fixed_Right';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import { SliderSection } from './components/SliderSection';
import { productsvariant1 } from './entity/Entity';

function App() {
  const [count, setCount] = useState(0)
const listimg = [
  {
    imgSrc: "/src/assets/banner/48.webp",
    imgAlt: "123123123"
  },
  {
    imgSrc: "/src/assets/banner/532532532253.png",
    imgAlt: "Ảnh 2"
  }
];

  return (
    <>
    <Header />
    <SliderSection listimg={listimg}/>
    <Main  />
    <Footer/>
    <FixedRight/>
    </>
  )
}

export default App
