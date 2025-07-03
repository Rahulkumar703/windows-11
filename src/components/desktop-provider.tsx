"use client";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuRadioItem,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
  ContextMenuRadioGroup,
} from "@/components/ui/context-menu";
import {
  ArrowUpDown,
  Brush,
  ExternalLink,
  FileText,
  Folder,
  LayoutDashboard,
  PlusCircle,
  RotateCw,
} from "lucide-react";
import { Separator } from "./ui/separator";
import { Fragment, useMemo } from "react";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/hooks/redux-toolkit";
import {
  newFile,
  newFolder,
  newShortcut,
  setIconSize,
  setSortBy,
} from "@/store/features/desktop/desktopSlice";
import { useRouter } from "next/navigation";

type RadioSubMenu = {
  type: "radio";
  value: string;
  options: { value: string; label: string; action: () => void }[];
};

type ItemsSubMenu = {
  type: "items";
  items: {
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    action: () => void;
  }[];
};

type SubMenu = RadioSubMenu | ItemsSubMenu;

type MenuItem =
  | {
      label: string;
      icon: React.ComponentType<{ className?: string }>;
      subMenu: SubMenu;
    }
  | {
      label: string;
      icon: React.ComponentType<{ className?: string }>;
      action: () => void;
    };

const DesktopProvider = ({ children }: { children: React.ReactNode }) => {
  const { icons, iconSize, sortBy } = useAppSelector((state) => state.desktop);
  const { desktopBackground, desktopBackgroundBlurDataURL } = useAppSelector(
    (state) => state.theme
  );
  const dispatch = useAppDispatch();
  const router = useRouter();

  const contextMenu: MenuItem[][] = useMemo(
    () => [
      [
        {
          label: "View",
          icon: LayoutDashboard,
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
          icon: ArrowUpDown,
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
          icon: RotateCw,
          action: () => {
            router.refresh();
          },
        },
      ],
      [
        {
          label: "New",
          icon: PlusCircle,
          subMenu: {
            type: "items",
            items: [
              {
                label: "Folder",
                icon: Folder,
                action: () => dispatch(newFolder({ name: "New Folder" })),
              },
              {
                label: "Shortcut",
                icon: ExternalLink,
                action: () =>
                  dispatch(newShortcut({ name: "New Shortcut", url: "" })),
              },
              {
                label: "Text Document",
                icon: FileText,
                action: () =>
                  dispatch(newFile({ name: "New Document", content: "" })),
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

  return (
    <>
      <ContextMenu>
        <ContextMenuTrigger className="p-4 flex flex-col items-start gap-4 bg-accent">
          {icons.map((icon) => {
            if (icon.type === "folder") {
              return (
                <div
                  key={icon.id}
                  className="flex flex-col items-center justify-center w-full gap-1 max-w-24"
                >
                  <Folder className="size-8 text-accent-foreground" />
                  <span className="text-sm text-center w-full overflow-hidden text-ellipsis line-clamp-2 leading-4">
                    {icon.name}
                  </span>
                </div>
              );
            }
            if (icon.type === "shortcut") {
              return (
                <div
                  key={icon.id}
                  className="flex flex-col items-center justify-center w-full gap-1 max-w-24"
                >
                  <ExternalLink className="size-8 text-accent-foreground" />
                  <span className="text-sm w-full overflow-hidden text-ellipsis line-clamp-2 leading-4">
                    {icon.name}
                  </span>
                </div>
              );
            }
            if (icon.type === "file") {
              return (
                <div
                  key={icon.id}
                  className="flex flex-col items-center justify-center w-full gap-1 max-w-24"
                >
                  <FileText className="size-8 text-accent-foreground" />
                  <span className="text-sm w-full overflow-hidden text-ellipsis line-clamp-2 leading-4">
                    {icon.name}
                  </span>
                </div>
              );
            }
          })}
          <Image
            src={desktopBackground}
            alt="Desktop Wallpaper"
            fill
            className="object-cover object-top"
            placeholder="blur"
            blurDataURL={desktopBackgroundBlurDataURL}
            quality={100}
          />
        </ContextMenuTrigger>

        <ContextMenuContent className="overflow-visible">
          {contextMenu.map((group, index) => {
            const isNewGroup = index !== 0 && contextMenu[index - 1].length > 0;

            return (
              <Fragment key={index}>
                {isNewGroup && (
                  <Separator className="dark:bg-white/5 my-1 bg-black/5" />
                )}
                {group.map((item, idx) => {
                  if ("subMenu" in item) {
                    return (
                      <ContextMenuSub key={`${index}-${idx}`}>
                        <ContextMenuSubTrigger>
                          <item.icon className="size-4 text-accent-foreground mr-2" />
                          <span>{item.label}</span>
                        </ContextMenuSubTrigger>
                        <ContextMenuSubContent>
                          {item.subMenu.type === "radio" ? (
                            <ContextMenuRadioGroup value={item.subMenu.value}>
                              {item.subMenu.options.map((option) => (
                                <ContextMenuRadioItem
                                  onClick={() => option.action()}
                                  key={option.value}
                                  value={option.value}
                                >
                                  <span>{option.label}</span>
                                </ContextMenuRadioItem>
                              ))}
                            </ContextMenuRadioGroup>
                          ) : (
                            item.subMenu.items.map((subItem) => (
                              <ContextMenuItem
                                key={subItem.label}
                                onClick={subItem.action}
                              >
                                <subItem.icon className="size-4 text-accent-foreground mr-2" />
                                <span>{subItem.label}</span>
                              </ContextMenuItem>
                            ))
                          )}
                        </ContextMenuSubContent>
                      </ContextMenuSub>
                    );
                  }

                  return (
                    <ContextMenuItem
                      key={`${index}-${item.label}`}
                      onClick={"action" in item ? item.action : undefined}
                    >
                      <item.icon className="size-4 text-accent-foreground mr-0" />
                      <span>{item.label}</span>
                    </ContextMenuItem>
                  );
                })}
              </Fragment>
            );
          })}
        </ContextMenuContent>
      </ContextMenu>

      {children}
    </>
  );
};

export default DesktopProvider;
