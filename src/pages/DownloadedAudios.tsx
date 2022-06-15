import React, { useEffect, useState } from 'react';
import { db } from '../db';
import AudioList from '../components/AudioList';
import { IAudioItem } from '../types/IAudioItem';
import {useAppSelector} from "../hooks/redux";
import {selectDownloadedItemList} from "../reducers/downloadListReducer";

function DownloadedAudios() {
  const [downloads, setDownloads] = useState<IAudioItem[]>([]);
  const downloadedItems = useAppSelector(selectDownloadedItemList())
  useEffect(() => {
    db.audios.toArray().then(
      (items) => setDownloads(items.map(item => ({
        id: item.id,
        title: item.title,
        length: item.length,
        iconUrl: item.iconUrl,
        date: item.date,
        imgUrl: item.imgUrl,
        summary: item.summary,
      }))),
    );
  }, []);

  return (
    <AudioList
      items={downloads.filter(audio => downloadedItems.find(item => item.id === audio.id))}
      title="Descargas"
      page={1}
      expanded
    />
  );
}

export default DownloadedAudios;
