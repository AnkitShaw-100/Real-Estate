import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Benefits from './components/Benefits'
import TestimonialsPage from './components/TestimonialsPage'
import RecommendedResidences from './components/RecommendedResidences '
import Footer from './components/Footer'
import BuyerSignup from "./components/pages/BuyerSignup"
import SellerSignup from './components/pages/SellerSignup'
import AboutUs from './components/pages/AboutUs'
import ContactUs from './components/pages/ContactUs'

import './App.css'
import PropertyDisplayPage from './components/pages/PropertyDisplayPage'

const HomePage = () => {
  return (
    <>
      <Home />
      <Benefits />
      <RecommendedResidences />
      <TestimonialsPage />
    </>
  )
}

function App() {
  const location = useLocation()
  const hideNavAndFooter = location.pathname === "/property"

  return (
    <>
      {!hideNavAndFooter && <Navbar />}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/property" element={<PropertyDisplayPage />} />
        <Route path="/services" element={<Benefits />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/signup/buyer" element={<BuyerSignup />} />
        <Route path="/signup/seller" element={<SellerSignup />} />
      </Routes>
      {!hideNavAndFooter && <Footer />}
    </>
  )
}

export default App
