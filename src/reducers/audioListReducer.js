const {createSlice} = require("@reduxjs/toolkit");

const audioListSlice = createSlice({
    name: 'audioList',
    initialState: [],
    reducers: {
        initialize(state, action) {
            return action.payload
        },
        setAudioDownloaded(state, action) {
            const {id,isDownloaded} = action.payload
            return state.map(
                audio => audio.id === id ? ({...audio, downloaded:isDownloaded}) : audio
            )
        },
        setAudioDownloading(state, action) {
            const {id, isDownloading} = action.payload
            return state.map(
                audio => audio.id === id ? ({...audio, downloading:isDownloading}) : audio
            )
        }
    }
})

const { initialize, setAudioDownloaded, setAudioDownloading } = audioListSlice.actions

export default audioListSlice.reducer

export const initializeAudioListAction = (audioList) => {
    return async (dispatch) => {
        dispatch(initialize(audioList))
    }
}

export const setAudioDownloadedAction = (id, isDownloaded) => {
    return async (dispatch) => {
        dispatch(setAudioDownloaded({id, isDownloaded}))
    }
}

export const setAudioDownloadingAction = (id, isDownloading) => {
    return async (dispatch) => {
        dispatch(setAudioDownloading({id, isDownloading}))
    }
}