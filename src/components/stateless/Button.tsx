import styled, { css } from 'styled-components';

const Button = styled.button<{ greyed?: boolean }>`
  border: none;
  border-radius: 3px;
  font-weight: 700;
  font-size: 14px;
  line-height: 40px;
  font-family: "Raleway", sans-serif;
  color: rgba(255,255,255,0.91);
  text-transform: uppercase;
  display: inline-block;
  height: 40px;
  width: 40px;
  margin: 10px 0 0 10px;
  padding: 0 10px 0 10px;
  background: #e86215;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  :hover {
    background-image: -moz-linear-gradient(67deg, #e8154a 0%, #e87630 45%, #e8d615 100%);
    background-image: -webkit-linear-gradient(67deg, #e8154a 0%, #e87630 45%, #e8d615 100%);
    background-image: -ms-linear-gradient(67deg, #e8154a 0%, #e87630 45%, #e8d615 100%);
    box-shadow: 0 0 15px rgba(0,0,0,0.71);
  }
  ${(props) => (props.greyed ? css`
    background: #7d4f32;

    cursor: auto;

    :hover {
      background-image: none;

    }
  ` : css``)}
`;

const RoundButton = styled.button`
  font-family: "delsol",serif !important;
  font-style: normal !important;
  font-weight: normal !important;
  font-variant: normal !important;
  text-transform: none !important;
  speak: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
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
`;

export { RoundButton, Button };
