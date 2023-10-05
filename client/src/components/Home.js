import axios from 'axios';
import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';


// sample data representing public decks 
const sampleDecks = [
    {id: 1, title: 'Science Deck', description: 'Your own notes.'},
    {id: 2, title: 'History Deck', description: 'Your own memorizing cards.'}
];

function Home() {
    // defining history for navigation
    const history = useHistory();

    // State to hold login form data
    const [loginData, setLoginData] = useState({ email: '', password: ''});

    // Function to handle login form submission 
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:5555/login`, loginData);
            console.log('Response:', response);
            if (response.status === 200) {
                localStorage.setItem('access_token', response.data.access_token); // store JWT token 
                history.push('/profile'); // Navigate to UserProfile component 
            } else {
                alert('Invalid credentials');
            }
        } catch (error) {
            alert('An error occurred during login');
            console.error(error);
        }

    };
    // function to navigate to registration page 
    const navigateToRegister = () => {
        history.push('/register');
    }; 



    return (
        <div className='home-container'>
            <h1>Welcome to The Flashcard App!</h1>

            {/* section for login and reqistration */}
            <div className='auth-section'>
                <form onSubmit={handleLogin}>
                    <input
                        type='email'
                        placeholder='Email'
                        value={loginData.email}
                        onChange={(e) => setLoginData({...loginData, email: e.target.value})} />
                
                    <input 
                        type='password'
                        placeholder='Password'
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
                    <button type='submit'>Login</button>
                </form>
                <button onClick={navigateToRegister}>Register</button>
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