import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

// UserProfile Functional Component
function UserProfile({ user, handleLogout }) {
  // State hooks for managing decks and selected deck's cards
  const [decks, setDecks] = useState([]);
  const [selectedDeckCards, setSelectedDeckCards] = useState([]);
  
  // Hook for programmatic navigation
  const navigate = useNavigate();

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

  // Function to navigate to the create deck page
  const goToCreateDeck = () => {
    navigate('/create-deck');
  };

  // Function to handle user logout
  const performLogout = async () => {
    const res = await fetch('/logout', {
      method: 'DELETE',
      credentials: 'include',
    });

    if (res.ok) {
      handleLogout();
      navigate('/login');
    }
  };

  // useEffect hook to fetch user decks when the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/userDecks', {
        credentials: 'include',
      });
      if (response.ok) {
        const fetchedDecks = await response.json();
        setDecks(fetchedDecks);
      }
    };

    fetchData(); // Invoking the fetchData function
  }, []);

  // Function to handle when a deck title is clicked
  const handleDeckClick = (deckId) => {
    fetchDeckCards(deckId);
  };

  // Rendering the UserProfile UI
  return (
    <div>
      <h1>Welcome to Your Account</h1>
      <p>Username: {user ? user.username : 'Loading...'}</p>
      <p>Bio: {user ? user.bio : 'Loading...'}</p>
      <h2>Study Decks Created:</h2>
      <ul>
        {decks.map((deck, index) => (
          <li key={index}>
          <span onClick={() => fetchDeckCards(deck.id)} style={{ cursor: 'pointer' }}>
              {deck.title}
            </span>
          </li>
        ))}
      </ul>
      <ul>
        {selectedDeckCards.map((card, index) => (
          <li key={index}>{card.question} - {card.answer}</li>
        ))}
      </ul>
      <button style={{ marginRight: '10px' }} onClick={performLogout}>Log Out</button>
      <button style={{ marginRight: '10px' }} onClick={goToCreateDeck}>Create a Study Deck</button>
    </div>
  );
}

export default UserProfile;

