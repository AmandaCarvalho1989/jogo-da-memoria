import React, { useState } from "react";
import "./App.css";
import questionImage from "./assets/fonts/question.svg";
import titleImg from "./assets/fonts/title.svg";
import { cards } from "./cards";

const App = () => {
  const [flippedCards, setFlippedCards] = useState<any>([]);
  const [completedCards, setCompletedCards] = useState<any>([]);

  const onFlipCard = (card: any) => {
    if (!flippedCards.length) {
      setFlippedCards([card]);
    } else if (flippedCards.length === 1) {
      const isAlreadyFlipped = isThisCardAlreadyFlipped(card);
      if (isAlreadyFlipped) {
        return;
      }
      setFlippedCards([...flippedCards, card]);
      const firstFlippedCard = flippedCards[0];
      const isSameCollection = firstFlippedCard.collection === card.collection;
      if (isSameCollection) {
        setCompletedCards([...completedCards, firstFlippedCard, card]);
      }

      setTimeout(() => {
        setFlippedCards([]);
      }, 1000);
      return;
    } else return;
  };

  const isThisCardCompleted = (card: any) =>
    completedCards.find((completed: any) => completed.id === card.id);
  const isThisCardAlreadyFlipped = (card: any) =>
    flippedCards.find((flipped: any) => flipped.id === card.id);

  return (
    <main className="container">
      <img src={titleImg} alt="jogo da memoria" />
      <section className="cards">
        {cards.map((card, idx) => {
          const isCompleted = isThisCardCompleted(card);
          const isThisFlipped = isThisCardAlreadyFlipped(card);
          const isCompletedOrFlipped = isCompleted || isThisFlipped;
          const shownImage = isCompletedOrFlipped ? card.image : questionImage;
          return (
            <div
              key={idx}
              id={card.id}
              className={`card-item ${
                !isCompletedOrFlipped ? "unflipped" : "flipped"
              }`}
              onClick={() => onFlipCard(card)}
            >
              <img src={shownImage} alt="teste" />
            </div>
          );
        })}
      </section>
    </main>
  );
};

export default App;
