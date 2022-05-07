import Spinner from "./stateless/Spinner";
import styled from "styled-components";
import {Button, RoundButton} from "./stateless/Button";
import {library} from "@fortawesome/fontawesome-svg-core";
import {faPlus} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import usePlayer from "../hooks/usePlayer";
import {H3, H4} from "./stateless/Atoms/Fonts";

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

const AudioCardTitle = styled(H3)`
  color: ${props => props.theme.fontWhite};
  font-size: 16px;
  text-shadow: 1px 1px 2px #070c13;
`

const AudioSubtitle = styled(H4)`
  color: ${props => props.theme.fontWhite};
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
    const player = usePlayer()

    const handlePlay = (event) => {
        event.preventDefault()
        player.play(item)
    }

    const handleDownload = async (event) => {
        event.preventDefault()
        await player.download(item)
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