import ProgramIcon from "./stateless/ProgramIcon";
import {Button} from "./stateless/Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {findIconDefinition, IconDefinition, library} from "@fortawesome/fontawesome-svg-core";
import {faDownload, faTrashCan} from "@fortawesome/free-solid-svg-icons";
import {device} from "../parameters/sizing"

import styled, {keyframes, css} from "styled-components";
import usePlayer from "../hooks/usePlayer";
import {H1} from "./stateless/Atoms/Fonts";
import Spinner from "./stateless/Spinner";
import React from "react";
import {useAppSelector} from "../hooks/redux";
import {selectDownloadedItem} from "../reducers/downloadListReducer";

library.add(faDownload, faTrashCan)

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

const ItemText = styled(H1)<{skeleton?: boolean }>`
  margin: 0 0;
  color: ${props => props.theme.fontWhite};
  font-size: 12px;
  position: relative;
  min-width: 0;
  ${({skeleton}) => skeleton ? css`
    visibility: hidden;
    height: 16px;

    :after {
      top: 0;
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
  font-family: Raleway, sans-serif;
  color: white;
  margin: 0 0;

  font-size: 8px;

  @media (${device.tablet}) {
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

const FaPlayIcon: IconDefinition = findIconDefinition({prefix: "fas", iconName: 'play'})
const ButtonPlay = ({handlePlay} : {handlePlay: React.MouseEventHandler<HTMLButtonElement> | undefined}) => (
    <Button onClick={handlePlay}>
        <FontAwesomeIcon icon={FaPlayIcon} />
    </Button>
)

const FaDownloadIcon: IconDefinition = findIconDefinition({prefix: "fas", iconName: 'download'})
const ButtonDownload = ({handleDownload} : {handleDownload: React.MouseEventHandler<HTMLButtonElement> | undefined}) => (
    <Button onClick={handleDownload}>
        <FontAwesomeIcon icon={FaDownloadIcon} />
    </Button>
)

const FaTrashCanIcon: IconDefinition = findIconDefinition({prefix: "fas", iconName: 'trash-can'})
const ButtonDelete = ({handleDelete} : {handleDelete: React.MouseEventHandler<HTMLButtonElement> | undefined}) => (
    <Button onClick={handleDelete}>
        <FontAwesomeIcon icon={FaTrashCanIcon} />
    </Button>
)

const ButtonSpinner = () => <Button greyed>
    <Spinner/>
</Button>

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

const AudioListItem = ({item, skeleton} : {item?: AudioItem, skeleton?: boolean}) => {
    const icon = item && item.icon_url

    const downloadedState = useAppSelector(selectDownloadedItem(item && item.id))

    const player = usePlayer()

    const handlePlay = (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (item)
            player.play(item)
    }

    const handleDownload = async (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (item)
            await player.download(item)
    }

    const handleDelete = async (event : React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault()
        if (item)
            await player.delete(item)
    }
    const downloadButton = () => {

        if (downloadedState === 'notDownloaded') {
            return <ButtonDownload handleDownload={handleDownload}/>
        } else if (downloadedState === 'downloaded') {
            return <ButtonDelete handleDelete={handleDelete} />
        } else return  <ButtonSpinner/>

    }

    return (
        <ItemWrapper>
            <DetailsContainer>
                <ProgramIcon icon={icon} skeleton={skeleton} small/>
                <TitleContainer>
                    <ItemTitle skeleton={skeleton}>{(item && item.title)}</ItemTitle>
                    <ItemSubtitle skeleton={skeleton}>{(item && item.date)}</ItemSubtitle>
                </TitleContainer>
            </DetailsContainer>
            <ActionsContainer>
                <ItemTime skeleton={skeleton}>{item && item.length}</ItemTime>
                <ButtonGroup>
                    <ButtonPlay handlePlay={handlePlay}/>
                    {downloadButton()}
                </ButtonGroup>
            </ActionsContainer>
        </ItemWrapper>
    )
}

export default AudioListItem