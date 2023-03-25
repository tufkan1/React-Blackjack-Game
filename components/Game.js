import styles from '@/styles/Game.module.css';
import React, {useEffect, useState} from 'react';
import Bet from './Bet';
import Card from './Card';
import Player from './Player';
import {drawCards} from '@/lib/api';
import {gameResult, handValue, playBlackjack} from '@/lib/gameLogic';
import { Alert } from "@/components/Alert";

const Game = () => {
    const [deckId, setDeckId] = useState(null);
    const [playerId, setPlayerId] = useState(null);
    const [playerHand, setPlayerHand] = useState([]);
    const [dealerHand, setDealerHand] = useState([]);
    const [showDealerCards, setShowDealerCards] = useState(false);
    const [gameOver, setGameOver] = useState(false);
    const [balance, setBalance] = useState(1000);
    const [bet, setBet] = useState(0);
    const [gamePlaying, setGamePlaying] = useState(false);
    const [restartButton, setRestartButton] = useState(false);
    const [lastBet, setLastBet] = useState(null);

    useEffect(() => {
        setPlayerId(generatePlayerId());
    }, []);

    const generatePlayerId = () => {
        return '_' + Math.random().toString(36).substr(2, 9);
    };

    const handlePlaceBet = async (betAmount) => {
        const res = await playBlackjack(playerId, betAmount);
        setPlayerHand(res.playerHand);
        setDealerHand(res.dealerHand);
        setDeckId(res.deckId);
        setBet(betAmount);
        setGamePlaying(true);
    };

    const handleHit = async () => {
        const newCards = await drawCards(deckId, 1);
        setPlayerHand((prevHand) => [...prevHand, ...newCards]);

        const updatedHand = [...playerHand, ...newCards];

        const playerDrawCards = async () => {
            let currentPlayerHandValue = await handValue(updatedHand);

            if (currentPlayerHandValue > 21) {
                // Oyuncu 21'i geçti, oyunu sonlandır ve bakiyeyi güncelle
                const result = "dealer";
                await handleGameEnd(result);
                return true; // 21'i geçtiğini bildirin
            } else if (currentPlayerHandValue === 21) {
                // Oyuncunun eli 21 ise, otomatik olarak stand
                await handleStand();
                return false;
            }
            return false; // 21'i geçmediğini bildirin
        };

        await playerDrawCards();
    };

    const handleStand = async () => {
        // Krupiyenin kartlarını göster
        setShowDealerCards(true);

        // Oyunun sonucunu belirle ve bakiyeyi güncelle
        const result = await gameResult(playerHand, dealerHand, deckId);
        await handleGameEnd(result);
    };

    useEffect(() => {
        if (showDealerCards) {
            // Oyunun sonucunu belirle ve bakiyeyi güncelle
            const determineResult = async () => {
                const result = await gameResult(playerHand, dealerHand);
                await handleGameEnd(result);
            };

            determineResult();
        }
    }, [dealerHand]);

    const handleGameEnd = async (result, isBj = false) => {
        if (result === null) {
            return;
        }

        // Oyunun sona erdiğini belirt
        setGameOver(true);

        // Oyunun sonucunu ve mesajını belirle
        let message = "";
        let messageType = "success";
        let balanceChange = 0;

        if (isBj === true){
            message = "Blackjack!";
            balanceChange = bet * 1.5;
        }else{
            if (result === "player") {
                message = "You win!";
                balanceChange = bet;
            } else if (result === "dealer") {
                message = "You lose!";
                balanceChange = -bet;
                messageType = "error";
            } else {
                message = "It's a draw!";
                messageType = "warning";
            }
        }

        Alert({ message, type: messageType });

        // Oyuncunun bakiyesini güncelle
        setBalance(balance + balanceChange);
        setRestartButton(true);

        setLastBet(bet);
    };

    const handleRestart = () => {
        setPlayerHand([]);
        setDealerHand([]);
        setShowDealerCards(false);
        setGameOver(false);
        setBet(0);
        setDeckId(null);
        setGamePlaying(false);
        setRestartButton(false);
    };

    return (
        <>
            { balance < 10 && (
                <>
                    <div className="game-container text-center">
                        <div className={styles.jumbotron + " d-flex flex-column align-items-center justify-content-center"}>
                            <h4 className={"display-6"}>Your balance is less than $10, you can refresh the page to join the new game.</h4>
                        </div>
                    </div>
                </>
            )}
            { balance >= 10 && (
                <>
                    <div className="game-container text-center">
                        <h1 className={"my-5"}>Blackjack</h1>
                        <div className="dealer">
                            { gamePlaying && (
                                <>
                                    <h2>Dealer</h2>
                                </>
                            )}
                            <div className="dealer-hand">
                                {dealerHand && dealerHand.map((card, index) => (
                                    <Card key={card.code} card={card} hidden={index === 1 && !showDealerCards} />
                                ))}
                            </div>
                        </div>
                        <div className="player mt-5">
                            { gamePlaying && (<h2>Player</h2>)}
                            <Player playerId={playerId} balance={balance} bet={bet} />
                            { gamePlaying && (
                                <>
                                    <div className="player-hand">
                                        {playerHand.map((card) => (
                                            <Card key={card.code} card={card} />
                                        ))}
                                    </div>
                                </>
                            )}
                            {!gameOver && !gamePlaying && <Bet onPlaceBet={handlePlaceBet} lastBet={lastBet} balance={balance} />}
                        </div>
                        { gamePlaying && (
                            <div className="buttonArea d-flex flex-row align-items-center justify-content-center mt-4">
                                { gamePlaying && !gameOver && (
                                    <>
                                        <button className={"standButton btn btn-outline-warning px-4 me-3"} onClick={handleStand}>Stand</button>
                                        <button className={"hitButton btn btn-success px-4"} onClick={handleHit}>Hit</button>
                                    </>
                                )}
                                { restartButton && (
                                    <button className={"restartButton btn btn-outline-primary px-4"} onClick={handleRestart}>Restart</button>
                                )}
                            </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
};

export default Game;
