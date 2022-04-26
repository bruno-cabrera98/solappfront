import {useParams} from "react-router";
import {useEffect, useState} from "react";
import api from '../service/api'
import ProgramSection from "../components/stateless/ProgramSection";
import AudioList from "../components/AudioList";
import {setSectionAction, setSectionAudiosAction} from "../reducers/programsReducer";
import {useDispatch, useSelector} from "react-redux";
import service from "../service/api";
import db from "../db";

const ProgramPage = () => {
    const {id} = useParams()
    const [program, setProgram] = useState({})
    //const [sections, setSections] = useState([])
    const sections = useSelector(state => {
        const programs = state.programs && state.programs.find(program => program.id === id)
        const sections = (programs && programs.sections) || []
        return sections
    })

    const dispatch = useDispatch()

    useEffect(() => {
        if (id) {
            api.getProgram(id)
                .then(res => {
                    setProgram(res.data.record)

                    dispatch(setSectionAction(id, res.data.secciones))
                    // setSections(res.data.secciones)
                })
        }

    }, [id])

    const getAudios = (section, page) => {
        console.log({id, section, page})
        service.getAudioSection(id, section, page).then(
            res => db.audios.orderBy('id').keys()
                .then(keys => {
                    dispatch(setSectionAudiosAction(
                        id,
                        section,
                        res.data.records.map(record =>
                            ({...record, downloaded:keys.includes(record.id)})
                        )
                    ))
                })
        )
    }

    return program && <div>
        {program.nombre}
        {sections.map(sec => <AudioList
            key={sec.id}
            items={sec.contenido}
            title={sec.nombre}
            page={false}
            nextPage={() => console.log(0)}
            previousPage={() =>  console.log(0)}
            onExpand={() => getAudios(sec.id, 1)}
        />)}
        <footer style={{height: '100px'}}></footer>
    </div>

}

export default ProgramPage