import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    applicants:null,
    
}


const applicationSlice = createSlice({
    name:"application",
    initialState,
    reducers:{

        setAllApplicants : (state, action) => {
            state.applicants = action.payload
        },

        updateApplicationStatus: (state, action) => {
            const { applicationId, status } = action.payload;

            const application = state.applicants?.applications?.find(
                (item) => item._id === applicationId
            );

            if (application) {
                application.status = status.toLowerCase();
            }
        },
        
    }
})

export const {setAllApplicants,updateApplicationStatus} = applicationSlice.actions
export default applicationSlice.reducer