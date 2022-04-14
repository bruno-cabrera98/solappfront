import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import styled from "styled-components";

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

const PlayButton = ({handlePlay, playing}) =>
    <PlayIcon onClick={handlePlay}>
        {
            playing ?
                (<FontAwesomeIcon icon="fa-solid fa-pause" size="xs"/>) :
                (<FontAwesomeIcon icon="fa-solid fa-play" size="xs" style={{marginLeft: '5px'}}/>)
        }
    </PlayIcon>

export default PlayButton