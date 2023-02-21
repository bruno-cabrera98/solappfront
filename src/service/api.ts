import axios from 'axios';
import {ApiContenido, apiContenidoToAudioItem, IAudioItem} from '../types/IAudioItem';
import {
    ApiPrograma, ApiProgramaItem, ApiProgramaItemToProgram, IProgram, ProgramFromApiProgram,
} from '../types/IProgram';

const url = process.env.REACT_APP_API_URL || 'http://134.209.131.242:3001/';

const getAudioSection = async (
    program: string,
    section: string,
    page: number,
): Promise<IAudioItem[]> => axios.get(`${url}programas/${program}/${section}/contenido/${page}`)
    .then(
        (res) => {
            const contenidos: ApiContenido[] = res.data.records;
            return contenidos.map(
                (contenido) => apiContenidoToAudioItem(contenido),
            );
        },
    );

const getAudio = async (id: number) => axios.get(`${url}audio/${id}`, {
    responseType: 'blob',
});

const getProgramas = async (): Promise<IProgram[]> => axios.get(`${url}programas`).then(
    (res) => {
        const apiPrograms: ApiProgramaItem[] = res.data.programas;

        // Filter out repeated programs
        // The api SUCKS
        const filteredApiPrograms = apiPrograms.reduce((uniquePrograms: ApiProgramaItem[], currentProgram: ApiProgramaItem) => {
            if (!uniquePrograms.some((program) => program.id === currentProgram.id)) {
                uniquePrograms.push(currentProgram);
            }
            return uniquePrograms;
        }, []);

        return filteredApiPrograms.map((apiProgram) => ApiProgramaItemToProgram(apiProgram));
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
