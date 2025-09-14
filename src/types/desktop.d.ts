import React from "react";

export type Icon = {
    id: number;
    name: string;
    type: "folder" | "file" | "shortcut";
    children?: Array<Icon>;
    url?: string;
    content?: string;
}


export type DesktopState = {
    iconSize: "large" | "medium" | "small";
    sortBy: "name" | "date" | "size";
    icons: Array<Icon>;
};


type RadioSubMenu = {
    type: "radio";
    value: string;
    options: { value: string; label: string; action: () => void }[];
};

type ItemsSubMenu = {
    type: "items";
    items: Array<{
        label: string;
        icon: React.ComponentType<{ className?: string }>;
        action: () => void;
    }>;
};

type SubMenu = RadioSubMenu | ItemsSubMenu;

export type MenuItem = {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    subMenu?: SubMenu;
    action?: () => void;
};