import axios from "axios";
import {db} from "../db";

const url = process.env.REACT_APP_API_URL || 'https://del-sol-app.herokuapp.com/'

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

const getAudioSection = async (
    program : string,
    section : string,
    page : number
) : Promise<AudioItem[]> => {
    return axios.get(url + `programas/${program}/${section}/contenido/${page}`)
        .then(
            res => db.audios.orderBy('id').keys()
                .then(keys => {
                    const contenidos : ApiContenido[] = res.data.records
                    return contenidos.map(
                        contenido => {
                            return contenidoToAudioItem(contenido)
                        }
                    )
                })
        )
}

const getAudio = async (id : number) => {
    return await axios.get(url + `audio/${id}`, {
        responseType: 'blob',
    })
}

function ApiProgramaItemToProgram(apiProgram: ApiProgramaItem) : Program {
    return {
        id: apiProgram.id,
        name: apiProgram.nombre,
        sections:[],
        icon_url: apiProgram.icon,
        img_url: apiProgram.img_894,
        published: apiProgram.publicar
    }
}

const getProgramas = async () : Promise<Program[]> => {
    return await axios.get(url+'programas').then(
        res => {
            const apiPrograms : ApiProgramaItem[] = res.data.programas
            return apiPrograms.map(apiProgram => ApiProgramaItemToProgram(apiProgram))
        }
    )
}

function ApiProgramaToProgram(apiPrograma : ApiPrograma) {
    const program : Program = ApiProgramaItemToProgram(apiPrograma.record)

    program.sections = apiPrograma.secciones.map(apiSeccion => ({
        id: apiSeccion.id,
        name: apiSeccion.nombre,
        content: [contenidoToAudioItem(apiSeccion.contenido)]
    }))
    return program
}

const getProgram = async (id : string) => {
    return await axios.get(url+`programas/${id}`).then(
        res => {
            const apiPrograma : ApiPrograma = res.data
            return ApiProgramaToProgram(apiPrograma)
        }
    )
}

export default { getAudioSection, getAudio, getProgramas, getProgram }