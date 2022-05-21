import {AnyAction, createSlice, PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

const initialState : Program[] = []

const programsSlice = createSlice({
    name: 'programs',
    initialState: initialState,
    reducers: {
        init(state, action : PayloadAction<Program[]>) {
            return action.payload
        },
        setSection(state, action : PayloadAction<{ id: string, sections : Section[] }>) {
            const {id, sections} = action.payload
            const program : Program | undefined = state.find(program => program.id === id)
            if (program) {
                program.sections = sections
            }
        },
        setSectionAudios(state, action : PayloadAction<{ id: string, sectionId : string, audios : AudioItem[] }>) {
            const {id, sectionId, audios} = action.payload
            const program = state.find(program => program.id === id)
            const section = program && program.sections.find(section => section.id === sectionId)
            if (section) {
                section.content = audios
            }
        },
        unlinkSectionAudios(state, action : PayloadAction<{ id: string, sectionId : string}>) {
            const {id, sectionId} = action.payload
            const program = state.find((program : Program) => program.id === id)
            const section = program && program.sections && program.sections.find(section => section.id === sectionId)
            if (section) {
                section.content = []
            }
        }

    }
})

const {init, setSection, setSectionAudios, unlinkSectionAudios} = programsSlice.actions

export default programsSlice.reducer

export const initAction = (programs : Program[]) : ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(init(programs))
    }
}

export const setSectionAction = (id : string, sections : Section[]) : ThunkAction<void, RootState, unknown, AnyAction> => {
    return (dispatch) => {
        dispatch(setSection({id, sections}))
    }
}

export const setSectionAudiosAction = (id : string, sectionId : string, audios : AudioItem[]) : ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(setSectionAudios({id, sectionId, audios}))
    }
}

export const unlinkSectionAudiosAction = (id : string, sectionId : string) : ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(unlinkSectionAudios({id, sectionId}))
    }
}

export const selectSections = (programId: string | undefined) => (state: RootState) => {
    const programs = state.programs && state.programs.find(program => program.id === programId)
    return (programs && programs.sections) || []
}

export const selectPrograms = () => (state: RootState) => {
    return state.programs
}