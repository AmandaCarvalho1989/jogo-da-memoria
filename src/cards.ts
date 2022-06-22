import bookImage from "./assets/book.png";
import coffinImage from "./assets/coffin-1.png";
import eyeImage from "./assets/eye-1.png";
import hatImage from "./assets/hat-1.png";
import pumpkinImage from "./assets/pumpkin-1.png";
import puppetImage from "./assets/puppet-1.png";
import strawmanImage from "./assets/strawman-1.png";
import witchImage from "./assets/witch-1.png";
import zombbieImage from "./assets/zombbie-1.png";

const collections = [
  {
    collection: "book",
    image: bookImage,
  },
  {
    collection: "eye",
    image: eyeImage,
  },
  {
    collection: "coffin",
    image: coffinImage,
  },
  {
    collection: "hat",
    image: hatImage,
  },
  {
    collection: "pumpkin",
    image: pumpkinImage,
  },
  {
    collection: "puppet",
    image: puppetImage,
  },
  {
    collection: "strawman",
    image: strawmanImage,
  },
  {
    collection: "witch",
    image: witchImage,
  },
  {
    collection: "zombbie",
    image: zombbieImage,
  },
];

export const cards = collections
  .map((item) =>
    Array.from({ length: 2 }, (_, index) => ({
      id: `${item.collection}-${index + 1}`,
      ...item,
    }))
  )
  .flat();

const shuffle = (list: any) => list.sort(() => Math.random() - 0.5);

export const shuffledCards = shuffle(cards);

export const playAgain = () => shuffle(shuffledCards);
