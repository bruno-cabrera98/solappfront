import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./reducers/playerReducer";
import audioListReducer from "./reducers/audioListReducer";
import programsReducer from "./reducers/programsReducer";

const store = configureStore({
    reducer: {
        player: playerReducer,
        audioList: audioListReducer,
        programs: programsReducer
    }
})

export default store