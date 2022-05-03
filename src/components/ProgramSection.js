import {useDispatch, useSelector} from "react-redux";
import AudioList from "./AudioList";
import {useEffect, useState} from "react";
import service from "../service/api";
import db from "../db";
import {setSectionAudiosAction, unlinkSectionAudiosAction} from "../reducers/programsReducer";

const ProgramSection = ({programId, sec}) => {
    const dispatch = useDispatch()

    const getAudios = (section, page) => {
        dispatch(unlinkSectionAudiosAction(programId, section))
        service.getAudioSection(programId, section, page).then(
            res => db.audios.orderBy('id').keys()
                .then(keys => {
                    dispatch(setSectionAudiosAction(
                        programId,
                        section,
                        res.data.records.map(record =>
                            ({...record, downloaded: keys.includes(record.id)})
                        )
                    ))
                    setDownloaded(true)
                })
        )
    }

    const [page, setPage] = useState(1)
    const [downloaded, setDownloaded] = useState(false)
    const [firstDownload, setFirstDownload] = useState(false)

    useEffect(() => {
        getAudios(sec.id, page)
    }, [page])

    return (
        <AudioList
            key={sec.id}
            items={sec.contenido}
            title={sec.nombre}
            page={page}
            nextPage={() => setPage(page + 1)}
            previousPage={() =>  setPage(page - 1)}
            onExpand={() => getAudios(sec.id, 1)}
        />
    )
}

export default ProgramSection