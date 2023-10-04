import React, { useState, useEffect } from 'react';

function UserProfile() {
    // Initialize state for user and decks 
    const [user, setUser] = useState({});
    const [decks, setDecks] = useState([]);

    return (
        <div className='user-profile-container'>
            <h1>{user.username}'s Profile</h1>
            <p>Email: {user.email}</p>
            <p>Bio: {user.bio}</p>

            <h2>Your Decks</h2>
            <ul>
                {decks.map((deck) => (
                    <li key={deck.id}>
                        <div>Title: {deck.title}</div>
                        <div>Description: {deck.description}</div>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default UserProfile