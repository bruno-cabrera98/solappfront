
interface AudioItem {
    id: number,
    icon_url: string,
    date: string,
    length: string,
    title: string,
    img_url: string,
}

type DownloadState = 'downloading' | 'downloaded' | 'notDownloaded'

interface DownloadAudioItem {
    id: number,
    downloadState: DownloadState,
}

interface ApiContenido {
    id: string,
    titulo:	string,
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
    programa: ApiPrograma,
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

function contenidoToAudioItem(contenido : ApiContenido) : AudioItem {
    return {
        id: parseInt(contenido.id),
        icon_url: contenido.programa.icon,
        date: contenido.fechaEmision_dmy,
        length: contenido.duracion,
        title: contenido.titulo,
        img_url: contenido.media.img_894x503,
    }
}