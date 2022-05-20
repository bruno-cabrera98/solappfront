
interface Program {
    id: string,
    name: string,
    sections: Section[],
    icon_url: string,
    img_url: string
}

interface ApiPrograma {
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
    staff: [{rol:string, nombre: string}],
    facebook: string,
    twitter: string,
    instagram: string,
    messenger: string,
    telefono: string,
    whatsapp: string,
    correo: string
}