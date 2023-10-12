import { createSlice } from '@reduxjs/toolkit';

const deckSlice = createSlice({
    name: 'deck',
    initialState: {
        currentDeckId: null,
    },
    reducers: {
        setDeckId: (state, action) => {
            state.currentDeckId = action.payload;
        }
    }
});

export const { setDeckId } = deckSlice.actions;
export default deckSlice.reducer;