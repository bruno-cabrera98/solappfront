import {AnyAction, createSlice, PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import {db} from '../db'
import {AppDispatch, RootState} from "../store";

const url = 'http://localhost:3001/audio/'
const cdnUrl = 'https://cdn.dl.uy/solmp3/'

export interface playerStateT {
    playing : boolean,
    playingUrl: string,
    second: number,
    audioTitle: string,
    img_url: string,
}

export interface PlayerAction {
    item?: AudioItem,
    play: boolean,
    url: string,
}

const initialState : playerStateT = {
    playing: false,
    playingUrl: '',
    second: 0,
    audioTitle: '',
    img_url: '',
}

const playerSlice = createSlice({
    name: 'player',
    initialState: initialState,
    reducers: {
        setAudio(state, action : PayloadAction<PlayerAction>) {
            const {item, play, url} = action.payload
            state.playing = play
            state.playingUrl = url
            state.second = 0
            if (item) {
                state.audioTitle = item.title
                state.img_url = item.img_url
            }
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

interface audioPlayingLocalStorage {
    second: number,
    type: 'url',
    url: string,
    playing: boolean,
    img_url: string
}

export const setAudioAction = (item : AudioItem, play : boolean): ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch) => {
        const {id, img_url} = item
        let url = `${cdnUrl}${id}.mp3`
        const audioBlob = await db.audios.get(id)
        if (audioBlob)
            url = URL.createObjectURL(audioBlob.blob)

        dispatch(setAudio({url, play, item}))

        const audioPlaying : audioPlayingLocalStorage = {
            type: 'url',
            url,
            second: 0,
            playing: play,
            img_url
        }
        localStorage.setItem('audioPlaying', JSON.stringify(audioPlaying))
    }


export const resumeAction = () : ThunkAction<void, RootState, unknown, AnyAction>  =>
    async (dispatch) => {
        dispatch(resume())
        const audioPlayingString = localStorage.getItem('audioPlaying')
        if (audioPlayingString) {
            let audioPlaying : audioPlayingLocalStorage = JSON.parse(audioPlayingString)
            audioPlaying = {
                ...audioPlaying,
                playing: true
            }
            localStorage.setItem('audioPlaying', JSON.stringify(audioPlaying))
        }
    }

export const pauseAction = () : ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch) => {
        dispatch(pause())
        const audioPlayingString = localStorage.getItem('audioPlaying')
        if (audioPlayingString) {
            let audioPlaying : audioPlayingLocalStorage = JSON.parse(audioPlayingString)
            audioPlaying = {
                ...audioPlaying,
                playing: false
            }
            localStorage.setItem('audioPlaying', JSON.stringify(audioPlaying))
        }
    }


export const updateAction = (second : number) : ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch) => {
        dispatch(update(second))
        const audioPlayingString = localStorage.getItem('audioPlaying')
        let audioPlaying : audioPlayingLocalStorage
        if (audioPlayingString) {
            audioPlaying = JSON.parse(audioPlayingString)
            audioPlaying.second = second
            localStorage.setItem('audioPlaying', JSON.stringify(audioPlaying))
        } else {
            console.log('No item being played in local storage')
        }
    }


export const initializeAction = () : ThunkAction<void, RootState, unknown, AnyAction> =>
    async (dispatch) => {
        const audioPlayingString = localStorage.getItem('audioPlaying')
        if (audioPlayingString) {
            const audioPlaying = JSON.parse(audioPlayingString)
            dispatch(initialize({
                playingUrl: audioPlaying.url,
                second: audioPlaying.second,
            }))
        }
    }


export const selectPlayer = (state: RootState) => state.player

