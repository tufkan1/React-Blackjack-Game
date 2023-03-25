const API_BASE_URL = 'https://deckofcardsapi.com/api/deck';

export const createDeck = async () => {
    const response = await fetch(`${API_BASE_URL}/new/shuffle/?deck_count=1`);
    const data = await response.json();
    return data.deck_id;
};

export const drawCards = async (deckId, count) => {
    if (!deckId){
        deckId = "mglqg3f0sfou";
    }

    const response = await fetch(`${API_BASE_URL}/${deckId}/draw/?count=${count}`);
    const data = await response.json();
    return data.cards;
};

export const reshuffleDeck = async (deckId) => {
    await fetch(`${API_BASE_URL}/${deckId}/shuffle/`);
};
