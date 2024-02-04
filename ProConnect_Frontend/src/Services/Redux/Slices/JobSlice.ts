import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { Job } from "../Api";

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
        setJobs: (state, action: PayloadAction<Job[]>) => {
            state.jobs = action.payload
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

export const { addJob, removeJob, selectJob, setJobs } = jobSlice.actions
export const { getSelectedJob, getJobs } = jobSlice.selectors
export default jobSlice.reducer
