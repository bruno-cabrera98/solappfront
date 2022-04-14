import {useParams} from "react-router";
import {useEffect, useState} from "react";
import api from '../service/api'

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
        {sections.map(sec => sec.nombre)}
    </div>

}

export default ProgramPage