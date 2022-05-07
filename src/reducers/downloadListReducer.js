const {createSlice} = require("@reduxjs/toolkit");

const downloadListSlice = createSlice({
    name: 'downloadList',
    initialState: [],
    reducers: {
        initialize(state, action) {
            return action.payload
        },
        addDownloadAudio(state, action) {
            const audio = action.payload
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

export const initializeDownloadListAction = (audioList) => {
    return async (dispatch) => {
        dispatch(initialize(audioList))
    }
}

export const addDownloadAudioAction = (audio) => {
    return async (dispatch) => {
        dispatch(addDownloadAudio(audio))
    }
}

export const removeDownloadAudioAction = (id) => {
    return async (dispatch) => {
        dispatch(removeDownloadAudio(id))
    }
}

export const changeStateAudioAction = (id, audioState) => {
    return async (dispatch) => {
        dispatch(changeStateAudio({id, audioState}))
    }
}