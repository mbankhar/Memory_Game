import React, { useState, useEffect } from "react";

interface GameProps {
  images: string[];
  onBack: () => void;
}

const Game: React.FC<GameProps> = ({ images, onBack }) => {
  const [cards, setCards] = useState<any[]>([]);
  const [revealed, setRevealed] = useState<number[]>([]);
  const [matched, setMatched] = useState<number[]>([]);

  useEffect(() => {
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
      <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ fontSize: "28px", marginBottom: "20px", textAlign: "center" }}>
          You Won!
        </h1>
        <button
          onClick={onBack}
          style={{
            display: "block",
            margin: "20px auto 0",
            padding: "10px 20px",
            backgroundColor: "#5cb85c",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "0 auto" }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px", textAlign: "center" }}>
        Memory Game
      </h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: "20px",
        }}
      >
    {cards.map((card) => {
    const isRevealed = revealed.includes(card.id) || matched.includes(card.id);
    console.log("Rendering card", card.id, "isRevealed:", isRevealed);
    return (
        <div
        key={card.id}
        onClick={() => handleCardClick(card.id, card.image)}
        style={{
            width: `${cardSize}px`,
            height: `${cardSize}px`,
            cursor: "pointer",
            borderRadius: "8px",
            overflow: "hidden",
        }}
        >
        <img
            src={isRevealed ? card.image : "/back/back.jpg"}
            alt={isRevealed ? "front" : "back"}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
        />
        </div>
    );
    })}
               
      </div>
      <button
        onClick={onBack}
        style={{
          display: "block",
          margin: "20px auto 0",
          padding: "10px 20px",
          backgroundColor: "#d9534f",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: "pointer",
          fontSize: "16px",
        }}
      >
        Back to Upload
      </button>
    </div>
  );
};

export default Game;
