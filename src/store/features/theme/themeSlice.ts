import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeName, themes } from "./themes";

interface ThemeState {
  mode: "light" | "dark";
  color: string;
  desktopBackground: string;
  desktopBackgroundBlurDataURL: string;
}

const initialState: ThemeState = {
  mode: "dark",
  color: themes.default.dark.color,
  desktopBackground: themes.default.dark.desktopBackground,
  desktopBackgroundBlurDataURL:
    themes.default.dark.desktopBackgroundBlurDataURL,
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    changeTheme: (
      state,
      action: PayloadAction<{
        theme: ThemeName;
        mode: "light" | "dark";
      }>
    ) => {
      const { theme, mode } = action.payload;

      if (!themes[theme]) {
        throw new Error(`Theme "${theme}" not found.`);
      }

      if (!themes[theme][mode]) {
        throw new Error(`Mode "${mode}" not found for theme "${theme}".`);
      }

      state.mode = mode;
      state.color = themes[theme][mode].color;
      state.desktopBackground = themes[theme][mode].desktopBackground;
      state.desktopBackgroundBlurDataURL =
        themes[theme][mode].desktopBackgroundBlurDataURL;
    },
  },
});

export const { changeTheme } = themeSlice.actions;
export default themeSlice.reducer;
