import React from 'react'
import { Routes, Route } from 'react-router-dom'
import { LandingPage } from './pages/LandingPage'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Home } from './pages/Home'
import { ProductDetails } from './pages/ProductDetails'
import { Checkout } from './pages/Checkout'
import { Navbar } from './components/Navbar'
import { Footer } from './components/Footer'
import { CartProvider } from './context/CartContext'
import { About } from './pages/About'
import { Benefits } from './pages/Benefits'
import { Ingredients } from './pages/Ingredients'

import { Profile } from './pages/Profile'
import { Terms } from './pages/Terms'
import { Privacy } from './pages/Privacy'
import { Contact } from './pages/Contact'
import { Shipping } from './pages/Shipping'

function App() {
    return (
        <CartProvider>
            <div className="min-h-screen flex flex-col">
                <Navbar />
                <main className="flex-grow pt-24">
                    <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/terms" element={<Terms />} />
                        <Route path="/privacy" element={<Privacy />} />
                        <Route path="/shipping" element={<Shipping />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/benefits" element={<Benefits />} />
                        <Route path="/ingredients" element={<Ingredients />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </CartProvider>
    )
}

export default App
