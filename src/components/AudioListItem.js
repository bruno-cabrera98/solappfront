import ProgramIcon from "./stateless/ProgramIcon";
import {Button} from "./stateless/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useDispatch} from "react-redux";
import {setAudioAction} from "../reducers/playerReducer";
import db from "../db";
import {setAudioDownloadedAction, setAudioDownloadingAction} from "../reducers/audioListReducer";
import service from "../service/api";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import {device} from "../parameters/sizing"

import styled, {keyframes, css} from "styled-components";

library.add(faDownload)

const DetailsContainer = styled.div`
  display: flex;
  align-items: center;
  min-width: 0;
  padding-right: 10px;
`

const ItemWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  min-height: 60px;
  min-width: 0;
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 5px;
  min-width: 0;
`

const skeletonAnimation = keyframes`
  from {
    opacity: 30%;
  }
  to {
    opacity: 100%;
  }
`

const ItemText = styled.h1`
  margin: 0 0;
  color: white;
  font-size: 12px;
  font-family: sans-serif;
  position: relative;
  min-width: 0;
  ${({skeleton}) => skeleton ? css`
    visibility: hidden;
    height: 16px;

    :after {
      top: 0px;
      visibility: visible;
      content: '';
      height: 12px;
      margin: 2px 0;
      width: 600px;
      background: rgba(255, 255, 255, .4);
      display: block;
      position: absolute;
      z-index: 1;
      border-radius: 2px;
      animation-duration: 1s;
      animation-name: ${skeletonAnimation};
      animation-direction: alternate;
      animation-iteration-count: infinite;
      animation-timing-function: linear;
    }
  ` : css``
  }
`

const ItemTitle = styled(ItemText)`
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;

  font-size: 12px;
  @media (${device.tablet}) {
    font-size: 14px;
  }
`

const ItemSubtitle = styled(ItemText)`
  font-family: sans-serif;
  color: white;
  margin: 0 0;

  font-size: 8px;

  @media (${device.table}) {
    font-size: 10px;
  }
  
  ${({skeleton}) => skeleton ? css`
    visibility: hidden;
    height: 16px;
    :after {
      top:4px;
      height: 8px;
      width: 150px;
    }
  ` : css``
  }
`

const ItemTime = styled(ItemText)`
  margin-right: 10px;
  ${({skeleton}) => skeleton ? css`
    visibility: hidden;
    height: 16px;
    :after {
      top: -1px;
      height: 16px;
      width: 40px;
      left: -37px;
    }
  ` : css``
  }
`

const ActionsContainer = styled.div`
  display: flex;
  align-items: center;
`

const ButtonPlay = ({handlePlay}) => (
    <Button onClick={handlePlay}>
        <FontAwesomeIcon icon="fa-solid fa-play" />
    </Button>
)

const ButtonDownload = ({handleDownload}) => (
    <Button onClick={handleDownload}>
        <FontAwesomeIcon icon="fa-solid fa-download" />
    </Button>
)

const ButtonGroup = styled.div`
  ${Button} {
    margin: 0;
    border-radius: 0;
    font-size: 10px;
    height: 30px;
    line-height: 30px;
    @media (${device.tablet}) {
      font-size: 14px;
    }
  }
  border-radius: 5px;
  overflow: hidden;
  height: fit-content;
  display: flex;
  align-items: center;
`

const AudioListItem = ({item, skeleton, dummy}) => {
    const icon = item && item.programa && item.programa.icon
    const dispatch = useDispatch()

    const handlePlay = (event) => {
        event.preventDefault()
        dispatch(setAudioAction(item.id, item.titulo))
    }
    const handleDownload = async (event) => {
        event.preventDefault()
        const {id} = item
        let audioBlob = await db.audios.get(id)
        if (!audioBlob) {
            dispatch(setAudioDownloadingAction(id, true))
            const res = await service.getAudio(id)
            audioBlob = res.data
            console.log('Audio saved in DB')
            dispatch(setAudioDownloadedAction(id, true))
            dispatch(setAudioDownloadingAction(id, false))
            db.audios.add({id:id, blob:audioBlob, titulo:item.titulo, duracion:item.duracion, icon:item.programa.icon}, [id])
        }
    }

    return (
        <ItemWrapper dummy={dummy}>
            <DetailsContainer>
                <ProgramIcon icon={icon} skeleton={skeleton} small/>
                <TitleContainer>
                    <ItemTitle skeleton={skeleton}>{(item && item.titulo) || 'Lorem ipsum chupame esta'}</ItemTitle>
                    <ItemSubtitle skeleton={skeleton}>{(item && item.fechaEmision_full) || 'Lorem ipsum chupame esta'}</ItemSubtitle>
                </TitleContainer>
            </DetailsContainer>
            <ActionsContainer>
                <ItemTime skeleton={skeleton}>{item && item.duracion_mp3}</ItemTime>
                <ButtonGroup>
                    <ButtonPlay handlePlay={handlePlay}/>
                    <ButtonDownload handleDownload={handleDownload}/>
                </ButtonGroup>
            </ActionsContainer>
        </ItemWrapper>
    )
}

export default AudioListItem