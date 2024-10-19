// manage everything related to users
import { createSlice } from '@reduxjs/toolkit';
import { fetchUsers } from '../thunks/fetchUsers';
import { addUser } from '../thunks/addUser';
import { removeUser } from '../thunks/removeUser';

const usersSlice = createSlice({
    name: 'users',
    initialState: {
        data: [], // list of users
        isLoading: false,
        error: null,
    },
    extraReducers(builder) {
        // allow us to watch for additional action 
        // types that are not inherently tied to the slice
        builder.addCase(fetchUsers.pending, (state, action) => {
            // update state object however appropriate
            // to show user we are loading data
            state.isLoading = true;
        });
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            // show user we have completed request
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchUsers.rejected, (state, action) => {
            // show user we have failed
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(addUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(addUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data.push(action.payload);
        });
        builder.addCase(addUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });

        builder.addCase(removeUser.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(removeUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = state.data.filter(user => {
                return user.id !== action.payload.id;
            });
        });
        builder.addCase(removeUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error;
        });
    }
});

export const usersReducer = usersSlice.reducer;