import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import config from './config';

function UserProfile() {
  const userRef = useRef({});
  const decksRef = useRef([]);
  const isLoadingRef = useRef(true);
  const errorRef = useRef(null);

  // Debug log to check the value of decks
  console.log(decksRef.current);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.apiBaseURL}/users/me`);

        // Log the entire response from the server
        console.log("Server Response:", response.data);
        if (response.data.user && response.data.decks) {
          // Update refs with received data
          userRef.current = response.data.user;
          decksRef.current = response.data.decks;
        } else {
          // If the server does not return user and decks keys, then directly set user ref
          userRef.current = response.data;
        }

        // Update isLoading ref and trigger a re-render
        isLoadingRef.current = false;
      } catch (error) {
        console.error(error);
        // Update error ref and trigger a re-render
        errorRef.current = 'An error occurred while fetching data.';
        isLoadingRef.current = false;
      }
    };

    fetchData();
  }, []);

  if (isLoadingRef.current) {
    return <div>Loading...</div>;
  }

  if (errorRef.current) {
    return <div>{errorRef.current}</div>;
  }

  const user = userRef.current;
  const decks = decksRef.current;

  return (
    <div className='user-profile-container'>
      {/* Debug log to check what's in the user object */}
      {console.log(user)}
      <h1>{user && user.username ? user.username + "'s Profile" : "Profile"}</h1>
      <p>Email: {user ? user.email : 'N/A'}</p>
      <p>Bio: {user ? user.bio : 'N/A'}</p>

      <h2>Your Decks</h2>
      <ul>
        {decks && decks.length > 0 ? (
          decks.map((deck) => (
            <li key={deck.id}>
              <div>Title: {deck.title}</div>
              <div>Description: {deck.description}</div>
            </li>
          ))
        ) : (
          <li>No decks available</li>
        )}
      </ul>
    </div>
  );
}

export default UserProfile;
