import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  projects: [],
  contractorInventory: [],
  projectsProgress: [],
  attendances: [],
  workersCount: 0,
};

const projectSlice = createSlice({
  name: 'projects',
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    setContractorInventory: (state, action) => {
      state.contractorInventory = action.payload;
    },
    setProjectsProgress: (state, action) => {
      state.projectsProgress = action.payload;
    },
    setAttendances: (state, action) => {
      state.attendances = action.payload;
    },
    setWorkerrCount: (state, action) => {
      state.workersCount = action.payload;
    },
    resetProjectsData: (state) => {
      return initialState;
    },
  },
});

export const { 
  setProjects, 
  setContractorInventory, 
  setProjectsProgress, 
  setAttendances,
  setWorkerrCount,
  resetProjectsData 
} = projectSlice.actions;

export default projectSlice.reducer;
