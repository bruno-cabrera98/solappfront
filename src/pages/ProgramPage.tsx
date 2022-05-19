import {useParams} from "react-router";
import {useEffect, useState} from "react";
import api from '../service/api'
import {selectSections, setSectionAction} from "../reducers/programsReducer";
import {useDispatch} from "react-redux";
import ProgramSection from "../components/ProgramSection";
import styled from "styled-components";
import {H1} from "../components/stateless/Atoms/Fonts";
import {useAppDispatch, useAppSelector} from "../hooks/redux";
import React from "react";

const Title = styled(H1)`
    color: ${props => props.theme.fontWhite}
`

const ProgramPage = () => {
    const {id} = useParams()
    const [program, setProgram] = useState<undefined | Program>(undefined)

    const sections = useAppSelector(selectSections(id))
    const dispatch = useAppDispatch()

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
        <Title>{program.name}</Title>
        {sections.map(sec => <ProgramSection
            key={sec.id}
            programId={id}
            sec={sec}
        />)}
        <footer style={{height: '100px'}}></footer>
    </div>

}

export default ProgramPage