import axios from "axios";
const url = process.env.REACT_APP_API_URL || ''

const getDarwin = async (page) => {
    console.log(url)
    return await axios.get(url + `programas/ntn/darwincolumna/contenido/${page}`, {
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

export default { getDarwin, getAudio, getProgramas, getProgram }