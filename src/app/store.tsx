import {configureStore} from "@reduxjs/toolkit"
import userReducer from "../features/users/userSlice"
import movieReducer from "../features/movies/movieSlice"

export const store=configureStore({
    reducer:{
        user:userReducer,
        movie:movieReducer
    }
})

