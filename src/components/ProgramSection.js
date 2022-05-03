import {useDispatch, useSelector} from "react-redux";
import AudioList from "./AudioList";
import {useEffect, useRef, useState} from "react";
import service from "../service/api";
import db from "../db";

const ProgramSection = ({programId, sec}) => {
    const [page, setPage] = useState(1)
    console.log(sec.contenido)

    const [expanded, setExpanded] = useState(false)

    useEffect(() => {
        if (expanded) {
            getAudios(sec.id, page)
        }
    }, [page, expanded])

    const [audioList, setAudioList] = useState(sec.contenido)

    const getAudios = (section, page) => {

        setAudioList(false)
        service.getAudioSection(programId, section, page).then(
            res => db.audios.orderBy('id').keys()
                .then(keys => {
                    setAudioList(res.data.records.map(record =>
                        ({...record, downloaded: keys.includes(record.id)})
                    ))
                })
        )

    }

    return (
        <AudioList
            key={sec.id}
            items={audioList}
            title={sec.nombre}
            page={page}
            nextPage={() => setPage(page + 1)}
            previousPage={() =>  setPage(page - 1)}
            expanded={expanded}
            switchExpander={() => setExpanded(!expanded)}
        />
    )
}

export default ProgramSection