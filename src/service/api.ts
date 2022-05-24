import axios from 'axios';
import { ApiContenido, AudioItem, IAudioItem } from '../types/IAudioItem';
import {
  ApiPrograma, ApiProgramaItem, IProgram, Program, ProgramFromApiProgram,
} from '../types/IProgram';

const url = process.env.REACT_APP_API_URL || 'https://del-sol-app.herokuapp.com/';

const getAudioSection = async (
  program: string,
  section: string,
  page: number,
): Promise<IAudioItem[]> => axios.get(`${url}programas/${program}/${section}/contenido/${page}`)
  .then(
    (res) => {
      const contenidos: ApiContenido[] = res.data.records;
      return contenidos.map(
        (contenido) => new AudioItem(contenido),
      );
    },
  );

const getAudio = async (id: number) => axios.get(`${url}audio/${id}`, {
  responseType: 'blob',
});

const getProgramas = async (): Promise<IProgram[]> => axios.get(`${url}programas`).then(
  (res) => {
    const apiPrograms: ApiProgramaItem[] = res.data.programas;
    return apiPrograms.map((apiProgram) => new Program(apiProgram));
  },
);

const getProgram = async (id: string) => await axios.get(`${url}programas/${id}`).then(
  (res) => {
    const apiPrograma: ApiPrograma = res.data;
    return ProgramFromApiProgram(apiPrograma);
  },
);

export default {
  getAudioSection, getAudio, getProgramas, getProgram,
};
