import {useEffect, useState} from "react";
import db from "../db";
import AudioLine from "../components/stateless/AudioLine";


const DownloadedAudios = () => {
    const [downloads, setDownloads] = useState([])

    useEffect(() => {
        db.audios.toArray().then(
            items => setDownloads(items)
        )
    }, [])

    const handleDeleteAudio = (id) => {
        db.audios.where('id').equals(id).delete()
        setDownloads(downloads.filter(audio => audio.id !== id))
        console.log(id)
    }

    return (
        <div>
            {downloads && downloads.map(item => <AudioLine key={item.id} item={item} handleDeleteAudio={handleDeleteAudio}/>)}
        </div>
    )
}

export default DownloadedAudios