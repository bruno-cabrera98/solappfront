import {useDispatch, useSelector} from "react-redux";
import {pauseAction, resumeAction, setAudioAction} from "../reducers/playerReducer";
import db from "../db";
import service from "../service/api";
import {
    addDownloadAudioAction,
    changeStateAudioAction,
    removeDownloadAudioAction
} from "../reducers/downloadListReducer";

const usePlayer = () => {
    const dispatch = useDispatch()
    const player = useSelector(state => state.player)
    return {
        ...player,
        play(item) {
            dispatch(setAudioAction(item.id, item.titulo, true))
        },
        resume() {
            dispatch(resumeAction())
        },
        pause() {
            dispatch(pauseAction())
        },
        async download(item) {
            const {id} = item
            let audioBlob = await db.audios.get(id)
            if (!audioBlob) {
                dispatch(addDownloadAudioAction({...item, state: 'downloading'}))
                const res = await service.getAudio(id)
                audioBlob = res.data
                dispatch(changeStateAudioAction(item.id, 'downloaded'))
                db.audios.add({id:id, blob:audioBlob, titulo:item.titulo, duracion:item.duracion, icon:item.programa.icon}, [id])
            }
        },
        delete(item) {
            db.audios.where('id').equals(item.id).delete()
            dispatch(removeDownloadAudioAction(item.id))
        }

    }
}

export default usePlayer;