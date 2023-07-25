import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import membersReducer  from "../features/Members/membersSlice";

export const store = configureStore({
    reducer:{
        auth:authReducer ,
        members:membersReducer
    }
})
