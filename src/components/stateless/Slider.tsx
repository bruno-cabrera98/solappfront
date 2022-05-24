import styled from 'styled-components';

const Slider = styled.input.attrs({ type: 'range' })`
  display: flex;
  align-content: center;
  -webkit-appearance: none;
  margin: 10px 0;
  width: 100%;
  background: none;
  // WK
  // -- Track
  ::-webkit-slider-runnable-track {
    width: 100%;
    height: 10px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 1px 1px 1px #000000;
    background: linear-gradient(67deg, #e8154a 0%, #e87630 45%, #e8d615 100%);
    border-radius: 5px;
    border: 1px solid #000000;
  }
  ::-webkit-slider-thumb {
    box-shadow: 1px 1px 5px #000000;
    border: none;
    height: 30px;
    width: 30px;
    border-radius: 50px;
    background: linear-gradient(67deg, #e8154a 0%, #e87630 45%, #e8d615 100%);
    cursor: pointer;
    -webkit-appearance: none;
    margin-top: -11px;
  }
  // FX
  // -- Track
  ::-moz-range-track {
    width: 100%;
    height: 10px;
    cursor: pointer;
    animate: 0.2s;
    box-shadow: 1px 1px 1px #000000;
    background: linear-gradient(67deg, #e8154a 0%, #e87630 45%, #e8d615 100%);
    border-radius: 5px;
    border: 1px solid #000000;
  }
  ::-moz-range-thumb {
    box-shadow: 1px 1px 5px #000000;
    border: none;
    height: 30px;
    width: 30px;
    border-radius: 50px;
    background: linear-gradient(67deg, #e8154a 0%, #e87630 45%, #e8d615 100%);
    cursor: pointer;
  }
`;

export default Slider;
