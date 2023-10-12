import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateDeck.css';

const CreateDeck = ({ user, handleAccount }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        subject: '',
        public: true,
    });
    
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const completeFormData = { ...formData, user_id: user.id };
        // Make an API call here to create a new deck
        const response = await fetch('/create_deck', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(completeFormData),
        });
        
        if (response.ok) {
            const deck = await response.json();
            handleAccount(user);
            navigate("/cards");
            console.log("New deck:", deck);
        } else if (response.status === 422) {
            setMessage("Deck not created");
        }
    };

    return (
        <div className="container">
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
                <button type="submit">Create Deck</button>
            </form>
        </div>
    );
}

export default CreateDeck;


