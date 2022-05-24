import styled, { css } from 'styled-components';
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { findIconDefinition, IconDefinition, library } from '@fortawesome/fontawesome-svg-core';
import {
  faAnglesDown, faAnglesUp, faForward, faBackward,
} from '@fortawesome/free-solid-svg-icons';
import { H3 } from './stateless/Atoms/Fonts';
import usePlayer from '../hooks/usePlayer';

library.add(faAnglesUp, faAnglesDown, faForward, faBackward);

const transformUrl = (url: string) => `https${url.slice(4)}`;

const PlayerMenuInfoWrapper = styled.div<{ img_url: string }>`
  background-size: 100%;
  background-repeat: no-repeat;
  background-image: url(${(props) => (props.img_url ? transformUrl(props.img_url) : '')});
  flex-grow: 1;
`;

const PlayerMenuActionsWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background-color: #0f031c;
  position: relative;
  bottom: 0;
  height: 60px;
  width: 100%;
`;

const PlayerMenuWrapper = styled.div<{ open: boolean }>`
  display: flex;
  flex-direction: column;
  width: 600px;
  height: 400px;
  position: fixed;
  bottom: 88px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  border: solid 1px #28044f;
  background-color: #08010f;
  transition: bottom .2s linear;
  box-sizing: border-box;
  ${(props) => (props.open ? css`
    bottom: 88px;
  ` : css`
    bottom: -312px;
  `)}
`;

const PlayerMenuTitle = styled(H3)`
  color: ${(props) => props.theme.fontWhite};
  margin: 10px;
`;

const ExpandButtonWrapper = styled.button`
  display: block;
  height: 26px;
  width: 100%;
  border-radius: 5px 5px 0 0;
  background-color: #28044f;
  position: absolute;
  top:-26px;
  margin: auto;
  border: none;
  left: 50%;
  transform: translateX(-50%);
  color: white;
  cursor: pointer;
`;

const ButtonTimeChangeWrapper = styled.button`
  border: solid 1px #28044f;
  border-radius: 100%;
  background: none;
  padding: 10px;
  height: 40px;
  width: 40px;
  color: white;
  cursor: pointer;
  :hover{
    background-color: #28044f;
  }
`;

const FaBackwardIcon: IconDefinition = findIconDefinition({ prefix: 'fas', iconName: 'backward' });
function ButtonBackward() {
  return (
    <ButtonTimeChangeWrapper>
      <FontAwesomeIcon icon={FaBackwardIcon} />
    </ButtonTimeChangeWrapper>
  );
}

const FaForwardIcon: IconDefinition = findIconDefinition({ prefix: 'fas', iconName: 'forward' });
function ButtonForward() {
  return (
    <ButtonTimeChangeWrapper>
      <FontAwesomeIcon icon={FaForwardIcon} />
    </ButtonTimeChangeWrapper>
  );
}

function ExpandButton({
  handleClick,
  children,
}: { handleClick: React.MouseEventHandler<HTMLButtonElement>, children: React.ReactNode }) {
  return (
    <ExpandButtonWrapper onClick={handleClick}>
      {children}
    </ExpandButtonWrapper>
  );
}

const FaAnglesUpIcon: IconDefinition = findIconDefinition({ prefix: 'fas', iconName: 'angles-up' });
function PlayerMenu() {
  const [open, setOpen] = useState(true);
  const player = usePlayer();

  return (
    <PlayerMenuWrapper open={open}>
      <ExpandButton handleClick={() => setOpen(!open)}>
        <FontAwesomeIcon icon={FaAnglesUpIcon} />
      </ExpandButton>

      <PlayerMenuInfoWrapper img_url={player.img_url}>
        <PlayerMenuTitle>
          {player.audioTitle}
        </PlayerMenuTitle>
        {player.summary}
      </PlayerMenuInfoWrapper>

      <PlayerMenuActionsWrapper>
        <ButtonBackward />
        <ButtonForward />

      </PlayerMenuActionsWrapper>
    </PlayerMenuWrapper>
  );
}
export default PlayerMenu;
