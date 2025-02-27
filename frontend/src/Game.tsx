import React, { useState, useEffect } from "react";
import "./styles.css";

interface GameProps {
  images: string[];
  onBack: () => void;
}

const Game: React.FC<GameProps> = ({ images, onBack }) => {
  const [cards, setCards] = useState<any[]>([]);
  const [revealed, setRevealed] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);
  const [flipCount, setFlipCount] = useState(0); // New counter

  useEffect(() => {
    if (images.length > 0) {
      const fetchCards = async () => {
        const response = await fetch("/start-game", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ images }),
        });
        const data = await response.json();
        console.log("Cards:", data.cards);
        setCards(data.cards);
      };
      fetchCards();
    }
  }, [images]);

  const getCardSize = (cardCount: number) => {
    if (cardCount <= 8) return 192;
    if (cardCount <= 16) return 128;
    return 96;
  };

  const handleCardClick = (cardId: number, cardImage: string) => {
    if (revealed.length >= 2 || revealed.includes(cardId) || matched.includes(cardId)) {
      return;
    }
    console.log("Flipping card:", cardId, "Image:", cardImage);
    setFlipCount(flipCount + 1); // Increment counter
    const newRevealed = [...revealed, cardId];
    setRevealed(newRevealed);

    if (newRevealed.length === 2) {
      const firstCard = cards.find((c) => c.id === newRevealed[0]);
      const secondCard = cards.find((c) => c.id === newRevealed[1]);
      if (firstCard.image === secondCard.image) {
        setMatched([...matched, firstCard.id, secondCard.id]);
        setRevealed([]);
      } else {
        setTimeout(() => setRevealed([]), 1000);
      }
    }
  };

  const cardSize = getCardSize(cards.length);
  const allMatched = matched.length === cards.length && cards.length > 0;

  if (allMatched) {
    return (
      <div className="game-container">
        <h1 className="won-message">You Won!</h1>
        <p className="no-images">Flips: {flipCount}</p> {/* Show flip count */}
        <button onClick={onBack} className="start-button">Play Again</button>
      </div>
    );
  }

  return (
    <div className="game-container">
      <h1>Memory Game</h1>
      <p>Flips: {flipCount}</p> {/* Show live flip count */}
      {images.length > 0 && cards.length > 0 ? (
        <div className="card-grid">
          {cards.map((card) => {
            const isRevealed = revealed.includes(card.id) || matched.includes(card.id);
            console.log("Rendering card", card.id, "isRevealed:", isRevealed);
            return (
              <div
                key={card.id}
                onClick={() => handleCardClick(card.id, card.image)}
                className="card"
                style={{ width: `${cardSize}px`, height: `${cardSize}px` }}
              >
                <div className="card-inner" style={{ transform: isRevealed ? "rotateY(180deg)" : "rotateY(0deg)" }}>
                  <div className="card-back">
                    <img src="/back/back.jpg" alt="back" />
                  </div>
                  <div className="card-front">
                    <img src={card.image} alt="front" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p className="no-images">No images to play with!</p>
      )}
      <button onClick={onBack} className="back-button">Back to Upload</button>
    </div>
  );
};

export default Game;