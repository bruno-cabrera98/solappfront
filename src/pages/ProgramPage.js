import {useParams} from "react-router";
import {useEffect, useState} from "react";
import api from '../service/api'
import AudioList from "../components/AudioList";
import {setSectionAction} from "../reducers/programsReducer";
import {useDispatch, useSelector} from "react-redux";
import ProgramSection from "../components/ProgramSection";

const ProgramPage = () => {
    const {id} = useParams()
    const [program, setProgram] = useState({})
    //const [sections, setSections] = useState([])
    const sections = useSelector(state => {
        const programs = state.programs && state.programs.find(program => program.id === id)
        return (programs && programs.sections) || []
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

    return program && <div>
        {program.nombre}
        {sections.map(sec => <ProgramSection
            key={sec.id}
            programId={id}
            sec={sec}
        />)}
        <footer style={{height: '100px'}}></footer>
    </div>

}

export default ProgramPage