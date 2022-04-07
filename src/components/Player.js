import {useEffect, useRef } from "react";
import db from "../db";
import {useDispatch, useSelector} from "react-redux";
import {initializeAction, pauseAction, setAudioAction, resumeAction, updateAction} from "../reducers/playerReducer";
import styled from "styled-components";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const PlayIcon = styled.button`
  font-family: "delsol" !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-variant: normal !important;
  text-transform: none !important;
  speak: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  content: "k";
  font-size: 2.25em;
  line-height: 55px;
  color: rgba(255, 255, 255, 0.91);
  width: 55px;
  height: 55px;
  text-align: center;
  display: block;
  border-radius: 50%;
  background-image: linear-gradient(67deg, #e8154a 0%, #e87630 45%, #e8d615 100%);
  -webkit-transition: all 0.6s ease-in-out;
  -moz-transition: all 0.6s ease-in-out;
  -ms-transition: all 0.6s ease-in-out;
  -o-transition: all 0.6s ease-in-out;
  transition: all 0.6s ease-in-out;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.56);
  border: none;
  cursor: pointer;
`

const PlayerWraper = styled.div`
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  height: 60px;
  -webkit-transition: all 0.3s ease-in-out;
  box-shadow: 0 10px 20px 10px rgb(8, 1, 15);
  transition: all 0.3s ease-in-out;
  background-color: #08010f;
  width: 100%;
  align-items: center;
  border-top: 1px solid #28044f;
`

const Player = () => {
    const player = useSelector(state => state.player)
    const audioRef = useRef()
    const dispatch = useDispatch()
    useEffect(() => {
        const timer = setTimeout(
            () => dispatch(updateAction(audioRef.current.currentTime)),
            1000
        )
        return () => clearTimeout(timer);
    });

    useEffect(() => {
        dispatch(initializeAction())
    }, [])

    useEffect(() => {
        if(player.playingUrl && audioRef.current){
            audioRef.current.pause();
            audioRef.current.load();
        }
    }, [player.playingUrl])

    useEffect(() => {
        if(player.playingUrl && audioRef.current && !player.playing) {
            audioRef.current.currentTime = player.second
        }
    }, [player.second])

    const handlePlay = (event) => {
        event.preventDefault()
        if (player.playing) {
            dispatch(pauseAction())
            audioRef.current.pause()
        } else {
            dispatch(resumeAction())
            audioRef.current.play()
        }
    }

    return player && <PlayerWraper>
        <PlayIcon onClick={handlePlay}>
            {
                player.playing ?
                    (<FontAwesomeIcon icon="fa-solid fa-pause" size="xs"/>) :
                    (<FontAwesomeIcon icon="fa-solid fa-play" size="xs" style={{marginLeft: '5px'}}/>)
            }
        </PlayIcon>

        <audio ref={audioRef}>
            <source src={player.playingUrl}/>
        </audio>
    </PlayerWraper>
}


export default Player