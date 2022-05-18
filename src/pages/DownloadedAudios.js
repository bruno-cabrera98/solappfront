import {useEffect, useState} from "react";
import {db} from "../db";
import AudioList from "../components/AudioList";
import usePlayer from "../hooks/usePlayer";


const DownloadedAudios = () => {
    const [downloads, setDownloads] = useState([])

    const player = usePlayer()

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

    const handleDeleteAudio = (item) => {
        player.delete(item)
        setDownloads(downloads.filter(audio => audio.id !== item.id))
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