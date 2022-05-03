import AudioListItem from "./AudioListItem";
import styled, {css} from "styled-components";
import Pager from "./stateless/Pager";
import {useEffect, useState} from "react";

import {library} from "@fortawesome/fontawesome-svg-core";
import {faAngleDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

library.add(faAngleDown)

const AudioListExpanderWrapper = styled.div`
  margin-left: 5px;
  transition: transform .3s ease-in-out;
  ${({expanded}) => expanded ? css`
    transform: rotate(180deg);
  ` : css``}
`

const AudioListExpander = ({expanded}) => {
    return (
        <AudioListExpanderWrapper expanded={expanded}>
            <FontAwesomeIcon icon="fa-angle-down" size={"xs"}/>
        </AudioListExpanderWrapper>
    )
}

const AudioListMenuWrapper = styled.div`
  position: absolute;
  color: white;
  top: -13px;
  font-size: 16px;
  font-family: sans-serif;
  margin-left: 5px;
  display: flex;
  align-items: center;
  cursor: pointer;
`

const AudioListMenu = ({title, expanded, switchExpander}) => {
    return (
        <AudioListMenuWrapper onClick={switchExpander}>
            {title}
            <AudioListExpander expanded={expanded} switchExpander={switchExpander}/>
        </AudioListMenuWrapper>
    )
}

const AudioListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-top: 30px;
  margin-bottom: 10px;
  border-radius: 10px;
  border: solid 1px #FFF2;
  width: 100%;
  box-sizing: border-box;
  position: relative;
  transition: height .2s ease-in-out;
  ${({expanded, size}) => !expanded ? css `
    height: 100px;
  ` : css`
    height: ${20 + size*60}px;
  `}
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
  font-family: sans-serif;
  margin:auto;
  display: flex;
  align-items: center;
  cursor: pointer;
`

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
    }) => {

    const getListSize = () => {
        if (!expanded)
            return 1
        return (items && items.length) || size
    }

    const emptyList = () => {
        if (!items || items.length === 0) {
            return Array.from(Array(getListSize()).keys()).map(
                item => <AudioListItem key={item} skeleton={true}/>
            )
        } else return false
    }

    return <AudioListWrapper expanded={expanded} size={getListSize()}>
        <AudioListMenu title={title} expanded={expanded} switchExpander={switchExpander}/>
        {
            emptyList() || items.slice(0, getListSize()).map(
                item => (
                    <AudioListItem item={item} />
                )
            )
        }
        {page && expanded && <AudioListPagerWrapper>
            <Pager nextPage={nextPage} previousPage={previousPage} page={page}/>
        </AudioListPagerWrapper>}
        {expanded === false && <ExpandAudios onClick={switchExpander}>Listar mas audios</ExpandAudios>


        }
    </AudioListWrapper>

}

export default AudioList