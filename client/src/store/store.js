import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import userReducer from './slice/userSlice';
import materialReducer from './slice/materialSlice';
import forumReducer from './slice/forumSlice';
import groupReducer from './slice/groupSlice';
import lectureReducer from './slice/lectureSlice';
import projectReducer from './slice/projectSlice';
import journalReducer from './slice/journalSlice';
import competitionReducer from './slice/competitionSlice';
import electiveInformaticsReducer from './slice/electiveInformaticsSlice';
import careerGuidanceReducer from './slice/careerGuidanceSlice';
import scheduleReducer from './slice/scheduleSlice'

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    materials: materialReducer,
    groups: groupReducer,
    lessons: lectureReducer,
    projects: projectReducer,
    journal: journalReducer,
    competitions: competitionReducer,
    electives: electiveInformaticsReducer,
    careerGuidance: careerGuidanceReducer,
    schedule: scheduleReducer,
    forum: forumReducer,
    // section: sectionReducer,
    // topic: topicReducer,
    // post: postReducer,
  },
});

export default store;