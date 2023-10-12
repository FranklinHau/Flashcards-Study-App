import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDeckId } from './deckSlice';

const Cards = () => {
  // Using Redux hooks for state management and dispatching actions
  const dispatch = useDispatch();

  // Getting the current deck ID from the Redux store
  const currentDeckId = useSelector(state => state.deck.currentDeckId);

  // Local state to manage the cards data
  const [cards, setCards] = useState([
    { question: '', answer: '', hint: '' }
  ]);

  // Hook to programmatically navigate using react-router
  const navigate = useNavigate();

  // Function to handle deck selection and update the deck ID in the Redux store
  const handleDeckSelection = (selectedDeckId) => {
    dispatch(setDeckId(selectedDeckId)); 
  }

  // Function to handle changes to card fields
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...cards];
    list[index][name] = value;
    setCards(list);
  };

  // Function to add a new card to the cards list
  const handleAddCard = () => {
    setCards([...cards, { question: '', answer: '', hint: '' }]);
  };

  // Function to handle card submission and save them to the backend
  const handleSubmit = async () => {
    console.log('Cards to save:', cards);

    // Making a POST request to save the cards to the backend
    try {
      const response = await fetch(`/saveCards/${currentDeckId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cards: cards }),
      });

      // Handling response from the backend
      if (response.ok) {
        console.log('Cards saved successfully');
        navigate('/profile');
      } else {
        console.log('Failed to save cards');
      }
    } catch (error) {
      console.error('An error occurred while saving the cards:', error);
    }
  };

  // Rendering the UI for the Cards component
  return (
    <div>
      <h1>Add Cards</h1>
      {/* Mapping through the cards list and rendering card fields */}
      {cards.map((x, i) => {
        return (
          <div className="card" key={i}>
            <textarea 
              name="question"
              placeholder="Enter Question"
              value={x.question}
              onChange={e => handleChange(e, i)}
              className="largeField"
            />
            <textarea 
              name="answer"
              placeholder="Enter Answer"
              value={x.answer}
              onChange={e => handleChange(e, i)}
              className="largeField"
            />
            <input
              name="hint"
              placeholder="Enter Hint"
              value={x.hint}
              onChange={e => handleChange(e, i)}
              maxLength="9" // Maximum of 9 characters
              pattern="\b\w+\b" // Only one word allowed
            />
          </div>
        );
      })}
      {/* Buttons to add more cards and submit the cards list */}
      <button onClick={handleAddCard}>Add More Cards</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

// Exporting the Cards component as the default export
export default Cards;
