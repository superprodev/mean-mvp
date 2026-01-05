// src/app/redux/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import { storage } from './storage'; // localStorage

import authReducer from './auth-slice';
import adminReducer from './admin-slice';
import chatReducer from './chat-slice';

const rootReducer = combineReducers({
  auth: authReducer,
  settings: adminReducer,
  chat: chatReducer,
});

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'admin'], // only persist these slices
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env['NODE_ENV'] !== 'production',
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // redux-persist dispatches non-serializable actions; ignore them
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
