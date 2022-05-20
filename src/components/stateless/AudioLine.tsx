import styled from "styled-components";
import {findIconDefinition, IconDefinition, library} from "@fortawesome/fontawesome-svg-core";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {setAudioAction} from "../../reducers/playerReducer";
import PlayButton from "./PlayButton";
import ProgramIcon from "./ProgramIcon";
import ProgramName from "./ProgramName";
import {H3} from "./Atoms/Fonts";
import React from "react";
import {useAppDispatch} from "../../hooks/redux";

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

const ProgramTime = styled(H3)`
  color: ${props => props.theme.fontWhite};
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

const FaTrashIcon: IconDefinition = findIconDefinition({prefix: "fas", iconName: 'trash'})
const AudioLine = ({item, handleDeleteAudio} : {item: AudioItem, handleDeleteAudio: (item : AudioItem) => void}) => {
    console.log(item)
    const deleteAudio = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        handleDeleteAudio(item)
    }

    const dispatch = useAppDispatch()
    const handlePlay = (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        dispatch(setAudioAction(item, true))
    }

    return (
        <AudioLineContainer>
            <PlayButton handlePlay={handlePlay} playing={false}/>
            <ProgramName>
                <ProgramIcon icon={item.icon_url}/>
                {item.title}</ProgramName>
            <ProgramTime>{item.length}</ProgramTime>
            <DeleteButton onClick={deleteAudio}>
                <FontAwesomeIcon icon={FaTrashIcon}/>
            </DeleteButton>
        </AudioLineContainer>
    )

}

export default AudioLine