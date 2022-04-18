import {useParams} from "react-router";
import {useEffect, useState} from "react";
import api from '../service/api'
import ProgramSection from "../components/stateless/ProgramSection";

const ProgramPage = () => {
    const {id} = useParams()
    const [program, setProgram] = useState({})
    const [sections, setSections] = useState([])

    useEffect(() => {
        if (id) {
            api.getProgram(id)
                .then(res => {
                    setProgram(res.data.record)
                    setSections(res.data.secciones)
                })
        }

    }, [id])
    return program && <div>
        {program.nombre}

        {sections.map(sec => <ProgramSection key={sec.id} section={sec}/>)}
    </div>

}

export default ProgramPage