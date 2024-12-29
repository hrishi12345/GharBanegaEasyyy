import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import projectsReducer from './projectSlice';
const store = configureStore({
  reducer: {
    auth: authReducer,
    projects: projectsReducer,
  },
});

export default store;