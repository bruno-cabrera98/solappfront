import axios from "axios";
const url = process.env.REACT_APP_API_URL || 'https://del-sol-app.herokuapp.com/'

const getAudioSection = async (program, section, page) => {
    console.log(url)
    return await axios.get(url + `programas/${program}/${section}/contenido/${page}`, {
        mode: 'no-cors'
    })
}

const getAudio = async (id) => {
    return await axios.get(url + `audio/${id}`, {
        responseType: 'blob',
    })
}

const getProgramas = async () => {
    return await axios.get(url+'programas')
}

const getProgram = async (id) => {
    return await axios.get(url+`programas/${id}`)
}

export default { getAudioSection, getAudio, getProgramas, getProgram }