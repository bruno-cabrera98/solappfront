import {useDispatch} from "react-redux";
import {setAudioAction} from "../reducers/playerReducer";
import db from "../db";
import service from "../service/api";
import Button from "./stateless/Button";
import {setAudioDownloadedAction, setAudioDownloadingAction} from "../reducers/audioListReducer";
import Spinner from "./stateless/Spinner";

const AudioCard = ({item}) => {
    const dispatch = useDispatch()
    const handlePlay = (event) => {
        event.preventDefault()
        dispatch(setAudioAction(item.id))
    }

    const handleDownload = async (event) => {
        event.preventDefault()
        const {id} = item
        let audioBlob = await db.audios.get(id)
        if (!audioBlob) {
            dispatch(setAudioDownloadingAction(id, true))
            const res = await service.getAudio(id)
            audioBlob = res.data
            console.log('Audio saved in DB')
            dispatch(setAudioDownloadedAction(id, true))
            dispatch(setAudioDownloadingAction(id, false))
            db.audios.add({id:id, blob:audioBlob}, [id])
        }
    }

    return item && <div>
        <h4>{item.titulo}</h4>
        <Button onClick={handlePlay}>Play</Button>
        <Button onClick={handleDownload}>Download</Button>
        {item.downloading ? <Spinner/> : false}
        {item.downloaded ? <p>Si</p> : <p>No</p>}

    </div>
}

export default AudioCard