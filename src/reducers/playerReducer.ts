import {
  AnyAction, createSlice, PayloadAction, ThunkAction,
} from '@reduxjs/toolkit';
import { db } from '../db';
import { RootState } from '../store';
import { PlayerT } from '../types/Player';
import { IAudioItem } from '../types/IAudioItem';
import {IProgram} from "../types/IProgram";

const cdnUrl = 'https://cdn.dl.uy/solmp3/';

export interface PlayerAction {
  item?: IAudioItem,
  play: boolean,
  url: string,
}

const initialState: PlayerT = {
  playing: false,
  playingUrl: '',
  second: 0,
  item: undefined,
};

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setAudio(state, action: PayloadAction<PlayerAction>) {
      const { item, play, url } = action.payload;
      state.playing = play;
      state.playingUrl = url;
      state.second = 0;
      if (item) {
        state.item = item;
      }
      return state;
    },
    resume(state) {
      return { ...state, playing: true };
    },
    pause(state) {
      return { ...state, playing: false };
    },
    stop() {
      return initialState;
    },
    update(state, action) {
      state.second = action.payload;
      return state;
    },
    initialize(state, action: PayloadAction<audioPlayingLocalStorage>) {
      const player = action.payload
      return {
        playing: player.playing,
        playingUrl: player.url,
        second: player.second,
        item: player.item,
      }
    },
  },
});

const {
  setAudio, stop, resume, pause, update, initialize,
} = playerSlice.actions;

export default playerSlice.reducer;

interface audioPlayingLocalStorage {
  second: number,
  type: 'url' | 'downloaded',
  url: string,
  playing: boolean,
  item: IAudioItem,
}

export const setAudioAction = (
    item: IAudioItem,
    play: boolean,
): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  const { id } = item;
  let url = `${cdnUrl}${id}.mp3`;
  const audioBlob = await db.audios.get(id);
  if (audioBlob) url = URL.createObjectURL(audioBlob.blob);

  dispatch(setAudio({ url, play, item }));

  const audioPlaying: audioPlayingLocalStorage = {
    item,
    type: 'url',
    url,
    second: 0,
    playing: play,
  };
  localStorage.setItem('audioPlaying', JSON.stringify(audioPlaying));
};

export const resumeAction = (): ThunkAction<void, RootState, unknown, AnyAction> => async (
    dispatch,
) => {
  dispatch(resume());
  const audioPlayingString = localStorage.getItem('audioPlaying');
  if (audioPlayingString) {
    let audioPlaying: audioPlayingLocalStorage = JSON.parse(audioPlayingString);
    audioPlaying = {
      ...audioPlaying,
      playing: true,
    };
    localStorage.setItem('audioPlaying', JSON.stringify(audioPlaying));
  }
};

export const pauseAction = (): ThunkAction<void, RootState, unknown, AnyAction> => async (
    dispatch,
) => {
  dispatch(pause());
  const audioPlayingString = localStorage.getItem('audioPlaying');
  if (audioPlayingString) {
    let audioPlaying: audioPlayingLocalStorage = JSON.parse(audioPlayingString);
    audioPlaying = {
      ...audioPlaying,
      playing: false,
    };
    localStorage.setItem('audioPlaying', JSON.stringify(audioPlaying));
  }
};

export const updateAction = (
    second: number,
): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  dispatch(update(second));
  const audioPlayingString = localStorage.getItem('audioPlaying');
  let audioPlaying: audioPlayingLocalStorage;
  if (audioPlayingString) {
    audioPlaying = JSON.parse(audioPlayingString);
    audioPlaying.second = second;
    localStorage.setItem('audioPlaying', JSON.stringify(audioPlaying));
  } else {
    console.log('No item being played in local storage');
  }
};

export const initializeAction = (): ThunkAction<void, RootState, unknown, AnyAction> => async (
    dispatch,
) => {
  const audioPlayingString = localStorage.getItem('audioPlaying');
  if (audioPlayingString) {
    const audioPlaying : audioPlayingLocalStorage = JSON.parse(audioPlayingString);
    dispatch(initialize(audioPlaying));
  }
};

export const selectPlayer = (state: RootState) => state.player;
