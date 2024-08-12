import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Flashcard from './Flashcard';
import './Flashcard.css';

const FlashcardList = () => {
  const [flashcard, setFlashcard] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // Start from index 0
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [noMoreCards, setNoMoreCards] = useState(false);

  const fetchFlashcard = async (index) => {
    try {
      const response = await axios.get(`http://localhost:5000/flashcards/${index}`);
      
      if (response.status === 200 && response.data) {
        setFlashcard(response.data);
        setNoMoreCards(false);
      } else {
        // When response is successful but no data is found
        setFlashcard(null);
        setNoMoreCards(true);
      }
      setLoading(false);
    } catch (err) {
      if (err.response && err.response.status === 404) {
        // Handle case when flashcard is not found
        setFlashcard(null);
        setNoMoreCards(true);
      } else {
        // Handle other errors
        setError(err);
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFlashcard(currentIndex);
  }, [currentIndex]);

  const handleNext = () => {
    if (!noMoreCards) {
      setLoading(true);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setLoading(true);
      setCurrentIndex(currentIndex - 1);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="flashcard-list">
      {flashcard ? (
        <Flashcard flashcard={flashcard} />
      ) : noMoreCards ? (
        <div className="no-more-cards font-bold text-2xl">No more flashcards available.</div>
      ) : (
        <div className="no-flashcard">Previous Card was last card</div>
      )}
      <div className="navigation-buttons">
        <button onClick={handlePrevious} disabled={currentIndex === 0}>Previous</button>
        <button onClick={handleNext} disabled={noMoreCards}>Next</button>
      </div>
    </div>
  );
};

export default FlashcardList;
