// Importing necessary libraries and hooks
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './css/CreateDeck.css';  // Importing styles

// CreateDeck Component
const CreateDeck = ({ user, handleAccount }) => {
    // State to manage form data
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        subject: '',
        public: true,
        user_id: null,
    });

    // State to manage messages for user feedback
    const [message, setMessage] = useState(null);

    // Hook to programmatically navigate
    const history = useHistory();

    // Function to handle form input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Completing form data with user_id
        const completeFormData = { ...formData, user_id: user.id };

        // Making an API call to create a new deck
        const response = await fetch('/create_deck', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(completeFormData),
        });

        // Handling the response from the API
        if (response.ok) {
            const deck = await response.json();
            handleAccount(user);
            history.push("/cards");
            console.log("New deck:", deck);
        } else if (response.status === 422) {
            setMessage("Deck not created");  // Setting message on failure
        }
    };

    // Rendering the UI of the CreateDeck component
    return (
        <div className="container">
            {/* Form for deck creation */}
            <form onSubmit={handleSubmit} className="form">
                <label>
                    Title:
                    <input type="text" name="title" value={formData.title} onChange={handleChange} required />
                </label>
                <label>
                    Description:
                    <textarea name="description" value={formData.description} onChange={handleChange}></textarea>
                </label>
                <label>
                    Subject:
                    <input type="text" name="subject" value={formData.subject} onChange={handleChange} />
                </label>
                <label>
                    Public:
                    <input type="checkbox" name="public" checked={formData.public} onChange={(e) => setFormData({ ...formData, public: e.target.checked })} />
                </label>
                <button type="submit">Create Deck</button>  {/* Submit button */}
            </form>
        </div>
    );
}


export default CreateDeck;


