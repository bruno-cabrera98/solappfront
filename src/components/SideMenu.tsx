import styled, {css} from "styled-components";
import React, {RefCallback, useEffect, useState} from "react";
import api from "../service/api";
import {initAction, selectPrograms} from "../reducers/programsReducer";
import ProgramIcon from "./stateless/ProgramIcon";
import {Link} from "react-router-dom";
import {useMatch} from "react-router";
import {sizeInt} from "../parameters/sizing";
import {useSwipeable} from "react-swipeable";
import useWindowDimensions from "../hooks/WindowDimensions";
import {useAppDispatch, useAppSelector} from "../hooks/redux";

const SideMenuWrapper = styled.div`
  flex-direction: column;
  width: 250px;
  background: #0f031c;
  height: calc(100vh - 60px);
  position: sticky;
  z-index: 1;
  top: 60px;
  margin-top: 60px;
  border-right: 1px solid ${props => props.theme.purple};
  border-left: 1px solid ${props => props.theme.purple};
  overflow: auto;
  min-width: 250px;
  box-sizing: border-box;
  display: flex;
`

const SideMenuResponsiveWrapper = styled(SideMenuWrapper)<{expanded: boolean}>`
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

const MenuItemWrapper = styled.div<{active: boolean, mobile?: boolean}>`
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
    background-color: ${props => props.theme.purple};
  ` : ''}
  ${({mobile}) => mobile ? css`
    font-size: 16px;
    padding: 5px;
  ` : css`
    font-size: 13px;
  `}

`

const MenuItem = ({ program, active, mobile, handleClick} : {
    program: Program,
    active: boolean,
    mobile?: boolean,
    handleClick?: () => void
}) => {
    return (
        <Link to={`/programs/${program.id}`} style={{ textDecoration: 'none' }} onClick={handleClick}>
            <MenuItemWrapper mobile={mobile} active={active}>
                <ProgramIcon icon={program.icon_url} mini/>
                {program.name}
            </MenuItemWrapper>
        </Link>
    )
}

const SideMenu = () => {
    const dispatch = useAppDispatch()
    const { width } = useWindowDimensions()
    const programs = useAppSelector(selectPrograms())
    let match = useMatch("/programs/:id");
    const [expanded, setExpanded] = useState(false)

    const { ref: documentRef } = useSwipeable({
        onSwipedRight: () => {
            if (!expanded && width <= sizeInt.mobileL) {
                setExpanded(true)
            }
        },
        onSwipedLeft: () => {
            if (expanded && width <= sizeInt.mobileL) {
                setExpanded(false)
            }
        },
        preventScrollOnSwipe: true
    }) as { ref: RefCallback<Document> };
    // attach swipeable to document
    useEffect(() => {
        documentRef(document);
    });

    useEffect(() => {
        if (width <= sizeInt.mobileL) {
            if (expanded) {
                document.body.style.overflowY = "hidden"
            } else {
                document.body.style.overflowY = "scroll"
            }
        }
    }, [expanded])

    useEffect(() => {
        api.getProgramas().then(
            programs => dispatch(initAction(programs))
        )
    }, [])

    return width > sizeInt.mobileL ?
        <SideMenuWrapper>
            {programs && programs.filter(program => program.published).map(program => <MenuItem active={match != undefined && program.id === match.params.id} program={program} key={program.id}/> )}
        </SideMenuWrapper>
        :
        <SideMenuResponsiveWrapper expanded={expanded}>
            {programs && programs
                .filter(program => program.published)
                .map(program =>
                    <MenuItem mobile
                              active={match != undefined && program.id === match.params.id}
                              program={program}
                              key={program.id}
                              handleClick={() => setExpanded(false)}
                    />
                )}
        </SideMenuResponsiveWrapper >
}


export {SideMenu}