import {useDispatch} from "react-redux";
import {setAudioAction} from "../reducers/playerReducer";
import db from "../db";
import service from "../service/api";

import {setAudioDownloadedAction, setAudioDownloadingAction} from "../reducers/audioListReducer";
import Spinner from "./stateless/Spinner";
import styled from "styled-components";
import {Button, RoundButton} from "./stateless/Button";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


library.add(faPlus)


const BackgroundImage = styled.div`
  height: 100%;
  max-width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background-image:  linear-gradient(to right,rgba(173,178,182,0)0%,#0A031C 30%), url(${({src}) => src});
  background-size: contain;
  width: 100%;
  background-repeat: no-repeat;
  z-index: -1;
  filter: blur(5px);
`

const AudioCardWrapper = styled.div`
  border: solid 1px purple;
  margin-bottom: 10px;
  padding: 10px;
  position: relative;
  border-radius: 10px;
  color: rgba(255,255,255,0.91);
  overflow: hidden;
`

const AudioCardTitle = styled.h3`
  font-family: "Raleway", Raleway, sans-serif;
  font-size: 16px;
  text-shadow: 1px 1px 2px #070c13;
`

const AudioSubtitle = styled.h4`
  font-family: Raleway, sans-serif;
  font-size: 14px;
  text-shadow: 1px 1px 2px #070c13;
`

const AudioCardTitleWrapper = styled.div`
  margin-left: 80px;
`

const AudioButtonContainer = styled.div`
  position: absolute;
`

const AudioCard = ({item}) => {
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
            dispatch(setAudioDownloadedAction(id, true))
            dispatch(setAudioDownloadingAction(id, false))
            db.audios.add({id:id, blob:audioBlob, titulo:item.titulo, duracion:item.duracion, icon:item.programa.icon}, [id])
        }
    }

    return item &&
        <AudioCardWrapper>
            <AudioButtonContainer>
                <RoundButton onClick={handlePlay}>
                    <FontAwesomeIcon icon="fa-solid fa-plus" />
                </RoundButton>
            </AudioButtonContainer>

            <AudioCardTitleWrapper>
                <AudioCardTitle>{item.titulo}</AudioCardTitle>
                <AudioSubtitle>{item.fechaEmision_full}</AudioSubtitle>
            </AudioCardTitleWrapper>

            <Button onClick={handleDownload}>Download</Button>
            {item.downloading ? <Spinner/> : false}
            {item.downloaded ? <p>Si</p> : <p>No</p>}

            <BackgroundImage src={item.media.img_894x503}/>
        </AudioCardWrapper>
}

export default AudioCard