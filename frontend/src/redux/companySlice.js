import { createSlice } from "@reduxjs/toolkit";


const initialState = {

    singleCompany :null,
    companies:[],
    searchCompanyByText: "",
    loading:false
}

const companySlice = createSlice({
    name :"company",
    initialState,
    reducers:{

        setSingleCompany : (state,action) =>{

            state.singleCompany = action.payload

        },

        setCompanies : (state,action) => {
            state.companies = action.payload
        },
        setSearchCompanyByText : (state,action) => {
            state.searchCompanyByText = action.payload
        },
        setLoading : (state,action) => {
            state.loading = action.payload
        }
    }
})

export const {setSingleCompany,setCompanies,setSearchCompanyByText,setLoading} = companySlice.actions
export default companySlice.reducer

    