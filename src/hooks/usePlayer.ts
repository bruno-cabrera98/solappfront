import {useDispatch, useSelector} from "react-redux";
import {pauseAction, playerStateT, resumeAction, selectPlayer, setAudioAction} from "../reducers/playerReducer";
import {db, IAudio} from "../db"
import service from "../service/api"
import {
    addDownloadAudioAction,
    changeStateAudioAction,
    removeDownloadAudioAction
} from "../reducers/downloadListReducer";
import {useAppSelector} from "./redux";

const usePlayer = () => {
    const dispatch = useDispatch()
    const player = useAppSelector(selectPlayer)
    return {
        ...player,
        play(item : AudioItem) {
            dispatch(setAudioAction(item, true))
        },
        resume() {
            dispatch(resumeAction())
        },
        pause() {
            dispatch(pauseAction())
        },
        async download(item : AudioItem) {
            const {id} = item
            let audioBlob = await db.audios.get(id)
            if (!audioBlob) {
                dispatch(addDownloadAudioAction({...item, state: 'downloading'}))
                const res = await service.getAudio(id)
                audioBlob = res.data
                if (audioBlob) {
                    dispatch(changeStateAudioAction(item.id, 'downloaded'))
                    db.audios.add({
                        id:id,
                        blob:audioBlob,
                        title: item.title,
                        length: item.length,
                        icon_url: item.icon_url
                    }, id)
                }
            }
        },
        delete(item : AudioItem) {
            db.audios.where('id').equals(item.id).delete()
            dispatch(removeDownloadAudioAction(item.id))
        }

    }
}

export default usePlayer;