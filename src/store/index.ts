import { configureStore } from "@reduxjs/toolkit";
import desktopReducer from "./features/desktop/desktopSlice";
import themeReducer from "./features/theme/themeSlice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      desktop: desktopReducer,
      theme: themeReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
