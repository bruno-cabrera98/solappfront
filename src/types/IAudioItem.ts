import { ApiProgramaItem } from './IProgram';
import { ApiSeccion } from './ISection';

export interface IAudioItem {
    id: number,
    iconUrl: string,
    date: string,
    length: string,
    title: string,
    imgUrl: string,
}

export class AudioItem implements IAudioItem {
  public id: number;

  public iconUrl: string;

  public date: string;

  public length: string;

  public title: string;

  public imgUrl: string;

  constructor(apiContenido: ApiContenido) {
    this.id = parseInt(apiContenido.id, 10);
    this.iconUrl = apiContenido.programa.icon;
    this.date = apiContenido.fechaEmision_dmy;
    this.length = apiContenido.duracion_mp3;
    this.title = apiContenido.titulo;
    this.imgUrl = apiContenido.media.img_894x503;
  }
}

export type DownloadState = 'downloading' | 'downloaded' | 'notDownloaded'

export interface DownloadAudioItem {
    id: number,
    downloadState: DownloadState,
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
