import Taskbar from "../taskbar";
import DesktopBackground from "@/components/desktop/desktop-background";
import DesktopContextMenu from "@/components/desktop/desktop-context-menu";
import React from "react";

const Desktop = ({children}: { children: React.ReactNode }) => {
    return (
        <main className={`relative flex flex-col h-screen overflow-hidden`}>
            <DesktopBackground/>
            <DesktopContextMenu/>
            {children}
            <Taskbar/>
        </main>
    );
};

export default Desktop;
