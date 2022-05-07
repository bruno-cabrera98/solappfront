import { configureStore } from "@reduxjs/toolkit";
import playerReducer from "./reducers/playerReducer";
import downloadListReducer from "./reducers/downloadListReducer";
import programsReducer from "./reducers/programsReducer";

const store = configureStore({
    reducer: {
        player: playerReducer,
        downloadList: downloadListReducer,
        programs: programsReducer
    }
})

export default store