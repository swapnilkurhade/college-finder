import React from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, BookOpen, Percent, Users } from 'lucide-react';

const CollegeCard = ({ college, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      whileHover={{ 
        y: -5, 
        scale: 1.02,
        transition: { duration: 0.3 }
      }}
      className="simple-college-card"
    >
      <div className="card-icon">
        <GraduationCap className="icon" />
      </div>
      
      <div className="card-info">
        <h3 className="college-name">{college.college_name}</h3>

        <div className="branch-info">
          <BookOpen className="branch-icon" />
          <span className="branch-name">{college.branch_name}</span>
        </div>

        <div className="percentile-info">
          <Percent className="percentile-icon" />
          <span className="percentile-text">
            Closing Percentile: {college.closing_percentile.toFixed(2)}%
          </span>
        </div>

        <div className="reservation-info">
          <Users className="reservation-icon" />
          <span className="reservation-text">Category: {college.category}</span>
        </div>

        <div className="status-info">
          <span className={`status-badge ${college.status.toLowerCase()}`}>
            {college.status}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

const CollegeGrid = ({ colleges }) => {
  if (!colleges || colleges.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="no-results"
      >
        <div className="no-results-content">
          <div className="no-results-icon">
            <GraduationCap className="icon" />
          </div>
          <h3 className="no-results-title">No Colleges Found</h3>
          <p className="no-results-text">
            Try adjusting your percentage or selecting a different category to find more options.
          </p>
        </div>
      </motion.div>
    );
  }

  // 👉 Show only top 10 colleges
  const topColleges = colleges.slice(0, 12);

  return (
    <div className="college-grid-container">
      <div className="results-header">
        <h2 className="results-title">Top 12 Recommended Colleges</h2>
        <p className="results-subtitle">
          Showing 12 out of {colleges.length} matches
        </p>
      </div>

      <div className="colleges-grid">
        {topColleges.map((college, index) => (
          <CollegeCard key={index} college={college} index={index} />
        ))}
      </div>
    </div>
  );
};

export default CollegeGrid;
