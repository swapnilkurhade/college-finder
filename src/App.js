import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, GraduationCap, Settings } from 'lucide-react';
import InputForm from './components/InputForm';
import CollegeGrid from './components/CollegeGrid';
import Admin from './components/Admin';
import { getRecommendations } from './data/colleges';
import './App.css';
import axios from "axios"; // add at the top


// Home Component
const Home = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [hasSearched, setHasSearched] = useState(false);

  // const handleGetRecommendations = (percentage, category, reservationCategory) => {
  //   console.log('Getting recommendations for:', percentage, category, reservationCategory);
  //   if (percentage !== null && category !== null && reservationCategory !== null) {
  //     const results = getRecommendations(percentage, category, reservationCategory);
  //     console.log('Found results:', results);
  //     setRecommendations(results);
  //     setHasSearched(true);
  //   } else {
  //     setRecommendations([]);
  //     setHasSearched(false);
  //   }
  // };


  const handleGetRecommendations = async (percentage, category, reservationCategory) => {
    console.log("Getting recommendations for:", percentage, category, reservationCategory);

    if (percentage !== null && reservationCategory !== null) {
      try {
        const response = await axios.get("http://127.0.0.1:8000/recommend", {
          params: {
            percentile: percentage,   
            category: reservationCategory 
          },
        });

        console.log("API response:", response.data);
        setRecommendations(response.data || []);
        setHasSearched(true);
      } catch (error) {
        console.error("Error fetching recommendations:", error);
        setRecommendations([]);
        setHasSearched(true);
      }
    } else {
      setRecommendations([]);
      setHasSearched(false);
    }
  };


  return (
    <div className="app">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-background">
          <div className="floating-shape shape-1"></div>
          <div className="floating-shape shape-2"></div>
          <div className="floating-shape shape-3"></div>
        </div>

        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <div className="hero-icon">
              <GraduationCap className="icon" />
            </div>

            <h1 className="hero-title">
              Find Your Perfect
              <span className="gradient-text"> College</span>
            </h1>

            <p className="hero-subtitle">
              Discover the best colleges that match your academic performance and career goals
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="search-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <InputForm onGetRecommendations={handleGetRecommendations} />
          </motion.div>

          {/* Results Section - Always show when searched */}
          {hasSearched && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="results-container"
            >
              <CollegeGrid colleges={recommendations} />
            </motion.div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-icon">
              <Sparkles className="icon" />
            </div>
            <p className="footer-text">
              Made with ❤️ for students seeking their perfect college match
            </p>
            <p className="footer-copyright">
              © 2024 College Finder. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Navigation Component
const Navigation = () => {
  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <GraduationCap className="nav-icon" />
          <span className="nav-title">College Finder</span>
        </Link>

        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/admin" className="nav-link">
            <Settings className="nav-link-icon" />
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
};

// Main App Component
function App() {
  return (
    <Router>
      <div className="app-wrapper">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;