import styled from "styled-components";

const ProgramIcon = styled.div`
  height: 40px;
  width: 40px;
  margin: 10px;
  background: transparent;
  display: inline-block;
  background-image: url(${({icon}) => icon || ''});
  background-repeat: no-repeat;
  background-size: contain;
`

export default ProgramIcon