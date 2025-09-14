'use client'

import React, {Fragment, useMemo, useState} from 'react';
import {
    ContextMenu,
    ContextMenuContent, ContextMenuItem, ContextMenuRadioGroup, ContextMenuRadioItem,
    ContextMenuSub, ContextMenuSubContent,
    ContextMenuSubTrigger,
    ContextMenuTrigger
} from "@/components/ui/context-menu";
import {Separator} from "@/components/ui/separator";
import {useAppDispatch, useAppSelector} from "@/hooks/redux-toolkit";
import {useRouter} from "next/navigation";
import {MenuItem} from "@/types/desktop";
import {Brush, ExternalLink, FileText, Folder} from "lucide-react";
import {newFile, newFolder, newShortcut, setIconSize, setSortBy} from "@/store/features/desktop/desktopSlice";
import ViewIcon from '@/assets/svg/apps.svg'
import SortIcon from '@/assets/svg/sort.svg'
import RefreshIcon from '@/assets/svg/refresh.svg'
import NewIcon from '@/assets/svg/new.svg'
import DesktopIcon from "@/components/desktop/desktop-icon";

function DesktopContextMenu() {
    const [key, setKey] = useState(0);
    const {icons, sortBy, iconSize} = useAppSelector((state) => state.desktop);

    const dispatch = useAppDispatch();
    const router = useRouter();

    const contextMenu: Array<Array<MenuItem>> = useMemo(
        () => [
            [
                {
                    label: "View",
                    icon: ViewIcon,
                    subMenu: {
                        type: "radio",
                        value: iconSize,
                        options: [
                            {
                                value: "large",
                                label: "Large icons",
                                action: () => dispatch(setIconSize("large")),
                            },
                            {
                                value: "medium",
                                label: "Medium icons",
                                action: () => dispatch(setIconSize("medium")),
                            },
                            {
                                value: "small",
                                label: "Small icons",
                                action: () => dispatch(setIconSize("small")),
                            },
                        ],
                    },
                },
                {
                    label: "Sort by",
                    icon: SortIcon,
                    subMenu: {
                        type: "radio",
                        value: sortBy,
                        options: [
                            {
                                value: "name",
                                label: "Name",
                                action: () => dispatch(setSortBy("name")),
                            },
                            {
                                value: "date",
                                label: "Date",
                                action: () => dispatch(setSortBy("date")),
                            },
                            {
                                value: "size",
                                label: "Size",
                                action: () => dispatch(setSortBy("size")),
                            },
                        ],
                    },
                },
                {
                    label: "Refresh",
                    icon: RefreshIcon,
                    action: () => {
                        router.refresh();
                    },
                },
            ],
            [
                {
                    label: "New",
                    icon: NewIcon,
                    subMenu: {
                        type: "items",
                        items: [
                            {
                                label: "Folder",
                                icon: Folder,
                                action: () => dispatch(newFolder({name: "New Folder"})),
                            },
                            {
                                label: "Shortcut",
                                icon: ExternalLink,
                                action: () =>
                                    dispatch(newShortcut({name: "New Shortcut", url: ""})),
                            },
                            {
                                label: "Text Document",
                                icon: FileText,
                                action: () =>
                                    dispatch(newFile({name: "New Document", content: ""})),
                            },
                        ],
                    },
                },
            ],
            [
                {
                    label: "Personalize",
                    icon: Brush,
                    action: () => {
                        router.push("/settings/personalization");
                    },
                },
            ],
        ],
        [iconSize, sortBy, dispatch, router]
    );

    const updateKey = () => {
        // updating the key will remount the ContextMenuContent at the new position
        setKey(prev => prev + 1);
    };

    return (
        <ContextMenu dir={"ltr"}>
            <ContextMenuTrigger asChild>
                <div
                    onContextMenu={updateKey}
                    className="relative w-full h-screen flex flex-col items-start gap-4 p-4 bg-transparent"
                >
                    {
                        icons.map((icon) => (
                            <DesktopIcon icon={icon} key={icon.id}/>
                        ))
                    }
                </div>
            </ContextMenuTrigger>

            <ContextMenuContent className="overflow-visible" key={key}>
                {contextMenu.map((group, index) => {
                    const isNewGroup = index !== 0 && contextMenu[index - 1].length > 0;

                    return (
                        <Fragment key={index}>
                            {isNewGroup && (
                                <Separator className="dark:bg-white/5 my-1 bg-black/5"/>
                            )}
                            {group.map((item, idx) => (
                                <RenderMenuItem key={`${item.label}-${idx}`} item={item}/>
                            ))}
                        </Fragment>
                    );
                })}
            </ContextMenuContent>
        </ContextMenu>
    );
}

const RenderMenuItem = ({item}: { item: MenuItem }) => {
    if (item.subMenu) {
        return (
            <ContextMenuSub key={item.label}>
                <ContextMenuSubTrigger className="group">
                    <item.icon className="size-3 mr-2 text-foreground/60"/>
                    <span>{item.label}</span>
                </ContextMenuSubTrigger>
                <ContextMenuSubContent>
                    {item.subMenu.type === 'radio' ? (
                        <ContextMenuRadioGroup value={item.subMenu.value || ''}>
                            {item.subMenu.options?.map((option) => (
                                <ContextMenuRadioItem
                                    key={option.value}
                                    value={option.value}
                                    onClick={() => option.action()}
                                >
                                    <span>{option.label}</span>
                                </ContextMenuRadioItem>
                            ))}
                        </ContextMenuRadioGroup>
                    ) : (
                        item.subMenu.items?.map((subItem) => (
                            <RenderMenuItem key={subItem.label} item={subItem}/>
                        ))
                    )}
                </ContextMenuSubContent>
            </ContextMenuSub>
        );
    }

    return (
        <ContextMenuItem
            key={item.label}
            onClick={item.action ? item.action : undefined}
        >
            <item.icon className="size-3 text-foreground/60"/>
            <span>{item.label}</span>
        </ContextMenuItem>
    );
};

export default DesktopContextMenu;