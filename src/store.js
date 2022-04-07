import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./reducers/playerReducer";
import audioListReducer from "./reducers/audioListReducer";

const store = configureStore({
    reducer: {
        player: playerReducer,
        audioList: audioListReducer
    }
})

export default store