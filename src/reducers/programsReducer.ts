import {AnyAction, createSlice, ThunkAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

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
        },
        unlinkSectionAudios(state, action) {
            const {id, sectionId} = action.payload
            const program = state.find(program => program.id === id)
            const section = program && program.sections && program.sections.find(section => section.id === sectionId)
            if (section) {
                section.contenido = []
            }
        }

    }
})

const {init, setSection, setSectionAudios, unlinkSectionAudios} = programsSlice.actions

export default programsSlice.reducer

export const initAction = (programs : any) : ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(init(programs))
    }
}

export const setSectionAction = (id : string, sections : any) : ThunkAction<void, RootState, unknown, AnyAction> => {
    return (dispatch) => {
        dispatch(setSection({id, sections}))
    }
}

export const setSectionAudiosAction = (id : string, sectionId : string, audioList : any) : ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(setSectionAudios({id, sectionId, audioList}))
    }
}

export const unlinkSectionAudiosAction = (id : string, sectionId : string) : ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(unlinkSectionAudios({id, sectionId}))
    }
}