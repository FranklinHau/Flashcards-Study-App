// Importing necessary libraries, hooks, and components
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';


// Decks Component that displays a list of decks
function Decks({ user }) {  // Accepting 'user' as a prop
  // State to manage and store decks
  const [decks, setDecks] = useState([]);

  // Effect hook to fetch decks from the server
  useEffect(() => {
    fetch('/decks', {  
      credentials: 'include',  // To handle sessions
    })
    .then((r) => {
      if (!r.ok) {
        throw new Error('Failed to fetch decks');  // Error handling for fetch
      }
      return r.json();
    })
    .then(setDecks)  // Setting fetched decks to state
    .catch((error) => {
      console.error('Fetch error:', error);  // Logging errors
    });
}, []);  // Empty dependency array means this effect runs once on component mount

  // Rendering the UI of the Decks component
  return (
    <div className="deck-wrapper">
            {decks.length > 0 ? (
                decks.map((deck) => ( 
                    <div key={deck.id} className="deck">
                        <h2>{deck.title}</h2>
                        <p>
                            <em>Subject: {deck.subject}</em>
                            &nbsp;·&nbsp;
                            <cite>By {deck.user.username}</cite>
                        </p>
                        <ReactMarkdown>{deck.description}</ReactMarkdown>
                    </div>
                ))
            ) : (
                <div className="no-decks">
                    <h2>No Decks Found</h2>
                    {user && <Link to="/new">Create a New Deck</Link>}
                </div>
            )}
        </div>
    );
}

export default Decks;
