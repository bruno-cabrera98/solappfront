import {AnyAction, createSlice, PayloadAction, ThunkAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {IProgram} from "../types/IProgram";

const initialState: IProgram[] = []

const programsSlice = createSlice({
    name: 'programs',
    initialState: initialState,
    reducers: {
        init(state, action: PayloadAction<IProgram[]>) {
            return action.payload
        },
    }
})

const {init} = programsSlice.actions

export default programsSlice.reducer

export const initAction = (programs: IProgram[]): ThunkAction<void, RootState, unknown, AnyAction> => {
    return async (dispatch) => {
        dispatch(init(programs))
    }
}

export const selectPrograms = () => (state: RootState) => {
    return state.programs
}

export const selectProgramIds = () => (state: RootState) => {
    return state.programs.map( ({id}) => id )
}