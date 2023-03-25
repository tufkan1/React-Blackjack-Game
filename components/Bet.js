import React, {useEffect, useState} from 'react';

const Bet = ({ onPlaceBet, lastBet = null, balance = 1000 }) => {
    const [betAmount, setBetAmount] = useState(10);

    useEffect(() => {
        if (lastBet) {
            setBetAmount(lastBet);
        }
    }, [lastBet]);

    const handleBetChange = (event) => {
        setBetAmount(parseInt(event.target.value, 10));
    };

    const handlePlaceBet = () => {
        onPlaceBet(betAmount);
    };

    return (
        <div className="bet-container container">
            <h3>Place your bet</h3>
            <div className="d-flex flex-column align-items-center justify-content-center mt-4">
                <select value={balance < betAmount ? balance : betAmount} className={"form-control w-25 mb-4"} onChange={handleBetChange}>
                    <option disabled={balance < 10} value="10">$10</option>
                    <option disabled={balance < 20} value="20">$20</option>
                    <option disabled={balance < 30} value="30">$30</option>
                    <option disabled={balance < 40} value="40">$40</option>
                    <option disabled={balance < 50} value="50">$50</option>
                    <option disabled={balance < 60} value="60">$60</option>
                    <option disabled={balance < 70} value="70">$70</option>
                    <option disabled={balance < 80} value="80">$80</option>
                    <option disabled={balance < 90} value="90">$90</option>
                    <option disabled={balance < 100} value="100">$100</option>
                </select>
                <button onClick={handlePlaceBet} className={"btn btn-outline-info px-4 w-25"}>Place Bet</button>
            </div>
        </div>
    );
};

export default Bet;
