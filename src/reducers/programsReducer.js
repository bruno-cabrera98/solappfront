import {createSlice} from "@reduxjs/toolkit";


const programsSlice = createSlice({
    name: 'programs',
    initialState: [],
    reducers: {
        init(state, action) {
            return action.payload
        },
        setSection(state, action) {
            const {id, sections} = action.payload
            const program = state.find(program => program.id === id)
            if (program) {
                program.sections = sections.map(sec => {
                    console.log(sec)
                    sec.contenido = [sec.contenido]
                    return sec
                })
            }
        },
        setSectionAudios(state, action) {
            const {id, sectionId, audioList} = action.payload
            const program = state.find(program => program.id === id)
            const section = program && program.sections.find(section => section.id === sectionId)
            if (section) {
                section.contenido = audioList
            }
        }

    }
})

const {init, setSection, setSectionAudios} = programsSlice.actions

export default programsSlice.reducer

export const initAction = (programs) => {
    return async (dispatch) => {
        dispatch(init(programs))
    }
}

export const setSectionAction = (id, sections) => {
    return async (dispatch) => {
        dispatch(setSection({id, sections}))
    }
}

export const setSectionAudiosAction = (id, sectionId, audioList) => {
    return async (dispatch) => {
        dispatch(setSectionAudios({id, sectionId, audioList}))
    }
}