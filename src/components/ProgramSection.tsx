import React, { useEffect, useState } from 'react';
import AudioList from './AudioList';
import service from '../service/api';
import { IAudioItem } from '../types/IAudioItem';
import { ISection } from '../types/ISection';

function ProgramSection(props: { programId: string, sec: ISection }) {
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState(false);

  const { programId, sec } = props;

  const [audioList, setAudioList] = useState<undefined | IAudioItem[]>(sec.content);

  const getAudios = (section: string, audioPage: number) => {
    setAudioList(undefined);
    service.getAudioSection(programId, section, audioPage).then(
      (audios) => setAudioList(audios),
    );
  };

  useEffect(() => {
    if (expanded) {
      getAudios(sec.id, page);
    }
  }, [page, expanded]);

  return (
    <AudioList
      key={sec.id}
      items={audioList}
      title={sec.name}
      page={page}
      nextPage={() => setPage(page + 1)}
      previousPage={() => setPage(page - 1)}
      expanded={expanded}
      switchExpander={() => setExpanded(!expanded)}
    />
  );
}

export default ProgramSection;
