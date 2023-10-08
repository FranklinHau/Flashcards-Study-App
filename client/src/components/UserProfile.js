import React, { useState, useEffect } from 'react';
import axios from 'axios';



function UserProfile() {
    const [user, setUser] = useState({});
    const [decks, setDecks] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    //to debug the value of decks
    console.log(decks);

    // using useEffect to run code when the component mounts 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:5555/users/me', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
                    }

                });
                
                //log the entire response from server 
                console.log("Server Response:", response.data);
                if (response.data.user && response.data.decks) {
                
                    //setting state with received data 
                    setUser(response.data.user);
                    setDecks(response.data.decks);
                    
                } else{
                    setUser(response.data) // If the server does not return user and decks keys, then directly set user
                }
                setIsLoading(false);
            } catch (error) {
                console.error(error);
                setError('An error occurred while fetching data.');
                setIsLoading(false)

            }
        };

        fetchData();
    }, []);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className='user-profile-container'>
            {/* Debug log to check what's in the user object */}
            {console.log(user)}
            <h1>{user && user.username ? user.username + "'s Profile" : "Profile"}</h1>
            <p>Email: {user ? user.email : 'N/A'}</p>
            <p>Bio: {user ? user.bio : 'N/A'}</p>

            <h2>Your Decks</h2>
            <ul>
                {
                    //conditional rendering logic
                    decks && decks.length > 0 ?
                        decks.map((deck) => (
                            <li key={deck.id}>
                                <div>Title: {deck.title}</div>
                                <div>Description: {deck.description}</div>
                            </li>
                        ))
                        :
                        <li>No decks available</li>
                }
            </ul>
        </div>
    );
}

export default UserProfile;