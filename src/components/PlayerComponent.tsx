import React, {useEffect, useRef} from 'react';
import styled from 'styled-components';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faDownload, faPause, faPlay, faTrashCan,
} from '@fortawesome/free-solid-svg-icons';
import {initializeAction, setDurationAction, updateAction} from '../reducers/playerReducer';
import Slider from './stateless/Slider';
import PlayerTitle from './stateless/PlayerTitle';
import PlayButton from './stateless/PlayButton';
import usePlayer from '../hooks/usePlayer';
import {useAppDispatch} from "../hooks/redux";
import {Player} from "../types/Player";

library.add(faDownload, faTrashCan, faPlay, faPause);

const PlayerWrapper = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  -webkit-transition: all 0.3s ease-in-out;
  box-shadow: 0 10px 20px 10px rgb(8, 1, 15);
  transition: all 0.3s ease-in-out;
  background-color: #08010f;
  border-top: 1px solid ${(props) => props.theme.purple};
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  z-index: 1000;
`;

const InnerPlayerWrapper = styled.div`
  display: flex;
  padding: 5px 10px;
  width: 100%;
  align-items: center;
  box-sizing: border-box;
`;

const TimerWrapper = styled.div`
  font-family: Raleway, sans-serif;
  display: flex;
  color: white;
  background-image: linear-gradient(67deg,#e8154a 0%,#e87630 45%,#e8d615 100%);
  padding: 5px;
  border-radius: 10px;
  margin-left: 5px;
  font-weight: 500;
`;

const SliderWrapper = styled.div`
  margin-left: 10px;
  width: auto;
  flex-grow: 1;
`;

function Timer({ time, duration }: { time: number, duration: number }) {
  const timeMinutes = String(Math.floor(time / 60)).padStart(2, '0');
  const timeSeconds = String(Math.floor(time % 60)).padStart(2, '0');
  const durationMinutes = String(Math.floor(duration / 60)).padStart(2, '0');
  const durationSeconds = String(Math.floor(duration % 60)).padStart(2, '0');

  return (
    <TimerWrapper>
      {timeMinutes}
      :
      {timeSeconds}
      {' '}
      /
      {durationMinutes}
      :
      {durationSeconds}
    </TimerWrapper>
  );
}

function PlayerComponent() {
  const player : Player = usePlayer();
  const audioRef = useRef<HTMLAudioElement>(null);
  const sourceRef = useRef<HTMLSourceElement>(null)
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(initializeAction());
  }, [dispatch]);

  useEffect(() => {
    if (audioRef.current && sourceRef.current) {
      sourceRef.current.src = player.playingUrl
      audioRef.current.pause();
      audioRef.current.load();
      audioRef.current.currentTime = player.second
      if (player.playing) {
        audioRef.current.play().catch(err => console.log(err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [player.playingUrl]); // TODO: Fix

  useEffect(() => {
    if (player.playingUrl && audioRef.current && !player.playing) {
      audioRef.current.currentTime = player.second;
    }
  }, [player.second]);

  useEffect(() => {
    if (player.playingUrl && audioRef.current) {
      if (player.playing) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    }
  }, [player.playing]);

  useEffect(() => {
    if (audioRef.current && audioRef.current.duration) {
      dispatch(setDurationAction(audioRef.current.duration));
    }

  }, [audioRef.current?.duration])

  const handlePlay = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (player.playing) {
      player.pause();
    } else {
      player.resume();
    }
  };

  const onPlaying = (event: React.ChangeEvent<HTMLAudioElement>) => {
    dispatch(updateAction(event.target.currentTime));
  };

  const onChangeTime = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (audioRef && audioRef.current) {
      audioRef.current.currentTime = event.target.valueAsNumber;
      dispatch(updateAction(event.target.valueAsNumber));
    }
  };

  return player && (
  <PlayerWrapper>
    <PlayerTitle title={player.item?.title || ''} />
    <InnerPlayerWrapper>
      <PlayButton handlePlay={handlePlay} playing={player.playing} />
      <audio ref={audioRef} onTimeUpdate={onPlaying} preload="metadata">
        <source ref={sourceRef} src={player.playingUrl} />
      </audio>
      {(player && audioRef.current)
        ? (
          <>
            <SliderWrapper>
              <Slider
                max={(audioRef.current && audioRef.current.duration) || 0}
                value={player.second}
                onChange={onChangeTime}
              />
            </SliderWrapper>

            <Timer time={player.second} duration={player.duration} />
          </>
        )
        : false}

    </InnerPlayerWrapper>
  </PlayerWrapper>
  );
}

export default PlayerComponent;
