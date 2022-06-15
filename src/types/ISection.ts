import {ApiContenido, apiContenidoToAudioItem, IAudioItem} from './IAudioItem';

export interface ISection {
    id: string,
    name: string,
    content: IAudioItem[]
}

export interface ApiSeccion {
    id: string,
    nombre: string,
    orden: number,
    contenido: ApiContenido
}

export function apiSectionToSection(apiSeccion: ApiSeccion) : ISection {
    return {
        id: apiSeccion.id,
        name: apiSeccion.nombre,
        content: [apiContenidoToAudioItem(apiSeccion.contenido)],
    }
}
