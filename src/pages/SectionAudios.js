import AudioCard from "../components/AudioCard";
import Pager from "../components/stateless/Pager";
import {useEffect, useState} from "react";
import service from "../service/api";
import db from "../db";
import {useParams} from "react-router";
import AudioListItem from "../components/AudioListItem";
import ProgramCard from "../components/stateless/ProgramCard";
import AudioList from "../components/AudioList";
import {useDispatch} from "react-redux";
import {setSectionAction} from "../reducers/programsReducer";

const SectionAudios = () => {
    const {id, section} = useParams()
    const [programs, setPrograms] = useState([])
    const [page, setPage] = useState(1)

    const dispatch = useDispatch()

    useEffect(() => {
        setPrograms(false)
        service.getAudioSection(id, section, page).then(
            res => db.audios.orderBy('id').keys()
                    .then(keys => {
                        setPrograms(res.data.records.map(record =>
                            ({...record, downloaded:keys.includes(record.id)})
                        ))
                    })
        )
    }, [page])

    return (
        <div style={{width: '100%'}}>
            <AudioList
                items={programs}
                title="No toquen nada"
                page={page}
                size={10}
                nextPage={() => setPage(page + 1)}
                previousPage={() => setPage(page - 1)}
            />

            <footer style={{height: '100px'}}></footer>
        </div>
    )
}

export default SectionAudios