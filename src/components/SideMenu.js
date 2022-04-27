import styled, {css} from "styled-components";
import {useEffect, useState} from "react";
import api from "../service/api";
import {initAction} from "../reducers/programsReducer";
import {useDispatch, useSelector} from "react-redux";
import ProgramIcon from "./stateless/ProgramIcon";
import {Link} from "react-router-dom";
import {useMatch} from "react-router";
import {device} from "../parameters/sizing";
import {useSwipeable} from "react-swipeable";

const SideMenuWrapper = styled.div`
  flex-direction: column;
  width: 250px;
  background: #0f031c;
  height: calc(100vh - 60px);
  position: sticky;
  z-index: 1;
  top: 60px;
  margin-top: 60px;
  border-right: 1px solid #28044f;
  border-left: 1px solid #28044f;
  overflow: auto;
  min-width: 250px;
  ${({expanded}) => 
    expanded ? css`
      margin-left: 0;
      position: absolute;
      width: 100%;
      top:0;
    ` : css`margin-left: -250px;`
  }
  box-sizing: border-box;
  transition: margin-left .4s;
  
  @media (${device.tablet}) {
    display: flex;
    margin-left: 0;
    position: sticky;
    top: 60px;
    width: 250px;
  }

`

const MenuItemWrapper = styled.div`
  border-radius: 5px;
  margin: 5px 10px;
  padding: 2px;
  display: flex;
  color: white;
  font-size: 13px;
  font-family: sans-serif;
  align-items: center;
  :hover {
    background-color: #190a29;
  }
  ${({active}) => active ? css`
    background-color: #240347;
  ` : ''}
`

const MenuItem = ({program, active}) => {

    return (
        <Link to={`/programs/${program.id}`} style={{ textDecoration: 'none' }}>
            <MenuItemWrapper active={active}>
                <ProgramIcon icon={program['icon-mini']} mini/>
                {program.nombre}
            </MenuItemWrapper>
        </Link>
    )

}

const SideMenu = () => {
    const dispatch = useDispatch()
    const programs = useSelector(state => state.programs)
    let match = useMatch("/programs/:id");
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

    useEffect(() => {
        api.getProgramas().then(
            res => dispatch(initAction(res.data.programas))
        )
    }, [])

    return <SideMenuWrapper expanded={expanded}>
        {programs && programs.filter(program => program.publicar).map(program => <MenuItem active={match && program.id === match.params.id} program={program} key={program.id}/> )}
    </SideMenuWrapper>
}


export {SideMenu}