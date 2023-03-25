import React from 'react';

const Card = ({ card, hidden }) => {
    const cardImage = hidden ? '/back.png' : card.image;

    return (
        <div className="card-container">
            <img className="card" src={cardImage} />
            <style jsx>{`
        .card-container {
          display: inline-block;
          margin: 0 5px;
        }
        .card {
          width: 80px;
          height: auto;
          border-radius: 5px;
          user-drag: none;
          user-select: none;
        }
      `}</style>
        </div>
    );
};

export default Card;
