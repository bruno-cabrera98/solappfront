import styled from "styled-components";
import ProgramIcon from "./ProgramIcon";
import ProgramName from "./ProgramName";
import {Link} from "react-router-dom";

const ProgramCardContainer = styled.div`
  width: 300px;
  border-radius: 10px;
  border: #e86215 solid 1px;
  overflow: hidden;
  margin-bottom: 40px;
  box-sizing: border-box;
`

const CardTitle = styled.div`
  height: 60px;
  background: #08010f;
  box-shadow: 0 -4px 5px 4px #08010f;
  z-index: 1;
  position: relative;
  text-decoration: none;
`

const CardImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`


const ProgramCard = ({program}) => {

    return (
        <Link to={`/programs/${program.id}`} style={{ textDecoration: 'none' }}>
            <ProgramCardContainer>
                <CardTitle>
                    <ProgramName>
                        <ProgramIcon icon={program.icon}/>
                        {program.nombre}
                    </ProgramName>
                </CardTitle>
                <CardImage src={program.img_360}/>
            </ProgramCardContainer>
        </Link>
    )
}

export default ProgramCard