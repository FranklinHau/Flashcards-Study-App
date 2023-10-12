import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

// UserProfile Functional Component
function UserProfile({ user, handleLogout }) {
  // State hooks for managing decks and selected deck's cards
  const [decks, setDecks] = useState([]);
  const [selectedDeckCards, setSelectedDeckCards] = useState([]);
  const [moodRating, setMoodRating] = useState(1);
  const [confidenceRating, setConfidenceRating] = useState(1);

  // Hook for programmatic navigation
  const history = useHistory();

  // Function to fetch cards of a specific deck
  const fetchDeckCards = async (deckId) => {
    const response = await fetch(`/deckCards/${deckId}`, {
      credentials: 'include',
    });
    if (response.ok) {
      const fetchedCards = await response.json();
      setSelectedDeckCards(fetchedCards);
    }
  };
  // Function to handle changes in the mood rating dropdown
  const handleMoodChange = (event) => {
    setMoodRating(event.target.value);
  };
  // Function to handle changes in the confidence rating dropdown
  const handleConfidenceChange = (event) => {
    setConfidenceRating(event.target.value);
  };


  // Function to navigate to the create deck page
  const goToCreateDeck = () => {
    history.push('/create-deck');
  };

  // Function to handle user logout
  const performLogout = async () => {
    const res = await fetch('/logout', {
      method: 'DELETE',
      credentials: 'include',
    });

    if (res.ok) {
      handleLogout();
      history.push('/login');
    }
  };
  const handleSubmitRatings = async () => {
    try {
      const response = await fetch('/saveSelfReview', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          user_id: user.id, 
          mood_rating: moodRating, 
          confidence_rating: confidenceRating 
      }),
    });
    
      if (response.ok) {
        console.log('Ratings saved successfully');
      } else {
        console.log('Failed to save ratings');
      }
    } catch (error) {
      console.error('An error occurred while saving the ratings:', error);
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const userId = user.id; // Assuming user object contains user id
      const response = await fetch(`/userDecks/${userId}`, {
        credentials: 'include',
      });
      if (response.ok) {
        const fetchedDecks = await response.json();
        setDecks(fetchedDecks);
      }
    };

    fetchData(); // Invoking the fetchData function
  }, [user]); // Dependency array includes user, so fetchData runs when user updates


  // Rendering the UserProfile UI
  return (
    <div>
      <h1>Welcome to Your Account</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        {/* Dropdown for mood rating */}
        <div>
          <label>Mood Rating: </label>
          <select value={moodRating} onChange={handleMoodChange}>
            <option value={1}>1 (Lowest)</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5 (Highest)</option>
          </select>
        </div>
        <div>
          <label>Confidence Rating: </label>
          <select value={confidenceRating} onChange={handleConfidenceChange}>
            <option value={1}>1 (Lowest)</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5 (Highest)</option>
          </select>
        </div>
      </div>
      <button onClick={handleSubmitRatings}>Submit Ratings</button>
      <div>
        <p>Username: {user ? user.username : 'Loading...'}</p>
        <p>Bio: {user ? user.bio : 'Loading...'}</p>
        <h2>Study Decks Created:</h2>
        <ul>
          {decks.map((deck, index) => (
            <li key={index}>
              <span onClick={() => setSelectedDeckCards(deck.cards)} style={{ cursor: 'pointer' }}>
                {deck.title}
              </span>
              <p>{deck.description}</p>
              <p>{deck.subject}</p>
            </li>
          ))}
        </ul>
        <ul>
          {selectedDeckCards.map((card, index) => (
            <li key={index}>{card.question} - {card.answer} - Hint: {card.hint}</li>
          ))}
        </ul>
        <button style={{ marginRight: '10px' }} onClick={performLogout}>Log Out</button>
        <button style={{ marginRight: '10px' }} onClick={goToCreateDeck}>Create a Study Deck</button>
      </div>
    </div>
  );
}


export default UserProfile;

