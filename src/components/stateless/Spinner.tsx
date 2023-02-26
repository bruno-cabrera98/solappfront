import { findIconDefinition, IconDefinition, library } from '@fortawesome/fontawesome-svg-core';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

library.add(faSpinner);

const spinAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

const StyledSpinner = styled.span`
  animation-name: ${spinAnimation};
  animation-duration: .5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  display: inline-block;
  line-height: 0;
`;

const FaSpinnerIcon: IconDefinition = findIconDefinition({ prefix: 'fas', iconName: 'spinner' });
function Spinner({ percentage = 100 }: { percentage: number }) {
  return <StyledSpinner><FontAwesomeIcon icon={FaSpinnerIcon} /></StyledSpinner>;
}

export default Spinner;
