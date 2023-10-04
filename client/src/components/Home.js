import React from 'react';

// sample data representing public decks 
const sampleDecks = [
    {id: 1, title: 'Science Deck', description: 'Your own notes.'},
    {id: 2, title: 'History Deck', description: 'Your own memorizing cards.'}
];

function Home() {
    return (
        <div className='home-container'>
            <h1>Welcome to The Flashcard App!</h1>

            {/* section for login and reqistration */}
            <div className='auth-section'>
                <button onClick={() => alert('Login functionality here')}>Login</button>

                <button onClick={() => alert('Register functionality here')}>Register</button>
            </div>

            {/* Section for displaying example study decks */}
            <h2>Create your own Decks of study Cards</h2>
            <ul>
                {sampleDecks.map((deck) => (
                    <li key={deck.id}>
                        <h3>{deck.title}</h3>
                        <p>{deck.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Home;