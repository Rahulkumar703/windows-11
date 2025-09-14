import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DesktopState} from "@/types/desktop";


const initialState: DesktopState = {
    iconSize: "medium",
    sortBy: "name",
    icons: [],
};


const desktopSlice = createSlice({
    name: "desktop",
    initialState,
    reducers: {
        setIconSize: (
            state,
            action: PayloadAction<"large" | "medium" | "small">
        ) => {
            const validSizes = ["large", "medium", "small"];
            if (validSizes.includes(action.payload)) {
                state.iconSize = action.payload;
            }
        },
        setSortBy: (state, action: PayloadAction<"name" | "date" | "size">) => {
            const validSortOptions = ["name", "date", "size"];
            if (validSortOptions.includes(action.payload)) {
                state.sortBy = action.payload;
            }
        },
        newFolder: (state, action: PayloadAction<{ name: string }>) => {
            const baseName = action.payload.name;
            const existingNames = state.icons.map((icon) => icon.name);

            // If base name doesn't exist, use it directly
            if (!existingNames.includes(baseName)) {
                state.icons.push({
                    id: Date.now(),
                    name: baseName,
                    type: "folder",
                    children: [],
                });
                return;
            }

            // Find the next available name like "New Folder (2)", "New Folder (3)", etc.
            let suffix = 1;
            let newName = `${baseName} (${suffix})`;

            while (existingNames.includes(newName)) {
                suffix++;
                newName = `${baseName} (${suffix})`;
            }

            state.icons.push({
                id: Date.now(),
                name: newName,
                type: "folder",
                children: [],
            });
        },
        newShortcut: (
            state,
            action: PayloadAction<{ name: string; url: string }>
        ) => {
            state.icons.push({
                id: Date.now(),
                name: action.payload.name,
                type: "shortcut",
                url: action.payload.url,
            });
        },
        newFile: (
            state,
            action: PayloadAction<{ name: string; content?: string }>
        ) => {
            state.icons.push({
                id: Date.now(),
                name: action.payload.name,
                content: action.payload.content || "",
                type: "file",
            });
        },
    },
});

export const {newFolder, newShortcut, newFile, setIconSize, setSortBy} =
    desktopSlice.actions;
export default desktopSlice.reducer;
