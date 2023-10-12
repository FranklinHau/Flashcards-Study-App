import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './css/Cards.css';

const Cards = () => { 
  const [cards, setCards] = useState([
    { question: '', answer: '', hint: '' }
  ]);

  // useHistory hook to programmatically navigate the user to UserProfile after submitting cards
  const history = useHistory();

  const handleAddCard = () => {
    setCards([...cards, { question: '', answer: '', hint: '' }]);
  };

  // Function to handle changes in card fields (question, answer, hint)
  const handleChange = (e, index) => {
    const { name, value } = e.target;
    const list = [...cards];
    list[index][name] = value;
    setCards(list);
  };

  // Function to handle the submission of cards
  const handleSubmit = async () => {
    try {
      // Change the URL below to your backend endpoint that will handle the saving of cards
      const response = await fetch('/api/cards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cards),
      });

      if (response.ok) {
        console.log('Cards saved successfully');
        history.push('/userProfile'); // Redirect to UserProfile after successfully saving the cards
      } else {
        console.error('Failed to save cards');
      }
    } catch (error) {
      console.error('An error occurred while saving the cards:', error);
    }
  };

  return (
    <div>
      <h1>Add Cards</h1>
      {/* Mapping through the cards state to create inputs for each card */}
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

