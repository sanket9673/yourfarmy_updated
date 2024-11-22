import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import FeatureSection from './components/FeatureSection';
import F_C from './components/F_C'; 
import FarmerForm from './components/FarmerForm'; 
import WorkFlow from './components/WorkFlow';
import Price from './components/Price';
import Testimonials from './components/Testimonials';
import About from './components/About'; // Import About Component
import FooterSection from './components/FooterSection';
import { AuthContext, ContextProvider } from './contexts/AuthContext';
import SignIn from './components/SignIn';
import Register from './components/Register';
import FAQ from './components/FAQ';
import Community from './components/Community';

// ProtectedRoute component to check authentication before rendering protected pages
const ProtectedRoute = ({ element }) => {
  const { state } = useContext(AuthContext);
  return state.isLoggedIn ? element : <Navigate to="/signin" />;
};

function App() {
  return (
    <ContextProvider>
      <Router>
        <Navbar />
        <div className="max-w-7xl mx-auto pt-20 px-6">
          <Routes>
            {/* Public routes */}
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} /> {/* Registration route */}

            {/* Protected routes */}
            <Route path="/" element={<ProtectedRoute element={<HeroSection />} />} />
            <Route path="/features" element={<ProtectedRoute element={<FeatureSection />} />} />
            <Route path="/workflow" element={<ProtectedRoute element={<WorkFlow />} />} />
            <Route path="/price" element={<ProtectedRoute element={<Price />} />} />
            <Route path="/testimonials" element={<ProtectedRoute element={<Testimonials />} />} />
            <Route path="/about" element={<ProtectedRoute element={<About />} />} /> {/* Add About route */}
            <Route path="/faq" element={<ProtectedRoute element={<FAQ />} />} /> {/* Add About route */}
            <Route path="/community" element={<ProtectedRoute element={<Community />} />} />

            <Route path="/farmer-consumer" element={<ProtectedRoute element={<F_C />} />} />
            <Route path="/farmer-form" element={<ProtectedRoute element={<FarmerForm />} />} />
          </Routes>
        </div>
        <FooterSection />
      </Router>
    </ContextProvider>
  );
}

export default App;
