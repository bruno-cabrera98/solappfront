import AudioListItem from "./AudioListItem"
import styled, {css} from "styled-components";
import Pager from "./stateless/Pager"

import {findIconDefinition, IconDefinition, library} from "@fortawesome/fontawesome-svg-core";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import React from "react";

library.add(faAngleDown)

const AngleDownIcon: IconDefinition = findIconDefinition({prefix: "fas", iconName: 'angle-down'})

const AudioListExpanderWrapper = styled.div<{expanded:boolean}>`
  margin-left: 5px;
  transition: transform .3s ease-in-out;
  ${({expanded}) => expanded ? css`
    transform: rotate(180deg);
  ` : css``}
`

const AudioListExpander = (props : {expanded : boolean})  => {
    return (
        <AudioListExpanderWrapper expanded={props.expanded}>
            <FontAwesomeIcon icon={AngleDownIcon} size={"xs"}/>
        </AudioListExpanderWrapper>
    )
}

const AudioListMenuWrapper = styled.div`
  position: absolute;
  color: white;
  top: -13px;
  font-size: 16px;
  font-family: Raleway, sans-serif;
  margin-left: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const AudioListMenu = (props : {title: string, expanded: boolean, switchExpander: () => void}) => {
    const {title, expanded, switchExpander} = props
    return (
        <AudioListMenuWrapper onClick={switchExpander}>
            {title}
            <AudioListExpander expanded={expanded}/>
        </AudioListMenuWrapper>
    )
}

const AudioListWrapper = styled.div<{expanded:boolean, size: number}>`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-top: 30px;
  margin-bottom: 10px;
  border-radius: 10px;
  border: solid 1px ${props => props.theme.purple};
  width: 100%;
  box-sizing: border-box;
  position: relative;
  transition: height .2s linear;
  ${({expanded, size}) => {
    if (!expanded)
      return css`
        height: 100px;
      `
    else {
      return css`
        height: ${20 + size * 60}px;
      `
    }
  }}
`

const AudioListPagerWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
`

const ExpandAudios = styled.div`
  color: #a170d7;
  font-size: 14px;
  font-family: Raleway, sans-serif;
  margin:auto;
  display: flex;
  align-items: center;
  cursor: pointer;
`

interface IAudioListProps {
    items?: AudioItem[]
    size?: number,
    title: string,
    page: number,
    nextPage: () => void,
    previousPage: () => void,
    switchExpander: () => void,
    expanded: boolean,
}

const AudioList = (
    {
        items,
        size = 10,
        title,
        page,
        nextPage,
        previousPage,
        switchExpander,
        expanded,
    }: IAudioListProps) => {

    const getListSize = () => {
        if (!expanded)
            return 1
        return (items && items.length) || size
    }

    const emptyList = () => {
        if (items === undefined || items.length === 0) {
            return Array.from(Array(getListSize()).keys()).map(
                item => <AudioListItem key={item} skeleton={true}/>
            )
        } else return false
    }

    return <AudioListWrapper expanded={expanded} size={getListSize()}>
        <AudioListMenu title={title} expanded={expanded} switchExpander={switchExpander}/>
        {
            emptyList() || (items && items.slice(0, getListSize()).map(
                item => (
                    <AudioListItem key={item.id} item={item} />
                )
            ))
        }
        {page && expanded && <AudioListPagerWrapper>
            <Pager nextPage={nextPage} previousPage={previousPage} page={page}/>
        </AudioListPagerWrapper>}
        {!expanded && <ExpandAudios onClick={switchExpander}>Listar mas audios</ExpandAudios>}
    </AudioListWrapper>

}

export default AudioList