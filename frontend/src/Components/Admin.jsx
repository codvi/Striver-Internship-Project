import axios from 'axios';
import { useState, useEffect } from 'react';

export default function Admin() {
  const [flashcards, setFlashcards] = useState([]);
  const [editingFlashcard, setEditingFlashcard] = useState(null);
  const [editedQuestion, setEditedQuestion] = useState('');
  const [editedAnswer, setEditedAnswer] = useState('');
  const [noFlashcardsMessage, setNoFlashcardsMessage] = useState('');
  const [newQuestion, setNewQuestion] = useState('');
  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      console.error('No token found, please log in.');
    }

    const fetchFlashcards = async () => {
      try {
        const res = await axios.get('http://localhost:5000/flashcards');
        if (res.data.length === 0) {
          setNoFlashcardsMessage('No flashcards available.');
        } else {
          setFlashcards(res.data);
          setNoFlashcardsMessage('');
        }
      } catch (err) {
        console.error('Error fetching flashcards:', err);
      }
    };

    fetchFlashcards();
  }, [setFlashcards]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/flashcards/${id}`);
      setFlashcards(flashcards.filter((flashcard) => flashcard.id !== id));
    } catch (err) {
      console.error('Error deleting flashcard:', err);
    }
  };

  const handleEdit = (flashcard) => {
    setEditingFlashcard(flashcard.id);
    setEditedQuestion(flashcard.question);
    setEditedAnswer(flashcard.answer);
  };

  const handleSaveEdit = async () => {
    try {
      await axios.put(`http://localhost:5000/flashcards/${editingFlashcard}`, {
        question: editedQuestion,
        answer: editedAnswer,
      });
      setFlashcards(
        flashcards.map((flashcard) =>
          flashcard.id === editingFlashcard
            ? { ...flashcard, question: editedQuestion, answer: editedAnswer }
            : flashcard
        )
      );
      setEditingFlashcard(null);
      setEditedQuestion('');
      setEditedAnswer('');
    } catch (err) {
      console.error('Error updating flashcard:', err);
    }
  };

  const handleCancelEdit = () => {
    setEditingFlashcard(null);
    setEditedQuestion('');
    setEditedAnswer('');
  };

  const handleAddFlashcard = async () => {
    try {
      const res = await axios.post('http://localhost:5000/flashcards', {
        question: newQuestion,
        answer: newAnswer,
      });
      setFlashcards([...flashcards, res.data]);
      setNewQuestion('');
      setNewAnswer('');
    } catch (err) {
      console.error('Error adding flashcard:', err);
    }
  };

  return (
    <div className="p-8 bg-gradient-to-r from-teal-400 to-blue-500 min-h-screen pt-28">
      <h1 className="text-4xl font-extrabold text-center text-white mb-8">Admin Dashboard</h1>
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-white mb-4">Add New Flashcard</h2>
        <input
          type="text"
          value={newQuestion}
          onChange={(e) => setNewQuestion(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg"
          placeholder="Question"
        />
        <textarea
          value={newAnswer}
          onChange={(e) => setNewAnswer(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg"
          placeholder="Answer"
        />
        <button
          onClick={handleAddFlashcard}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Add Flashcard
        </button>
      </div>
      {noFlashcardsMessage ? (
        <p className="text-center text-white text-xl">{noFlashcardsMessage}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {flashcards.map((flashcard) => (
            <div key={flashcard.id} className="bg-white p-6 rounded-lg shadow-lg text-center">
              {editingFlashcard === flashcard.id ? (
                <div>
                  <input
                    type="text"
                    value={editedQuestion}
                    onChange={(e) => setEditedQuestion(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border rounded-lg"
                    placeholder="Edit question"
                  />
                  <textarea
                    value={editedAnswer}
                    onChange={(e) => setEditedAnswer(e.target.value)}
                    className="w-full px-4 py-2 mb-4 border rounded-lg"
                    placeholder="Edit answer"
                  />
                  <div className="flex justify-around">
                    <button
                      onClick={handleSaveEdit}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
                    >
                      Save
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      className="bg-gray-500 text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition-colors duration-300"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 mb-4">{flashcard.question}</h2>
                  <p className="text-gray-600 mb-6">{flashcard.answer}</p>
                  <div className="flex justify-around">
                    <button
                      onClick={() => handleEdit(flashcard)}
                      className="bg-yellow-400 text-white px-4 py-2 rounded-lg hover:bg-yellow-500 transition-colors duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(flashcard.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-300"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
