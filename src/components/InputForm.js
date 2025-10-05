import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Percent, BookOpen, Search, ArrowRight, Users } from 'lucide-react';
import { categories, reservationCategories } from '../data/colleges';

const InputForm = ({ onGetRecommendations }) => {
  const [percentage, setPercentage] = useState('');
  const [category, setCategory] = useState('');
  const [reservationCategory, setReservationCategory] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (percentage && reservationCategory) {
      setIsSubmitted(true);
      onGetRecommendations(parseFloat(percentage), category, reservationCategory);
    }
  };

  const handleReset = () => {
    setPercentage('');
    setCategory('');
    setReservationCategory('');
    setIsSubmitted(false);
    onGetRecommendations(null, null, null);
  };

  return (
    <div className="search-form-container">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="search-form"
      >
        <div className="form-header">
          <div className="form-icon">
            <Search className="icon" />
          </div>
          <h2 className="form-title">Get Your Recommendations</h2>
          <p className="form-subtitle">
            Enter your details to find the perfect college match
          </p>
        </div>

        <form onSubmit={handleSubmit} className="form-content">
          <div className="form-group">
            <label className="form-label">
              <Percent className="label-icon" />
              Your Percentage
            </label>
            <div className="input-container">
              <input
                type="number"
                min="0"
                max="100"
                step="0.01"
                value={percentage}
                onChange={(e) => setPercentage(e.target.value)}
                className="form-input"
                placeholder="Enter your percentage"
                required
              />
              <span className="input-suffix">%</span>
            </div>
          </div>

          {/* <div className="form-group">
            <label className="form-label">
              <BookOpen className="label-icon" />
              Field of Interest
            </label>
            <div className="select-container">
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="form-select"
                required
              >
                <option value="">Select your field</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <div className="select-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </div>
            </div>
          </div> */}

          <div className="form-group">
            <label className="form-label">
              <Users className="label-icon" />
              Reservation Category
            </label>
            <div className="select-container">
              <select
                value={reservationCategory}
                onChange={(e) => setReservationCategory(e.target.value)}
                className="form-select"
                required
              >
                <option value="">Select your category</option>
                {reservationCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <div className="select-arrow">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 9l6 6 6-6"/>
                </svg>
              </div>
            </div>
          </div>

          <div className="form-actions">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="btn-primary"
            >
              <span>Get Recommendations</span>
              <ArrowRight className="btn-icon" />
            </motion.button>
            
            {isSubmitted && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleReset}
                className="btn-secondary"
              >
                Reset
              </motion.button>
            )}
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default InputForm;