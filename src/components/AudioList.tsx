import styled, { css } from 'styled-components';

import { findIconDefinition, IconDefinition, library } from '@fortawesome/fontawesome-svg-core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import Pager from './stateless/Pager';
import AudioListItem from './AudioListItem';
import { IAudioItem } from '../types/IAudioItem';
import { H3 } from './stateless/Atoms/Fonts'

library.add(faAngleDown);

const AngleDownIcon: IconDefinition = findIconDefinition({ prefix: 'fas', iconName: 'angle-down' });

const EmptyListMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: center;
  text-align: center;
`

const EmptyListMessage = () => <EmptyListMessageWrapper>
    <H3 dark={false}>
        No hay audios en la lista
    </H3>
</EmptyListMessageWrapper>

const AudioListExpanderWrapper = styled.div<{ expanded?: boolean }>`
  margin-left: 5px;
  transition: transform .3s ease-in-out;
  ${({ expanded }) => (expanded ? css`
    transform: rotate(180deg);
  ` : css``)}
`;

function AudioListExpander({ expanded }: { expanded?: boolean }) {
    return (
        <AudioListExpanderWrapper expanded={expanded}>
            <FontAwesomeIcon icon={AngleDownIcon} size="xs" />
        </AudioListExpanderWrapper>
    );
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
`;

function AudioListMenu(props: { title: string, expanded?: boolean, switchExpander?: () => void }) {
    const { title, expanded, switchExpander } = props;
    return (
        <AudioListMenuWrapper onClick={switchExpander}>
            {title}
            {switchExpander && <AudioListExpander expanded={expanded}/>}
        </AudioListMenuWrapper>
    );
}

const AudioListWrapper = styled.div<{ expanded?: boolean, size: number }>`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-top: 30px;
  margin-bottom: 10px;
  border-radius: 10px;
  border: solid 1px ${(props) => props.theme.purple};
  width: 100%;
  box-sizing: border-box;
  position: relative;
  transition: height .2s linear;
  ${({ expanded, size }) => {
    if (!expanded) {
      return css`
        height: 100px;
      `;
    }
    if (size === 0) {
      return css`height: auto`
    } else {
      return css`
        height: ${20 + size * 60}px;
      `;
    }
  }}
`;

const AudioListPagerWrapper = styled.div`
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 50%);
`;

const ExpandAudios = styled.div`
  color: #a170d7;
  font-size: 14px;
  font-family: Raleway, sans-serif;
  margin:auto;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

interface IAudioListProps {
    items?: IAudioItem[]
    size?: number,
    title: string,
    page: number,
    nextPage?: () => void,
    previousPage?: () => void,
    switchExpander?: () => void,
    expanded?: boolean,
}

function AudioList({
                       items,
                       size = 10,
                       title,
                       page,
                       nextPage,
                       previousPage,
                       switchExpander,
                       expanded,
                   }: IAudioListProps) {
    const getListSize = () => {
        if (!expanded) return 1;
        if (items) return items.length
        return size;
    };

    const emptyList = () => {
        if (items === undefined) { // Return skeleton
            return Array.from(Array(getListSize()).keys()).map(
                (item) => <AudioListItem key={item} skeleton />,
            );
        } else if ( items.length === 0 ) {
            return <EmptyListMessage/>

        }
        return false;
    };

    return (
        <AudioListWrapper expanded={expanded} size={getListSize()}>
            <AudioListMenu title={title} expanded={expanded} switchExpander={switchExpander} />
            {
                emptyList() || (items && items.slice(0, getListSize()).map(
                    (item) => (
                        <AudioListItem key={item.id} item={item} />
                    ),
                ))
            }
            {page && expanded && nextPage && previousPage && (
                <AudioListPagerWrapper>
                    <Pager nextPage={nextPage} previousPage={previousPage} page={page} />
                </AudioListPagerWrapper>
            )}
            {!expanded && <ExpandAudios onClick={switchExpander}>Listar mas audios</ExpandAudios>}
        </AudioListWrapper>
    );
}

export default AudioList;
