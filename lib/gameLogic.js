import { createDeck, drawCards } from './api';

export const cardValue = (card) => {
    const rank = card.value;
    if (['KING', 'QUEEN', 'JACK'].includes(rank)) {
        return 10;
    } else if (rank === 'ACE') {
        return 11;
    } else {
        return parseInt(rank, 10);
    }
};

export const handValue = async (hand) => {
    let value = 0;
    let aceCount = 0;

    hand.forEach((card) => {
        const cardVal = cardValue(card);

        if (cardVal === 11) {
            aceCount++;
        }
        value += cardVal;
    });

    while (value > 21 && aceCount > 0) {
        value -= 10;
        aceCount--;
    }
    return value;
};

export const gameResult = async (playerHand, dealerHand, deckId) => {
    let playerValue = await handValue(playerHand);
    let dealerValue = await handValue(dealerHand);

    while (dealerValue === null) {
        dealerValue = await handValue(dealerHand);
    }

    while (playerValue === null) {
        playerValue = await handValue(playerHand);
    }

    // Dealer'in soft 17'de veya daha düşük değerde kart çekmesini sağlayın
    while (dealerValue < 17) {
        const newCard = await drawCards(deckId, 1);
        dealerHand.push(newCard[0]);
        dealerValue = await handValue(dealerHand);
    }


    if (playerValue > 21) {
        return 'dealer';
    } else if (dealerValue > 21) {
        return 'player';
    } else if (playerValue > dealerValue) {
        return 'player';
    } else if (playerValue < dealerValue) {
        return 'dealer';
    }

    return 'push';
};

export const playBlackjack = async (betAmount) => {
    // Yeni bir deste oluşturun ve karıştır
    const deckId = await createDeck();

    // Oyuncuya ve krupiyeye başlangıç kartlarını dağıt
    const playerCards = await drawCards(deckId, 2);
    const dealerCards = await drawCards(deckId, 2);

    // Oyun başlangıç durumunu döndürün
    return {
        deckId: deckId,
        playerHand: playerCards,
        dealerHand: dealerCards,
    };
};
