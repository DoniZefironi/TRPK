import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import userReducer from './slice/userSlice';
import materialReducer from './slice/materialSlice';
import sectionReducer from './slice/sectionSlice';
import forumReducer from './slice/forumSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        materials: materialReducer,
        sections: sectionReducer,
        forum: forumReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({ serializableCheck: false }),
});

export default store;