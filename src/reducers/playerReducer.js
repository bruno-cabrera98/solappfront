import {createSlice} from "@reduxjs/toolkit";
import db from '../db'

const url = 'http://localhost:3001/audio/'
const cdnUrl = 'http://cdn.dl.uy/solmp3/'

const initialState = {
    playing: false,
    playingUrl: ''
}

const playerSlice = createSlice({
    name: 'player',
    initialState: initialState,
    reducers: {
        setAudio(state, action) {
            state.playing = false
            state.playingUrl = action.payload
            state.second = 0
            return state
        },
        resume(state) {
            return {...state, playing: true}
        },
        pause(state) {
            return {...state, playing: false}
        },
        stop() {
            return initialState
        },
        update(state, action) {
            state.second = action.payload
            return state
        },
        initialize(state, action) {
            return action.payload
        }
    }
})

export const { setAudio, stop, resume, pause, update, initialize } = playerSlice.actions

export default playerSlice.reducer

export const setAudioAction = (id) => {
    return async (dispatch, getState) => {
        let url = `${cdnUrl}${id}.mp3`
        const audioBlob = await db.audios.get(id)
        console.log(audioBlob)
        if (audioBlob)
            url = URL.createObjectURL(audioBlob.blob)
        dispatch(setAudio(url))
        let audioPlaying = JSON.parse(localStorage.getItem('audioPlaying'))
        audioPlaying = {
            ...audioPlaying,
            type: 'url',
            url: url,
            second: 0,
            playing: false,
        }
        localStorage.setItem('audioPlaying', JSON.stringify(audioPlaying))
    }
}

export const resumeAction = () => {
    return async (dispatch) => {
        dispatch(resume())
        let audioPlaying = JSON.parse(localStorage.getItem('audioPlaying'))
        audioPlaying = {
            ...audioPlaying,
            playing: true
        }
        localStorage.setItem('audioPlaying', JSON.stringify(audioPlaying))
    }
}

export const pauseAction = () => {
    return async (dispatch) => {
        dispatch(pause())
        let audioPlaying = JSON.parse(localStorage.getItem('audioPlaying'))
        audioPlaying = {
            ...audioPlaying,
            playing: false
        }
        localStorage.setItem('audioPlaying', JSON.stringify(audioPlaying))
    }
}

export const updateAction = (second) => {
    return async (dispatch) => {
        dispatch(update(second))
        let audioPlaying = JSON.parse(localStorage.getItem('audioPlaying'))
        audioPlaying = {
            ...audioPlaying,
            second: second,
        }
        localStorage.setItem('audioPlaying', JSON.stringify(audioPlaying))
    }
}

export const initializeAction = () => {
    return async (dispatch) => {
        let audioPlaying = JSON.parse(localStorage.getItem('audioPlaying'))
        if (audioPlaying) {
            dispatch(initialize({
                playingUrl: audioPlaying.url,
                second: audioPlaying.second,
            }))
        }
    }
}

