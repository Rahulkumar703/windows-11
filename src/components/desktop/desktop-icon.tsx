'use client';
import {Icon} from "@/types/desktop";
import {useAppSelector} from "@/hooks/redux-toolkit";
import {ExternalLink, File, FileText, Folder} from "lucide-react";

enum IconSize {
    large = "size-16",
    medium = "size-10",
    small = "size-4"
}

function DesktopIcon({icon}: { icon: Icon })   {
        const {iconSize} = useAppSelector((state) => state.desktop);
        const iconSizeClass = IconSize[iconSize];
        return <div
            key={icon.id}
            className="flex flex-col items-center justify-center w-full gap-1 max-w-24 bg-accent/30"
        >
            {
                icon.type === "folder" ? <Folder className={`${iconSizeClass} text-accent-foreground`}/> :
                    icon.type === "shortcut" ? <ExternalLink className={`${iconSizeClass} text-accent-foreground`}/> :
                        icon.type === "file" ? <FileText className={`${iconSizeClass} text-accent-foreground`}/> :
                            <File className={`${iconSizeClass} text-accent-foreground`}/>
            }
            <span className="text-sm w-full text-center overflow-hidden text-ellipsis line-clamp-2 leading-4">
                    {icon.name}
        </span>
        </div>
    }


export default DesktopIcon;