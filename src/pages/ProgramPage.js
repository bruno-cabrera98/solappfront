import {useParams} from "react-router";
import {useEffect, useState} from "react";
import api from '../service/api'
import AudioList from "../components/AudioList";
import {setSectionAction} from "../reducers/programsReducer";
import {useDispatch, useSelector} from "react-redux";
import ProgramSection from "../components/ProgramSection";
import styled from "styled-components";
import {H1} from "../components/stateless/Atoms/Fonts";

const Title = styled(H1)`
    color: ${props => props.theme.fontWhite}
`

const ProgramPage = () => {
    const {id} = useParams()
    const [program, setProgram] = useState({})

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
                })
        }
    }, [id])

    return program && <div>
        <Title>{program.nombre}</Title>
        {sections.map(sec => <ProgramSection
            key={sec.id}
            programId={id}
            sec={sec}
        />)}
        <footer style={{height: '100px'}}></footer>
    </div>

}

export default ProgramPage