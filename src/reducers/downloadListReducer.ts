import {
  AnyAction, createSlice, PayloadAction, ThunkAction,
} from '@reduxjs/toolkit';
import { RootState } from '../store';
import { DownloadAudioItem, DownloadState } from '../types/IAudioItem';

const initialState: DownloadAudioItem[] = [];

const downloadListSlice = createSlice({
  name: 'downloadList',
  initialState,
  reducers: {
    initialize(state, action) {
      return action.payload;
    },
    addDownloadAudio(state, action: PayloadAction<DownloadAudioItem>) {
      const audio = action.payload;
      state.push(audio);
    },
    removeDownloadAudio(state, action) {
      const id = action.payload;
      return state.filter((item) => item.id !== id);
    },
    changeStateAudio(state, action: PayloadAction<DownloadAudioItem>) {
      const { id, downloadState, percentage } = action.payload;
      const audio = state.find((audioItem) => audioItem.id === id);
      if (audio) {
        audio.downloadState = downloadState;
        audio.percentage = percentage;
      }
    }
  },
});

const {
  initialize, addDownloadAudio, changeStateAudio, removeDownloadAudio,
} = downloadListSlice.actions;

export default downloadListSlice.reducer;

export const initializeDownloadListAction = (
    audioList: DownloadAudioItem[],
): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  dispatch(initialize(audioList));
};

export const addDownloadAudioAction = (
    audio: DownloadAudioItem,
): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  dispatch(addDownloadAudio(audio));
};

export const removeDownloadAudioAction = (
    id: number,
): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  dispatch(removeDownloadAudio(id));
};

export const changeStateAudioAction = (
    id: number,
    downloadState: DownloadState,
    percentage = 100,
): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
  dispatch(changeStateAudio({ id, downloadState, percentage }));
};


export const selectDownloadedItem = (
    id: number | undefined,
) => (state: RootState): DownloadState => {
  if (id) {
    const audio = state.downloadList.find((audioItem) => audioItem.id === id);
    if (audio) return audio.downloadState;
  }
  return 'notDownloaded';
};

export const selectDownloadedItemPercentage = (
    id: number | undefined,
) => (state: RootState): number => {
    if (id) {
        const audio = state.downloadList.find((audioItem) => audioItem.id === id);
        if (audio) return audio.percentage;
    }
    return 0;
}

export const selectDownloadedItemList = () => (state: RootState): DownloadAudioItem[] => {
  return state.downloadList
};