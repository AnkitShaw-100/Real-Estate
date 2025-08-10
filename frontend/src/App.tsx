import { Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import Home from './components/Home'
import Benefits from './components/Benefits'
import TestimonialsPage from './components/TestimonialsPage'
import RecommendedResidences from './components/RecommendedResidences '
import Footer from './components/Footer'
import BuyerSignup from "./components/pages/BuyerSignup"
import SellerSignup from './components/pages/SellerSignup'
import Login from './components/pages/Login'
import TestIntegration from './components/pages/TestIntegration'
import TestConnection from './components/pages/TestConnection'
import AboutUs from './components/pages/AboutUs'
import ContactUs from './components/pages/ContactUs'
import PropertyDetails from './components/pages/PropertyDetails'
import PropertyListing from './components/pages/PropertyListing'
import PropertyDetailPage from './components/pages/PropertyDetailPage'
import AddProperty from './components/pages/AddProperty'
import SellerDashboard from './components/pages/SellerDashboard'
import BuyerDashboard from './components/pages/BuyerDashboard'
import EditProperty from './components/pages/EditProperty'
import FavoritesPage from './components/pages/FavoritesPage'

import './App.css'
import PropertyDisplayPage from './components/pages/PropertyDisplayPage'

const HomePage = () => {
  return (
    <>
      <Home />
      <Benefits />
      <RecommendedResidences />
      <TestimonialsPage />
      <PropertyDetails />
    </>
  )
}

function App() {
  const location = useLocation()
  const hideNavAndFooter = location.pathname === "/property"

  return (
    <AuthProvider>
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
        <Route path="/login" element={<Login />} />
        <Route path="/test" element={<TestIntegration />} />
        <Route path="/test-connection" element={<TestConnection />} />
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route path="/seller/add-property" element={<AddProperty />} />
        <Route path="/seller/edit-property/:id" element={<EditProperty />} />
        <Route path="/properties" element={<PropertyListing />} />
        <Route path="/properties/:id" element={<PropertyDetailPage />} />
        <Route path="/favorites" element={<FavoritesPage />} />
        <Route path="/buyer/dashboard" element={<BuyerDashboard />} />
      </Routes>
      {!hideNavAndFooter && <Footer />}
    </AuthProvider>
  )
}

export default App
