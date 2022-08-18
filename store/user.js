import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name : "user",
    initialState : { user : {
        _id : '1',
        username : 'TOTO',
    } },
    
    reducers : {

        
        setUser(state, action){
            state.user = action.payload;
        }
        
        
    }
})

export const userActions = userSlice.actions;
export default userSlice.reducer;