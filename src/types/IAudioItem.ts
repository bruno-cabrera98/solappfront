import {ApiProgramaItem} from './IProgram';
import {ApiSeccion} from './ISection';

export interface IAudioItem {
    id: number,
    iconUrl: string,
    date: string,
    length: string,
    title: string,
    summary: string,
    imgUrl: string,
}

export type DownloadState = 'downloading' | 'downloaded' | 'notDownloaded'

export interface DownloadAudioItem {
    id: number,
    downloadState: DownloadState,
    percentage: number,
}

export interface ApiContenido {
    id: string,
    titulo: string,
    resumen: string,
    tipoContenido: string,
    url: string,
    urlShort: string,
    fechaEmision_full: string,
    codigoExtra: string,
    duracion: string,
    nombre_estado: string,
    fechaEmision_dmy: string,
    url_programa_id: string
    url_subprograma_id: string
    programa: ApiProgramaItem,
    seccion: ApiSeccion,
    media: {
        titulo: string,
        autor: string,
        descripcion: string,
        img_base: string,
        img_360x360: string,
        img_894x503: string,
        img_320X180: string,
        imagenPie: string,
    },
    source_mp3: string,
    duracion_mp3: string,
    source_video: string,
    url_name: string,
}


export function apiContenidoToAudioItem(apiContenido: ApiContenido) : IAudioItem {
    return {
        id: parseInt(apiContenido.id, 10),
        iconUrl: apiContenido.programa.icon,
        date: apiContenido.fechaEmision_dmy,
        length: apiContenido.duracion_mp3,
        title: apiContenido.titulo,
        imgUrl: apiContenido.media.img_894x503,
        summary: apiContenido.resumen,
    }
}
