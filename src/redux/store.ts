import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./rootReducer";
import rootSaga from "./rootSaga";
import { localStorageMiddleware } from "./middleware/localStorageMiddleware";

const sagaMiddleware = createSagaMiddleware();

const preloadedState = {
  cart: JSON.parse(
    localStorage.getItem("cart") || '{"items":[],"totalDays":0}'
  ),
};

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sagaMiddleware, localStorageMiddleware),
  preloadedState,
});

sagaMiddleware.run(rootSaga);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
