import React, { useState } from "react";
import { useMemo } from "react";
import "./App.css";
import questionImage from "./assets/fonts/question.svg";
import titleImg from "./assets/fonts/title.svg";
import buuhImage from "./assets/fonts/scary-text.svg";
import { playAgain, shuffledCards } from "./cards";

const App = () => {
  const [cards, setCards] = useState(shuffledCards);
  const [flippedCards, setFlippedCards] = useState<any>([]);
  const [completedCards, setCompletedCards] = useState<any>([]);

  const isGameCompletted = useMemo(() => {
    return completedCards.length === cards.length;
  }, [cards.length, completedCards.length]);

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

  const handleClickPlayAgain = () => {
    setCompletedCards([]);
    setFlippedCards([]);
    const playedCards = playAgain();
    setCards(playedCards);
  };

  return (
    <main className="container">
      <img src={titleImg} alt="jogo da memoria" id="title" />
      <section className="cards">
        {cards.map(
          (
            card: { image: any; id: string | undefined },
            idx: React.Key | null | undefined
          ) => {
            const isCompleted = isThisCardCompleted(card);
            const isThisFlipped = isThisCardAlreadyFlipped(card);
            const isCompletedOrFlipped = isCompleted || isThisFlipped;
            const shownImage = isCompletedOrFlipped
              ? card.image
              : questionImage;
            return (
              <div
                key={idx}
                id={card.id}
                className={`card-item ${
                  isCompletedOrFlipped ? "flipped" : "unflipped"
                }`}
                onClick={() => onFlipCard(card)}
              >
                <img
                  id="card-image"
                  src={shownImage}
                  alt={isCompletedOrFlipped ? card.id : "unflipped"}
                />
              </div>
            );
          }
        )}

        {isGameCompletted && (
          <div className="modal" id="demo">
            <div className="modal-container">
              <img src={buuhImage} alt="scary" />
              <p>
                Parabéns, você terminou esse jogo da memória. Experimente jogar
                uma outra dificuldade ou jogue na mesma novamente.
              </p>
              <button
                type="button"
                className="play-again"
                onClick={handleClickPlayAgain}
              >
                Jogar novamente
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default App;
