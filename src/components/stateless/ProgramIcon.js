import styled, {css, keyframes} from "styled-components";

const skeletonAnimation = keyframes`
  from {
    opacity: 30%;
  }
  to {
    opacity: 100%;
  }
`

const ProgramIcon = styled.div`
  height: 40px;
  min-height: 40px;
  width: 40px;
  min-width: 40px;
  margin: 10px;
  ${({small}) => small ? css`
    height: 30px;
    min-height: 30px;
    width: 30px;
    min-width: 30px;
    margin: 5px;
  ` : ''
  }
  ${({mini}) => mini ? css`
    height: 15px;
    min-height: 15px;
    width: 15px;
    min-width: 15px;
    margin: 5px;
  ` : ''
  }
  ${({skeleton, icon}) => skeleton ? css`
    background: rgba(255,255,255,.4);
    border-radius: 2px;
    animation-duration: 1s;
    animation-name:  ${skeletonAnimation};
    animation-direction: alternate;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
  ` : css`
    background-image: url(${icon || ''});
  `}
  display: inline-block;
  
  background-repeat: no-repeat;
  background-size: contain;
`

export default ProgramIcon