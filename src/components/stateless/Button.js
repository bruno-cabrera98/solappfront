import styled from "styled-components";

const Button = styled.button`
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
  margin: 10px 0px 0px 10px;
  padding: 0px 10px 0px 10px;
  background: #e86215;
  cursor: pointer;
  transition: all 0.3s ease-in-out;
  :hover {
    background-image: -moz-linear-gradient(67deg, #e8154a 0%, #e87630 45%, #e8d615 100%);
    background-image: -webkit-linear-gradient(67deg, #e8154a 0%, #e87630 45%, #e8d615 100%);
    background-image: -ms-linear-gradient(67deg, #e8154a 0%, #e87630 45%, #e8d615 100%);
    box-shadow: 0px 0px 15px rgba(0,0,0,0.71);
  }
`

export default Button