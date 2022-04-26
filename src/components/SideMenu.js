import styled, {css} from "styled-components";
import {useEffect} from "react";
import api from "../service/api";
import {initAction} from "../reducers/programsReducer";
import {useDispatch, useSelector} from "react-redux";
import ProgramIcon from "./stateless/ProgramIcon";
import {Link} from "react-router-dom";
import {useMatch} from "react-router";

const SideMenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 250px;
  background: #0f031c;
  height: calc(100vh - 60px);
  position: sticky;
  left: 0;
  top: 60px;
  border-right: 1px solid #28044f;
  border-left: 1px solid #28044f;
  overflow: auto;

`

const MenuItemWrapper = styled.div`
  border-radius: 5px;
  margin: 5px 10px;
  padding: 5px;
  display: flex;
  color: white;
  font-size: 14px;
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
    console.log(match)
    useEffect(() => {
        api.getProgramas().then(
            res => dispatch(initAction(res.data.programas))
        )
    }, [])

    return <SideMenuWrapper>
        {programs && programs.filter(program => program.publicar).map(program => <MenuItem active={match && program.id === match.params.id} program={program} key={program.id}/> )}
    </SideMenuWrapper>
}


export {SideMenu}