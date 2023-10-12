// Importing necessary functions and slices from Redux and other files
import { configureStore } from '@reduxjs/toolkit'; // Function to configure the Redux store
import deckReducer from './deckSlice'; // Reducer function for the 'deck' slice of the state

// Configuring and creating the Redux store
const store = configureStore({
    reducer: {
        deck: deckReducer // Assigning the deckReducer to manage the 'deck' slice of the state
    }
});


export default store;
