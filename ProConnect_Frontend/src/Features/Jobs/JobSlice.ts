import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Job } from "../../Models/Job"

export interface JobInitialState {
    jobs: Job[],
    selectedJob: Job | null
}
const initialState: JobInitialState = {
    jobs: [],
    selectedJob: null
}

export const jobSlice = createSlice({
    name: 'job',
    initialState,
    reducers: {
        addJob: (state, action: PayloadAction<Job>) => {
            state.jobs = [...state.jobs, action.payload]
        },
        removeJob: (state, action: PayloadAction<Job>) => {
            state.jobs = state.jobs.filter(job => job.id !== action.payload.id)
        },
        selectJob: (state, action: PayloadAction<Job | null>) => {
            state.selectedJob =  action.payload
        },
    },
    selectors:{
        getSelectedJob: (state) =>{
            return state.selectedJob;
        },
        getJobs: (state) =>{
            return state.jobs;
        }
    },
})

// Part 4
export const { addJob, removeJob, selectJob } = jobSlice.actions
export const { getSelectedJob, getJobs } = jobSlice.selectors
export default jobSlice.reducer
