import { Action, AnyAction, createSlice, PayloadAction, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { IAudioItem } from "../types/IAudioItem";
import { ISection } from "../types/ISection";

const initialState: ISection[] = []

const programSectionSlice = createSlice({
    name: 'sections',
    initialState: initialState,
    reducers: {
        setSection(state, action: PayloadAction<ISection>)
        {
            const section = action.payload
            let foundSection = state.find(sec => sec.id === section.id)
            if (foundSection)
            {
                foundSection = section
            }
            else
            {
                state.push(section)
            }
        },
        setSections(state, action: PayloadAction<ISection[]>)
        {
            const sections = action.payload
            return state.filter(sec => sections.findIndex(newSec => newSec.id === sec.id) === -1).concat(sections)
        },
        setSectionAudios(state, action: PayloadAction<{sectionId: string, audios: IAudioItem[]}>)
        {
            const {sectionId, audios} = action.payload
            const section = state.find(sec => sec.id === sectionId)
            if (section)
            {
                section.content = audios
            }
        }

    }
})

const {setSection, setSections, setSectionAudios} = programSectionSlice.actions

export default programSectionSlice.reducer

export const setSectionAction = (section: ISection): ThunkAction<void, RootState, unknown, AnyAction> => 
{
    return async (dispatch) => {
        dispatch(setSection(section))
    }
}

export const setSectionsAction = (sections: ISection[]): ThunkAction<void, RootState, unknown, AnyAction> => 
{
    return async (dispatch) => {
        dispatch(setSections(sections))
    }
}

export const setSectionAudiosAction = (sectionId: string, audios: IAudioItem[]): ThunkAction<void, RootState, unknown, AnyAction> => 
{
    return async (dispatch) => {
        dispatch(setSectionAudios({sectionId, audios}))
    }
}

export const selectSection = (id : string) => (state: RootState) => 
{
    return state.sections.find(sec => sec.id === id)
}

export const selectSections = (programId: string | undefined) => (state: RootState) => 
{
    return state.sections.filter(sec => sec.programId === programId) || []
}