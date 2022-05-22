import {useEffect, useState} from "react";
import {db} from "../db";
import AudioList from "../components/AudioList";
import usePlayer from "../hooks/usePlayer";
import React from "react";


const DownloadedAudios = () => {
    const [downloads, setDownloads] = useState<AudioItem[]>([])

    useEffect(() => {
        db.audios.toArray().then(
            items => setDownloads(items.map(item =>
            ({
                id: item.id,
                title: item.title,
                length: item.length,
                icon_url: item.icon_url,
                date: 'arreglar',
                img_url: 'arreglar',
            })))
        )
    }, [])

    return (
        <AudioList
            items={downloads}
            title={'Descargas'}
            page={1}
            expanded={true}
        />
    )
}

export default DownloadedAudios