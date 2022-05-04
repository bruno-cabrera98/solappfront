import styled, {css} from "styled-components";
import {useEffect, useState} from "react";
import api from "../service/api";
import {initAction} from "../reducers/programsReducer";
import {useDispatch, useSelector} from "react-redux";
import ProgramIcon from "./stateless/ProgramIcon";
import {Link} from "react-router-dom";
import {useMatch} from "react-router";
import {device, size, sizeInt} from "../parameters/sizing";
import {useSwipeable} from "react-swipeable";
import useWindowDimensions from "../hooks/WindowDimensions";

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
  box-sizing: border-box;
  display: flex;
`

const SideMenuResponsiveWrapper = styled(SideMenuWrapper)`
  ${({expanded}) => 
    expanded ? css`
      margin-left: 0;
    ` : css `
      margin-left: -100%;
    `
  }
  z-index: 1000;
  display: block;
  width: 100%;
  position: fixed;
  margin-top:0 ;
  transition: margin-left .4s;

`

const MenuItemWrapper = styled.div`
  border-radius: 5px;
  margin: 5px 10px;
  padding: 2px;
  display: flex;
  color: white;
  
  font-family: Raleway, sans-serif;
  font-weight: 600;
  align-items: center;
  :hover {
    background-color: #190a29;
  }
  ${({active}) => active ? css`
    background-color: #240347;
  ` : ''}
  ${({mobile}) => mobile ? css`
    font-size: 16px;
    padding: 5px;
  ` : css`
    font-size: 13px;
  `}
  
`

const MenuItem = ({program, active, mobile, handleClick}) => {

    return (
        <Link to={`/programs/${program.id}`} style={{ textDecoration: 'none' }} onClick={handleClick}>
            <MenuItemWrapper mobile={mobile} active={active}>
                <ProgramIcon icon={program['icon-mini']} mini/>
                {program.nombre}
            </MenuItemWrapper>
        </Link>
    )

}

const SideMenu = () => {
    const dispatch = useDispatch()
    const { height, width } = useWindowDimensions()
    const programs = useSelector(state => state.programs)
    let match = useMatch("/programs/:id");
    const [expanded, setExpanded] = useState(false)

    const { ref: documentRef } = useSwipeable({
        onSwipedRight: ({ dir, event }) => {
            if (!expanded && width <= sizeInt.mobileL) {
                setExpanded(true)
            }
        },
        onSwipedLeft: ({ dir, event }) => {
            if (expanded && width <= sizeInt.mobileL) {
                setExpanded(false)
            }
        },
        preventDefaultTouchmoveEvent: true
    });
    // attach swipeable to document
    useEffect(() => {
        documentRef(document);
    });

    useEffect(() => {
        if (width <= sizeInt.mobileL) {
            if (expanded) {
                document.body.style['overflow-y'] = "hidden"
            } else {
                document.body.style['overflow-y'] = "scroll"
            }
        }
    }, [expanded])

    useEffect(() => {
        api.getProgramas().then(
            res => dispatch(initAction(res.data.programas))
        )
    }, [])

    return width > sizeInt.mobileL ?
        <SideMenuWrapper expanded={expanded}>
            {programs && programs.filter(program => program.publicar).map(program => <MenuItem active={match && program.id === match.params.id} program={program} key={program.id}/> )}
        </SideMenuWrapper>
        :
        <SideMenuResponsiveWrapper expanded={expanded}>
            {programs && programs
                .filter(program => program.publicar)
                .map(program =>
                    <MenuItem mobile
                              active={match && program.id === match.params.id}
                              program={program}
                              key={program.id}
                              handleClick={() => setExpanded(false)}
                    />
                )}
        </SideMenuResponsiveWrapper >
}


export {SideMenu}