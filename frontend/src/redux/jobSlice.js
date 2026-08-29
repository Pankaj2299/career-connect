import { createSlice } from "@reduxjs/toolkit";

const initialState ={

    allJobs: [],
    allRecruiterJobs:[],
    singleJob :null,
    loading:false,
    searchJobByText: "",
    allAppliedJobs:[],
    searchedQuery: ""

}

const jobSlice = createSlice({
    name:"job",
    initialState,
    reducers:{

        SetAllJobs : (state,action) => {

            state.allJobs= action.payload
        },

        SetSingleJob : (state,action) => {

            state.singleJob = action.payload
        },

        SetLoading: (state,action) => {
            state.loading = action.payload

        },
        SetAllRecruiterJobs: (state,action) => {
            state.allRecruiterJobs = action.payload
        },
        SetSearchJobByText : (state,action) => {
            state.searchJobByText = action.payload
        },
        SetAllAppliedJobs : (state,action) => {
            state.allAppliedJobs = action.payload
        },
        SetSearchedQuery : (state,action) => {
            state.searchedQuery = action.payload
        }
        
    }

    
})

export const {SetAllJobs,SetSingleJob,SetLoading,SetAllRecruiterJobs,SetSearchJobByText,SetAllAppliedJobs,SetSearchedQuery} = jobSlice.actions
export default jobSlice.reducer