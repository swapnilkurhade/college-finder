export const colleges = [
  {
    id: 1,
    name: "Indian Institute of Technology Bombay",
    category: "Engineering",
    minPercentage: 95,
    maxPercentage: 100,
    location: "Mumbai, Maharashtra",
    rating: 4.9,
    fees: "₹2,00,000/year",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=500&h=300&fit=crop",
    description: "Premier engineering institute with world-class facilities and excellent placement records.",
    courses: ["Computer Science", "Mechanical Engineering", "Electrical Engineering", "Civil Engineering"],
    placement: "98%",
    established: "1958"
  },
  {
    id: 2,
    name: "Delhi University",
    category: "Arts & Science",
    minPercentage: 85,
    maxPercentage: 100,
    location: "New Delhi",
    rating: 4.7,
    fees: "₹50,000/year",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&h=300&fit=crop",
    description: "One of India's most prestigious universities offering diverse courses in arts, science, and commerce.",
    courses: ["Economics", "Political Science", "Mathematics", "Physics", "Chemistry"],
    placement: "85%",
    established: "1922"
  },
  {
    id: 3,
    name: "All India Institute of Medical Sciences",
    category: "Medical",
    minPercentage: 98,
    maxPercentage: 100,
    location: "New Delhi",
    rating: 4.9,
    fees: "₹1,500/year",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop",
    description: "India's premier medical institute known for excellence in medical education and research.",
    courses: ["MBBS", "MD", "MS", "PhD"],
    placement: "100%",
    established: "1956"
  },
  {
    id: 4,
    name: "Indian Institute of Management Ahmedabad",
    category: "Management",
    minPercentage: 90,
    maxPercentage: 100,
    location: "Ahmedabad, Gujarat",
    rating: 4.8,
    fees: "₹20,00,000/year",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop",
    description: "Top-ranked business school offering world-class management education.",
    courses: ["MBA", "PGP", "FPM", "Executive Programs"],
    placement: "100%",
    established: "1961"
  },
  {
    id: 5,
    name: "National Institute of Technology Trichy",
    category: "Engineering",
    minPercentage: 88,
    maxPercentage: 95,
    location: "Tiruchirappalli, Tamil Nadu",
    rating: 4.6,
    fees: "₹1,50,000/year",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=500&h=300&fit=crop",
    description: "Premier engineering institute with excellent infrastructure and faculty.",
    courses: ["Computer Science", "Mechanical Engineering", "Electronics", "Chemical Engineering"],
    placement: "95%",
    established: "1964"
  },
  {
    id: 6,
    name: "Jawaharlal Nehru University",
    category: "Arts & Science",
    minPercentage: 80,
    maxPercentage: 95,
    location: "New Delhi",
    rating: 4.5,
    fees: "₹30,000/year",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&h=300&fit=crop",
    description: "Renowned for social sciences, international studies, and research excellence.",
    courses: ["International Relations", "Sociology", "History", "Economics"],
    placement: "80%",
    established: "1969"
  },
  {
    id: 7,
    name: "Christian Medical College",
    category: "Medical",
    minPercentage: 95,
    maxPercentage: 100,
    location: "Vellore, Tamil Nadu",
    rating: 4.7,
    fees: "₹5,00,000/year",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=500&h=300&fit=crop",
    description: "Premier medical college with excellent clinical training and research facilities.",
    courses: ["MBBS", "MD", "MS", "Nursing"],
    placement: "98%",
    established: "1900"
  },
  {
    id: 8,
    name: "Xavier Institute of Management",
    category: "Management",
    minPercentage: 85,
    maxPercentage: 95,
    location: "Bhubaneswar, Odisha",
    rating: 4.4,
    fees: "₹15,00,000/year",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=300&fit=crop",
    description: "Leading management institute with strong industry connections and placement record.",
    courses: ["MBA", "PGDM", "Executive MBA"],
    placement: "95%",
    established: "1987"
  },
  {
    id: 9,
    name: "Birla Institute of Technology and Science",
    category: "Engineering",
    minPercentage: 85,
    maxPercentage: 95,
    location: "Pilani, Rajasthan",
    rating: 4.5,
    fees: "₹3,00,000/year",
    image: "https://images.unsplash.com/photo-1562774053-701939374585?w=500&h=300&fit=crop",
    description: "Premier private engineering institute with excellent infrastructure and faculty.",
    courses: ["Computer Science", "Mechanical", "Electronics", "Chemical"],
    placement: "92%",
    established: "1964"
  },
  {
    id: 10,
    name: "Lady Shri Ram College",
    category: "Arts & Science",
    minPercentage: 90,
    maxPercentage: 100,
    location: "New Delhi",
    rating: 4.6,
    fees: "₹40,000/year",
    image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=500&h=300&fit=crop",
    description: "Premier women's college known for excellence in liberal arts and sciences.",
    courses: ["Economics", "Psychology", "Mathematics", "English"],
    placement: "88%",
    established: "1956"
  }
];

export const categories = [
  "Engineering",
  "Medical", 
  "Management",
  "Arts & Science"
];

export const reservationCategories = [
  "OPEN",
  "SC", 
  "ST",
  "OBC"
];

export const getRecommendations = (percentage, category, reservationCategory) => {
  return colleges.filter(college => 
    college.category === category && 
    percentage >= college.minPercentage && 
    percentage <= college.maxPercentage
  ).sort((a, b) => b.rating - a.rating);
};