import {AnyAction, createSlice, PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

const initialState : any[] = []

const downloadListSlice = createSlice({
    name: 'downloadList',
    initialState: initialState,
    reducers: {
        initialize(state, action) {
            return action.payload
        },
        addDownloadAudio(state, action : PayloadAction<any>) {
            const audio : any = action.payload
            state.push(audio)
        },
        removeDownloadAudio(state, action) {
            const id = action.payload
            return state.filter(item => item.id !== id)
        },
        changeStateAudio(state, action) {
            const {id, audioState} = action.payload
            console.log({id, audioState})
            state.find(audio => audio.id === id).state = audioState
        }
    }
})

const { initialize, addDownloadAudio, changeStateAudio, removeDownloadAudio } = downloadListSlice.actions

export default downloadListSlice.reducer

export const initializeDownloadListAction = (audioList : any) : ThunkAction<void, RootState, unknown, AnyAction>  => {
    return async (dispatch) => {
        dispatch(initialize(audioList))
    }
}

export const addDownloadAudioAction = (audio : any) : ThunkAction<void, RootState, unknown, AnyAction>  => {
    return async (dispatch) => {
        dispatch(addDownloadAudio(audio))
    }
}

export const removeDownloadAudioAction = (id : number) : ThunkAction<void, RootState, unknown, AnyAction>  => {
    return async (dispatch) => {
        dispatch(removeDownloadAudio(id))
    }
}

export const changeStateAudioAction = (id : number, audioState : any) : ThunkAction<void, RootState, unknown, AnyAction>  => {
    return async (dispatch) => {
        dispatch(changeStateAudio({id, audioState}))
    }
}