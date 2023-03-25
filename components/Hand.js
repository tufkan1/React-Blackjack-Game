import React from 'react';
import Card from './Card';

const Hand = ({ hand, isDealer, showDealerCards }) => {
    return (
        <div className="hand-container">
            {hand.map((card, index) => (
                <Card key={card.code} card={card} hidden={index === 0 && isDealer && !showDealerCards} />
            ))}
            <style jsx>{`
        .hand-container {
          display: flex;
          justify-content: center;
          align-items: center;
        }
      `}</style>
        </div>
    );
};

export default Hand;
