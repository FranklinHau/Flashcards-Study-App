// Importing the createSlice function from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit';

// Creating a slice of the Redux store named 'deck'
const deckSlice = createSlice({
    name: 'deck',  // Name of the slice
    initialState: {  // Initial state of this slice
        currentDeckId: null,  // Initially, no deck is selected
    },
    reducers: {  // Reducers are functions that determine changes to the state
        // setDeckId is a reducer that sets the currentDeckId in the state
        setDeckId: (state, action) => {
            state.currentDeckId = action.payload;  // Setting the currentDeckId with the provided action payload
        }
    }
});

// Exporting the actions generated by createSlice
export const { setDeckId } = deckSlice.actions;

// Exporting the reducer function as the default export
// The reducer will be used to handle actions in the Redux store
export default deckSlice.reducer;
