import {useSelector} from "react-redux";
import ProgramCard from "../components/stateless/ProgramCard";
import styled from "styled-components";

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: auto auto auto;
  max-width: 1080px;
  margin: 50px auto;
  justify-content: space-evenly;
  margin-bottom: 100px;
  @media (max-width: 1000px) {
    grid-template-columns: auto auto;
  }
  @media (max-width: 640px) {
    grid-template-columns: auto;
  }
  
`

const ProgramList = () => {
    const programs = useSelector(state => state.programs)
    console.log(programs)
    return programs &&
        <CardContainer>
            {programs
                .filter(program => program.publicar)
                .map(program =>
                <ProgramCard key={program.id} program={program}/>
            )}
        </CardContainer>
}

export default ProgramList