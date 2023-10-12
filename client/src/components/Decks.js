import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

function Decks({ user }) {  // Accepting 'user' as a prop
  const [decks, setDecks] = useState([]);

  // Fetch decks from the server
  useEffect(() => {
    fetch('/decks', {  
      credentials: 'include',  // To handle sessions
    })
    .then((r) => {
      if (!r.ok) {
        throw new Error('Failed to fetch decks');
      }
      return r.json();
    })
    .then(setDecks)
    .catch((error) => {
      console.error('Fetch error:', error);
    });
}, []);

  return (
    <Wrapper>
      {decks.length > 0 ? (
        decks.map((deck) => (
          <Deck key={deck.id}>
            <h2>{deck.title}</h2>
            <p>
              <em>Subject: {deck.subject}</em>
              &nbsp;·&nbsp;
              <cite>By {deck.user.username}</cite>
            </p>
            <ReactMarkdown>{deck.description}</ReactMarkdown>
          </Deck>
        ))
      ) : (
        <NoDecks>
          <h2>No Decks Found</h2>
          {user && <Link to="/new">Create a New Deck</Link>}
        </NoDecks>
      )}
    </Wrapper>
  );
}


const Wrapper = styled.div`
  /* Your styles for Wrapper here */
`;

const Deck = styled.div`
  /* Your styles for Deck here */
`;

const NoDecks = styled.div`
  /* Your styles for NoDecks here */
`;

export default Decks;