import {ApiContenido, apiContenidoToAudioItem, IAudioItem} from './IAudioItem';

export interface ISection {
    id: string,
    programId: string,
    name: string,
    content: IAudioItem[]
}

export interface ApiSeccion {
    id: string,
    nombre: string,
    orden: number,
    contenido: ApiContenido
}

export function apiSectionToSection(apiSeccion: ApiSeccion, programId : string) : ISection {
    return {
        id: apiSeccion.id,
        programId: programId,
        name: apiSeccion.nombre,
        content: [apiContenidoToAudioItem(apiSeccion.contenido)],
    }
}
