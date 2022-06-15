import {ApiSeccion, apiSectionToSection, ISection} from './ISection';

export interface IProgram {
    id: string,
    name: string,
    sections: ISection[],
    icon_url: string,
    img_url: string,
    published: boolean,
}

export function ApiProgramaItemToProgram(apiProgramaItem: ApiProgramaItem) : IProgram {
    const program : IProgram = {
        id: apiProgramaItem.id,
        name: apiProgramaItem.nombre,
        sections: [],
        icon_url: apiProgramaItem.icon,
        img_url: apiProgramaItem.img_894,
        published: apiProgramaItem.publicar,
    }
    return program
}

export function ProgramFromApiProgram(apiProgram: ApiPrograma) {
  const program: IProgram = ApiProgramaItemToProgram(apiProgram.record);
  program.sections = apiProgram.secciones.map((sec) => apiSectionToSection(sec));
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
