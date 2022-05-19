import axios from "axios";
import {db} from "../db";
const url = process.env.REACT_APP_API_URL || 'https://del-sol-app.herokuapp.com/'

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
                            const item = contenidoToAudioItem(contenido)
                            item.downloaded = keys.includes(item.id)
                            return item
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

const getProgramas = async () => {
    return await axios.get(url+'programas')
}

const getProgram = async (id : string) => {
    return await axios.get(url+`programas/${id}`)
}

export default { getAudioSection, getAudio, getProgramas, getProgram }