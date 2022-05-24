import React, { useEffect, useState } from 'react';
import { db } from '../db';
import AudioList from '../components/AudioList';
import { IAudioItem } from '../types/IAudioItem';

function DownloadedAudios() {
  const [downloads, setDownloads] = useState<IAudioItem[]>([]);

  useEffect(() => {
    db.audios.toArray().then(
      (items) => setDownloads(items.map((item) => ({
        id: item.id,
        title: item.title,
        length: item.length,
        iconUrl: item.iconUrl,
        date: item.date,
        imgUrl: item.imgUrl,
      }))),
    );
  }, []);

  return (
    <AudioList
      items={downloads}
      title="Descargas"
      page={1}
      expanded
    />
  );
}

export default DownloadedAudios;
