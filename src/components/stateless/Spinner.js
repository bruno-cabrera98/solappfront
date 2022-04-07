import {library} from "@fortawesome/fontawesome-svg-core";
import {faSpinner} from "@fortawesome/free-solid-svg-icons";
import styled, { keyframes } from 'styled-components'
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

library.add(faSpinner)

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const StyledSpinner = styled.span`
  animation-name: ${spinAnimation};
  animation-duration: .5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  display: inline-block;
  line-height: 0;
`

const Spinner = () => <StyledSpinner><FontAwesomeIcon icon="fa-solid fa-spinner" size="md"/></StyledSpinner>

export default Spinner