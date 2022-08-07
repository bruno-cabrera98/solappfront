import { useParams } from 'react-router';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import api from '../service/api';
import { selectProgramIds } from '../reducers/programsReducer';
import { selectSections, setSectionsAction } from '../reducers/programSectionReducer'
import ProgramSection from '../components/ProgramSection';
import { H1 } from '../components/stateless/Atoms/Fonts';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { IProgram } from '../types/IProgram';
import {transformUrl} from "../utils/utils";

const ProgramBannerWrapper = styled.div`
  position: absolute;
  z-index: 0;
  min-height: 1%;
  width: 100%;
`;

const ImgBanner = styled.img`
  top:0;
  opacity: 50%;
  margin: auto;
  background:linear-gradient(#0000 0%,#03031c 85%);
  display: block;
  max-width: 894px;
  width: 100%;
`;

const ImgBannerCover = styled.div`
  width: 100%;
  top:0;
  position: absolute;
  height: 100%;
  background:linear-gradient(#0000 0%,#03031c 85%);
  z-index: 3;
`;

function ProgramBanner({ program } : {program: IProgram}) {
  return (
    <ProgramBannerWrapper>
      <ImgBannerCover />
      <ImgBanner src={transformUrl(program.img_url)} />
    </ProgramBannerWrapper>
  );
}

const Title = styled(H1)`
    color: ${(props) => props.theme.fontWhite}
`;

function ProgramPage() {
  const { id } = useParams();
  const [program, setProgram] = useState<undefined | IProgram>(undefined);

  const sections = useAppSelector(selectSections(id));
  const programs = useAppSelector(selectProgramIds());
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      api.getProgram(id)
        .then((programItem) => {
          setProgram(programItem);
          dispatch(setSectionsAction(programItem.sections));
        });
    }
  }, [id]);

  return program ? (
    <div style={{ position: 'relative' }}>
      <ProgramBanner program={program} />
      <Title>{program.name}</Title>
      {id && sections.map((sec) => (
        <ProgramSection
          key={sec.id}
          programId={id}
          sec={sec}
        />
      ))}
      <footer style={{ height: '100px' }} />
    </div>
  )
    : <div />;
}

export default ProgramPage;
