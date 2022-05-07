import {useEffect, useRef } from "react";
import {useDispatch} from "react-redux";
import {initializeAction, updateAction} from "../reducers/playerReducer";
import styled from "styled-components";
import Slider from "./stateless/Slider";
import PlayerTitle from "./stateless/PlayerTitle";
import PlayButton from "./stateless/PlayButton";
import usePlayer from "../hooks/usePlayer";

const PlayerWrapper = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  -webkit-transition: all 0.3s ease-in-out;
  box-shadow: 0 10px 20px 10px rgb(8, 1, 15);
  transition: all 0.3s ease-in-out;
  background-color: #08010f;
  border-top: 1px solid ${props => props.theme.purple};
  box-sizing: border-box;
  flex-direction: column;
  width: 100%;
  z-index: 1000;
`

const InnerPlayerWrapper = styled.div`
  display: flex;
  padding: 5px 10px;
  width: 100%;
  align-items: center;
  box-sizing: border-box;
`

const TimerWrapper = styled.div`
  font-family: Raleway, sans-serif;
  display: flex;
  color: white;
  background-image: linear-gradient(67deg,#e8154a 0%,#e87630 45%,#e8d615 100%);
  padding: 5px;
  border-radius: 10px;
  margin-left: 5px;
  font-weight: 500;
`

const SliderWrapper = styled.div`
  margin-left: 10px;
  width: auto;
  flex-grow: 1;
`

const Timer = ({time, duration}) => {
    const timeMinutes = String(Math.floor(time / 60)).padStart(2, '0')
    const timeSeconds = String(Math.floor(time % 60)).padStart(2, '0')
    const durationMinutes = String(Math.floor(duration / 60)).padStart(2, '0')
    const durationSeconds = String(Math.floor(duration % 60)).padStart(2, '0')

    return <TimerWrapper>
        {timeMinutes}:{timeSeconds} / {durationMinutes}:{durationSeconds}
    </TimerWrapper>
}

const Player = () => {
    const player = usePlayer()
    const audioRef = useRef()
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(initializeAction())
    }, [])

    useEffect(() => {
        if(player.playingUrl && audioRef.current){
            audioRef.current.pause();
            audioRef.current.load();
            if (player.playing) {
                audioRef.current.play()
            } else {
                audioRef.current.pause()
            }
        }
    }, [player.playingUrl])

    useEffect(() => {
        if(player.playingUrl && audioRef.current && !player.playing) {
            audioRef.current.currentTime = player.second
        }
    }, [player.second])

    useEffect(() => {
        if(player.playingUrl && audioRef.current) {
            if (player.playing) {
                audioRef.current.play()
            } else {
                audioRef.current.pause()
            }
        }
    }, [player.playing])

    const handlePlay = (event) => {
        event.preventDefault()
        if (player.playing) {
            player.pause()
        } else {
            player.resume()
        }
    }

    const onPlaying = (event) => {
        dispatch(updateAction(event.target.currentTime))
    }

    const onChangeTime = (event) => {
        audioRef.current.currentTime = event.target.value
        dispatch(updateAction(event.target.value))
    }

    return player && <PlayerWrapper>
        <PlayerTitle title={player.audioTitle}/>
        <InnerPlayerWrapper>
            <PlayButton handlePlay={handlePlay} playing={player.playing}/>
            <audio ref={audioRef} onTimeUpdate={onPlaying}>
                <source src={player.playingUrl}/>
            </audio>
            {player && audioRef.current?
                <><SliderWrapper>
                    <Slider
                        max={(audioRef.current && audioRef.current.duration) || 0}
                        value={player.second}
                        onChange={onChangeTime}
                    />
                </SliderWrapper>

                    <Timer time={player.second} duration={audioRef.current.duration}/>
                </>
                : false
            }

        </InnerPlayerWrapper>
    </PlayerWrapper>
}


export default Player