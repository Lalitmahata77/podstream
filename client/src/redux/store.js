import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "./api/apiSlice";
import authReducer from "./features/auth/authSlice"
import { setupListeners } from "@reduxjs/toolkit/query";
import favoritesReducer from "../redux/features/favorites/favoriteSlice"
const store = configureStore({
    reducer : {
        [apiSlice.reducerPath] : apiSlice.reducer,
        auth : authReducer,
        favorites: favoritesReducer,
    },
    middleware : (getDefaultMiddleware)=>getDefaultMiddleware().concat(apiSlice.middleware),
    devTools : true
})

setupListeners(store.dispatch)
export default store