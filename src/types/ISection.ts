import { ApiContenido, AudioItem, IAudioItem } from './IAudioItem';

export interface ISection {
    id: string,
    name: string,
    content: IAudioItem[]
}

export class Section implements ISection {
  id: string;

  name: string;

  content: IAudioItem[];

  constructor(apiSeccion: ApiSeccion) {
    this.id = apiSeccion.id;
    this.name = apiSeccion.nombre;
    this.content = [new AudioItem(apiSeccion.contenido)];
  }
}

export interface ApiSeccion {
    id: string,
    nombre: string,
    orden: number,
    contenido: ApiContenido
}
