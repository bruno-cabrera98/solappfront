import styled from "styled-components";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {pauseAction, resumeAction, setAudioAction} from "../../reducers/playerReducer";
import PlayButton from "./PlayButton";
import {useDispatch} from "react-redux";
import ProgramIcon from "./ProgramIcon";
import ProgramName from "./ProgramName";

library.add(faTrash)

const AudioLineContainer = styled.div`
  display: flex;
  border: solid 1px #08010f;
  width: 100%;
  height: 60px;
  background: #08010f;
  justify-content: space-between;
  align-items: center;
`

const ProgramTime = styled.h3`
  font-family: sans-serif;
  color: white;
`

const DeleteButton = styled.button`
  border: none;
  height: 40px;
  width: 40px;
  font-size: 16px;
  margin-right: 10px;
  border-radius: 5px;
  cursor: pointer;
`


const AudioLine = ({item, handleDeleteAudio}) => {

    const deleteAudio = (event) => {
        event.preventDefault()
        handleDeleteAudio(item.id)
    }

    const dispatch = useDispatch()
    const handlePlay = (event) => {
        event.preventDefault()
        dispatch(setAudioAction(item.id, item.titulo))
    }

    return (
        <AudioLineContainer>
            <PlayButton handlePlay={handlePlay}/>
            <ProgramName>
                <ProgramIcon icon={item.icon}/>
                {item.titulo}</ProgramName>
            <ProgramTime>{item.duracion}</ProgramTime>
            <DeleteButton onClick={deleteAudio}>
                <FontAwesomeIcon icon="fa-solid fa-trash"/>
            </DeleteButton>
        </AudioLineContainer>
    )

}

export default AudioLine