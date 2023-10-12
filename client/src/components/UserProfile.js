
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';



function UserProfile({ user, handleLogout }) {
  const [decks, setDecks] = useState([]);
  const [selectedDeckCards, setSelectedDeckCards] = useState([]);

  const navigate = useNavigate();

  const fetchDeckCards = async (deckId) => {
    const response = await fetch(`/deckCards/${deckId}`, {
      credentials: 'include',
    });
    if (response.ok) {
      const fetchedCards = await response.json();
      setSelectedDeckCards(fetchedCards);
    }
  };

  const goToCreateDeck = () => {
    navigate('/create-deck');
  };
  

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

    fetchData();
  }, []);

  // When user clicks on a deck title
  const handleDeckClick = (deckId) => {
    fetchDeckCards(deckId);
  };
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

