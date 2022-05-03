import {useEffect, useState} from "react";
import {useSwipeable} from "react-swipeable";
import {MenuItem} from "./SideMenu";
import {useDispatch, useSelector} from "react-redux";
import {useMatch} from "react-router";
import api from "../service/api";
import {initAction} from "../reducers/programsReducer";


const SideMenuResponsive = () => {
    const dispatch = useDispatch()
    const programs = useSelector(state => state.programs)
    let match = useMatch("/programs/:id");


    useEffect(() => {
        api.getProgramas().then(
            res => dispatch(initAction(res.data.programas))
        )
    }, [])
    const [expanded, setExpanded] = useState(false)

    const { ref: documentRef } = useSwipeable({
        onSwipedRight: ({ dir, event }) => {
            if (!expanded)
                setExpanded(true)
        },
        onSwipedLeft: ({ dir, event }) => {
            if (expanded)
                setExpanded(false)
        },
        preventDefaultTouchmoveEvent: true
    });
    // attach swipeable to document
    useEffect(() => {
        documentRef(document);
    });

    return <SideMenuResponsiveWrapper expanded={expanded}>
        {programs && programs.filter(program => program.publicar).map(program => <MenuItem active={match && program.id === match.params.id} program={program} key={program.id}/> )}
    </SideMenuResponsiveWrapper>

}