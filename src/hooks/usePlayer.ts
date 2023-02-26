import {
  pauseAction, resumeAction, selectPlayer, setAudioAction,
} from '../reducers/playerReducer';
import { db } from '../db';
import service from '../service/api';
import {
  addDownloadAudioAction,
  changeStateAudioAction,
  removeDownloadAudioAction,
} from '../reducers/downloadListReducer';
import {useAppDispatch, useAppSelector} from './redux';
import { Player } from '../types/Player';
import { IAudioItem } from '../types/IAudioItem';

const usePlayer = (): Player => {
  const dispatch = useAppDispatch();
  const player = useAppSelector(selectPlayer);
  return {
    ...player,
    play(item: IAudioItem) {
      dispatch(setAudioAction(item, true));
    },
    resume() {
      dispatch(resumeAction());
    },
    pause() {
      dispatch(pauseAction());
    },
    async download(item: IAudioItem) {
      const { id } = item;
      let audioBlob = await db.audios.get(id);
      if (!audioBlob) {
        dispatch(addDownloadAudioAction({ ...item, downloadState: 'downloading', percentage: 0 }));
        const res = await service.getAudio(id, (percentage) => dispatch(changeStateAudioAction(id, 'downloading', percentage)));
        audioBlob = res.data;
        if (audioBlob) {
          dispatch(changeStateAudioAction(item.id, 'downloaded', 100));
          db.audios.add({
            id,
            blob: audioBlob,
            title: item.title,
            length: item.length,
            date: item.date,
            iconUrl: item.iconUrl,
            imgUrl: item.imgUrl,
            summary: item.summary
          }, id);
        }
      }
    },
    delete(item: IAudioItem) {
      db.audios.where('id').equals(item.id).delete();
      dispatch(removeDownloadAudioAction(item.id));
    },

  };
};

export default usePlayer;
