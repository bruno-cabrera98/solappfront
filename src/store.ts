import { configureStore } from '@reduxjs/toolkit';
import playerReducer from './reducers/playerReducer';
// @ts-ignore
import downloadListReducer from './reducers/downloadListReducer';
// @ts-ignore
import programsReducer from './reducers/programsReducer';

const store = configureStore({
  reducer: {
    player: playerReducer,
    downloadList: downloadListReducer,
    programs: programsReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export default store;
