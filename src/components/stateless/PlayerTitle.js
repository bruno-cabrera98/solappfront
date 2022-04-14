import styled, {keyframes} from "styled-components";

const PlayerTitleWrapper = styled.div`
  width: 100%;
  background-color: #0f031c;
  width: 100%;
  padding: 4px 0;
  height: 14px;
  box-shadow: 0 10px 5px -10px black;
`

const slidingText = keyframes`
  0% { left: -100%; }
  100% { left: 100%; }
`

const inverseSlidingText = keyframes`
  0% { left: -100%; }
  100% { left: 100%; }
`

const MovingTitle = styled.div`
  font-weight: 700;
  display: block;
  position: absolute;
  color: white;
  font-size: 12px;
  font-family: "Raleway", sans-serif;
  animation-name: ${({inverse}) => inverse ? inverseSlidingText : slidingText};
  animation-duration: 30s;
  animation-delay: ${({inverse}) => inverse ? '0' : '-15s'};
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  float: left;
  width: 100%;
  text-overflow: ellipsis;overflow:hidden;white-space:nowrap;
  text-align: center;
`

const PlayerTitle = ({title}) => {
    return <PlayerTitleWrapper>
        <MovingTitle >{title}</MovingTitle>
        <MovingTitle inverse>{title}</MovingTitle>
    </PlayerTitleWrapper>
}

export default PlayerTitle