import styled from "styled-components";

const SectionTitle = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  padding: 10px;
  background: linear-gradient(#000000A0 , #00000070 60%, #00000000);
  color: white;
`

const AudioCardTitle = styled.h3`
  font-family: "Raleway", sans-serif;
  font-size: 16px;
  text-shadow: 1px 1px 2px #070c13;
  padding: 0;
  margin: 0;
`

const SectionProgramCard = styled.div`
  display: block;
  height: 200px;
  width: 200px;
  background: url(${({content}) => content.media.img_360x360});
  padding: 10px;
`

const SectionWrapper = styled.div`
  display: flex;
  position: relative;
  background-color: red;
  justify-content: space-between;
  width: 800px;
  margin:  20px auto;
  overflow: hidden;
  border-radius: 10px;
`

const ProgramSection = ({section}) => {
  return section && (
    <SectionWrapper>
      <SectionTitle content={section.contenido}>
        <AudioCardTitle>
          Hola
        </AudioCardTitle>
      </SectionTitle>
      {
        <SectionProgramCard content={section.contenido}>
          <p>{ section.contenido.titulo}</p>
        </SectionProgramCard>
      }

    </SectionWrapper>
  )
}

export default ProgramSection