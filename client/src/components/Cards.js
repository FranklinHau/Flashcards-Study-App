import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setDeckId } from './deckSlice'

const Cards = () => {
  const dispatch = useDispatch();
  const currentDeckId = useSelector(state => state.deck.currentDeckId);
  const [cards, setCards] = useState([
    { question: '', answer: '', hint: '' }
  ]);
  const navigate = useNavigate();

  const handleDeckSelection = (selectedDeckId) => {
    dispatch(setDeckId(selectedDeckId)); 
  }
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...cards];
    list[index][name] = value;
    setCards(list);
  };

  const handleAddCard = () => {
    setCards([...cards, { question: '', answer: '', hint: '' }]);
  };

  const handleSubmit = async () => {
    console.log('Cards to save:', cards);

    // POST request to save the cards
    try {
      const response = await fetch(`/saveCards/${currentDeckId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cards: cards }),
      });

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

  return (
    <div>
      <h1>Add Cards</h1>
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
      <button onClick={handleAddCard}>Add More Cards</button>
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
    };

export default Cards;

