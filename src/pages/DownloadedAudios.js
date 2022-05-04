import {useEffect, useState} from "react";
import db from "../db";
import AudioLine from "../components/stateless/AudioLine";
import AudioList from "../components/AudioList";


const DownloadedAudios = () => {
    const [downloads, setDownloads] = useState([])

    useEffect(() => {
        db.audios.toArray().then(
            items => setDownloads(items.map(item =>
            ({
                ...item,
                programa : {
                    icon: item.icon
                },

            })))
        )
    }, [])

    const handleDeleteAudio = (id) => {
        db.audios.where('id').equals(id).delete()
        setDownloads(downloads.filter(audio => audio.id !== id))
        console.log(id)
    }

    return (
        <AudioList
            items={downloads}
            title={'Descargas'}
            page={false}
            expanded={true}
        />
    )
}

export default DownloadedAudios