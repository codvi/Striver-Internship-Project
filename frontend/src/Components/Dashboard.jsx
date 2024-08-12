import React, { useState } from 'react';

const Dashboard = ({ flashcards, setFlashcards }) => {
  const [newFlashcard, setNewFlashcard] = useState({ question: '', answer: '' });

  const handleAdd = () => {
    setFlashcards([...flashcards, newFlashcard]);
    setNewFlashcard({ question: '', answer: '' });
  };

  const handleDelete = (index) => {
    setFlashcards(flashcards.filter((_, i) => i !== index));
  };

  const handleEdit = (index, updatedFlashcard) => {
    const updatedFlashcards = flashcards.map((flashcard, i) =>
      i === index ? updatedFlashcard : flashcard
    );
    setFlashcards(updatedFlashcards);
  };

  return (
    <div className="w-full max-w-md mx-auto mt-8 p-4 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">Dashboard</h2>
      <div className="flex flex-col space-y-2">
        <input
          type="text"
          placeholder="Question"
          value={newFlashcard.question}
          onChange={(e) => setNewFlashcard({ ...newFlashcard, question: e.target.value })}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <input
          type="text"
          placeholder="Answer"
          value={newFlashcard.answer}
          onChange={(e) => setNewFlashcard({ ...newFlashcard, answer: e.target.value })}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <button
          onClick={handleAdd}
          className="px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-700 transition-colors"
        >
          Add Flashcard
        </button>
      </div>

      <ul className="mt-6 space-y-2 bg-black border-2">
        {flashcards.map((flashcard, index) => (
          <li key={index} className="flex justify-between items-center p-2 bg-white rounded-lg shadow-sm">
            <div className="text-gray-700">Q: {flashcard.question} A: {flashcard.answer}</div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleDelete(index)}
                className="px-2 py-1 bg-red-500 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => handleEdit(index, { ...flashcard, question: 'Edited Question' })}
                className="px-2 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-700 transition-colors"
              >
                Edit
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
