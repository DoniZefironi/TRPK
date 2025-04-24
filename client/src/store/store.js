import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import userReducer from './slice/userSlice';
import materialReducer from './slice/materialSlice';
import sectionReducer from './slice/sectionSlice';
import forumReducer from './slice/forumSlice';
import groupReducer from './slice/groupSlice';
import lectureReducer from './slice/lectureSlice';
import projectReducer from './slice/projectSlice';
import journalReducer from './slice/journalSlice';
import competitionReducer from './slice/competitionSlice';
import electiveInformaticsReducer from './slice/electiveInformaticsSlice'

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        materials: materialReducer,
        sections: sectionReducer,
        forum: forumReducer,
        groups: groupReducer,
        lessons: lectureReducer,
        projects: projectReducer,
        journal: journalReducer,
        competitions: competitionReducer,
        electives: electiveInformaticsReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export default store;