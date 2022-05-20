import {AnyAction, createSlice, PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {useSelector} from "react-redux";

const initialState : DownloadAudioItem[] = []

const downloadListSlice = createSlice({
    name: 'downloadList',
    initialState: initialState,
    reducers: {
        initialize(state, action) {
            return action.payload
        },
        addDownloadAudio(state, action : PayloadAction<DownloadAudioItem>) {
            const audio : any = action.payload
            state.push(audio)
        },
        removeDownloadAudio(state, action) {
            const id = action.payload
            return state.filter(item => item.id !== id)
        },
        changeStateAudio(state, action : PayloadAction<DownloadAudioItem>) {
            const {id, downloadState} = action.payload
            console.log({id, downloadState})
            const audio = state.find(audio => audio.id === id)
            if (audio)
                audio.downloadState = downloadState
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

export const changeStateAudioAction = (id : number, downloadState : DownloadState) : ThunkAction<void, RootState, unknown, AnyAction>  => {
    return async (dispatch) => {
        dispatch(changeStateAudio({id, downloadState}))
    }
}

export const selectDownloadedItem = (id : number | undefined) => (state: RootState) : DownloadState => {
    if (id) {
        const audio = state.downloadList.find(audio => audio.id === id)
        if (audio)
            return audio.downloadState
    }
    return 'notDownloaded'

}