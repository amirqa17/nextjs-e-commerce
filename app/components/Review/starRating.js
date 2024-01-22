import React, { useState } from "react";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

const StarRating = ({ rating, onRatingChange }) => {
  const [hoveredRating, setHoveredRating] = useState(null);

  const handleStarClick = (selectedRating) => {
    onRatingChange(selectedRating);
  };

  const handleStarHover = (hoveredRating) => {
    setHoveredRating(hoveredRating);
  };

  const handleStarLeave = () => {
    setHoveredRating(null);
  };

  const renderStar = (index) => {
    const isSelected = index <= rating;
    const isHovered = index <= hoveredRating;

    if (isSelected) {
      return <FaStar key={index} className="text-yellow-500" />;
    } else if (isHovered) {
      return <FaStarHalfAlt key={index} className="text-yellow-500" />;
    } else {
      return <FaStar key={index} className="text-gray-300" />;
    }
  };

  return (
    <div className="flex items-center space-x-1 cursor-pointer">
      {[1, 2, 3, 4, 5].map((index) => (
        <div
          key={index}
          onClick={() => handleStarClick(index)}
          onMouseEnter={() => handleStarHover(index)}
          onMouseLeave={handleStarLeave}
        >
          {renderStar(index)}
        </div>
      ))}
    </div>
  );
};

export default StarRating;
