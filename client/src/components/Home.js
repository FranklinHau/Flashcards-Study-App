import React from 'react';

// sample data representing public decks 
const sampleDecks = [
    {id: 1, title: 'Science Deck', description: 'Your own notes.'},
    {id: 2, title: 'History Deck', description: 'Your own memorizing cards.'}
];

function Home() {
    // State to hold login form data
    const [loginData, setLoginData] = useState({ email: '', password: ''});

    // Function to handle login form submission 
    const handleLogin = (e) => {
        e.preventDefault();
        // call the login API with loginData
        alert(`Logging in with email: ${loginData.email}`);
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
                        onChange={(e) = setLoginData({...loginData, email: e.target.value})} />
                
                    <input 
                        type='password'
                        placeholder='Password'
                        value={loginData.password}
                        onChange={(e) => setLoginData({...loginData, password: e.target.value})} />
                    <button type='submit'>Login</button>
                </form>
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