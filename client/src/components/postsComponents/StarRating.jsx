import React, { useState, useEffect } from 'react';
import './StarRating.css';

const StarRating = ({ rating, onRate, disabled }) => {
  const [hoverRating, setHoverRating] = useState(0);
  const [selectedRating, setSelectedRating] = useState(0);

  useEffect(() => {
    setSelectedRating(rating); // Actualizar el estado local cuando cambie la calificación
  }, [rating]);

  const handleClick = (value) => {
    if (!disabled) {
      setSelectedRating(value); // Actualizar el estado local al hacer clic
      if (onRate) {
        onRate(value); // Llamar a la función de puntuación proporcionada por el padre, si está definida
      }
    }
  };

  const handleMouseOver = (value) => {
    if (!disabled) {
      setHoverRating(value); // Actualizar el estado de hover al pasar el ratón sobre las estrellas
    }
  };

  const handleMouseLeave = () => {
    setHoverRating(0); // Restablecer el estado de hover al salir del área de las estrellas
  };

  const starRatingClassName = `star-rating ${disabled ? 'disabled' : ''}`;

  const stars = Array.from({ length: 5 }, (_, index) => index + 1).map((starValue) => (
    <span
      key={starValue}
      className={`star ${selectedRating >= starValue || hoverRating >= starValue ? 'filled' : ''}`}
      onClick={() => handleClick(starValue)}
      onMouseOver={() => handleMouseOver(starValue)}
      onMouseLeave={handleMouseLeave}
    >
      ★
    </span>
  ));

  return (
    <div className={starRatingClassName}>
      {stars}
    </div>
  );
};

export default StarRating;
