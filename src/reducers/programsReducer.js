import {createSlice} from "@reduxjs/toolkit";


const programsSlice = createSlice({
    name: 'programs',
    initialState: [],
    reducers: {
        init(state, action) {
            return action.payload
        }
    }
})

const {init} = programsSlice.actions

export default programsSlice.reducer

export const initAction = (programs) => {
    return async (dispatch) => {
        dispatch(init(programs))
    }
}