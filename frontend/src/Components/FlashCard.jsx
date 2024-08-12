import { useState } from 'react';
import './Flashcard.css'; 

const Flashcard = ({ flashcard }) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className="flip-container flex justify-center" onClick={() => setFlipped(!flipped)}>
      <div className={`flipper ${flipped ? 'flipped' : ''}`}>
        <div className="front">
          {flashcard.question}
        </div>
        <div className="back">
          {flashcard.answer}
        </div>
      </div>
    </div>
  );
};

export default Flashcard;
