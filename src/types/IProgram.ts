import { ApiSeccion, ISection, Section } from './ISection';

export interface IProgram {
    id: string,
    name: string,
    sections: ISection[],
    icon_url: string,
    img_url: string,
    published: boolean,
}

export class Program implements IProgram {
  id: string;

  name: string;

  sections: ISection[];

  icon_url: string;

  img_url: string;

  published: boolean;

  constructor(apiProgramaItem: ApiProgramaItem) {
    this.id = apiProgramaItem.id;
    this.name = apiProgramaItem.nombre;
    this.sections = [];
    this.icon_url = apiProgramaItem.icon;
    this.img_url = apiProgramaItem.img_894;
    this.published = apiProgramaItem.publicar;
  }
}

export function ProgramFromApiProgram(apiProgram: ApiPrograma) {
  const program: IProgram = new Program(apiProgram.record);
  program.sections = apiProgram.secciones.map((sec) => new Section(sec));
  return program;
}

export interface ApiProgramaItem {
    id: string,
    nombre: string,
    img_360: string,
    img_894: string,
    img_mini: string,
    icon: string,
    'icon-mini': string,
    publicar: boolean,
    url: string,
    episodios: boolean,
    staff: [{ rol: string, nombre: string }],
    facebook: string,
    twitter: string,
    instagram: string,
    messenger: string,
    telefono: string,
    whatsapp: string,
    correo: string
}

export interface ApiPrograma {
    record: ApiProgramaItem,
    secciones: ApiSeccion[]
}
