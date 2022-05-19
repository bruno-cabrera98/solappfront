import AudioList from "./AudioList";
import {useEffect, useState} from "react";
import service from "../service/api";
import React from "react";

const ProgramSection = (props : {programId : string, sec : Section}) => {
    const [page, setPage] = useState(1)
    const [expanded, setExpanded] = useState(false)

    const {programId, sec} = props

    useEffect(() => {
        if (expanded) {
            getAudios(sec.id, page)
        }
    }, [page, expanded])

    const [audioList, setAudioList] = useState<false | AudioItem[]>(sec.content)

    const getAudios = (section : string, page : number) => {
        setAudioList(false)
        service.getAudioSection(programId, section, page).then(
            audios => setAudioList(audios)
        )
    }

    return (
        <AudioList
            key={sec.id}
            items={audioList}
            title={sec.name}
            page={page}
            nextPage={() => setPage(page + 1)}
            previousPage={() =>  setPage(page - 1)}
            expanded={expanded}
            switchExpander={() => setExpanded(!expanded)}
        />
    )
}

export default ProgramSection