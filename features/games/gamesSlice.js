import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { baseUrl } from '../../shared/baseUrl';

export const fetchGames = createAsyncThunk(
    'games/fetchGames',
    async () => {
        const response = await fetch(baseUrl + 'games');
        console.log('fetch complete ' + response);
        if (!response.ok) {
            return Promise.reject(
                'Could not load games, status code: ' + response.status
            );
        }
        const data = await response.json();
        console.log('Shit complete: ' + data);
        return data;
    }
);

const gamesSlice = createSlice({
    name: 'games',
    initialState: { isLoading: true, errMess: null, gamesArray: [] },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchGames.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchGames.fulfilled, (state, action) => {
                state.isLoading = false;
                state.errMess = null;
                state.campsitesArray = action.payload;
            })
            .addCase(fetchGames.rejected, (state, action) => {
                state.isLoading = false;
                state.errMess = action.error
                    ? action.error.message
                    : 'Fetch failed';
            });
    }
});

export const gamesReducer = gamesSlice.reducer;