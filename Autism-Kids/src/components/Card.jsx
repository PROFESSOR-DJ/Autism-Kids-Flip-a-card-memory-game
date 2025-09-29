import React from 'react';
import '../styles/card.css';

const Card = ({ item, isFlipped, onClick }) => {

  return (

    <div 
      className={`memory-card ${isFlipped ? 'flipped' : ''}`}
      onClick={onClick}
      aria-label={isFlipped ? `Card showing ${item.content}` : 'Hidden card'}
    >

      <div className="card-inner">

        <div className="card-front bg-warning d-flex align-items-center justify-content-center">
          <span role="img" aria-hidden="true"></span>
        </div>

        
        <div className={`card-back bg-${item.color} d-flex align-items-center justify-content-center`}>
          <span className="display-4" role="img" aria-label={item.content}>
            {item.content}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;