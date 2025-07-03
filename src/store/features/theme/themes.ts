export type Theme = {
  color: string;
  desktopBackground: string;
  desktopBackgroundBlurDataURL: string;
};

export type ThemeName = keyof typeof themes;

export const themes: Record<string, Record<"light" | "dark", Theme>> = {
  default: {
    dark: {
      color: "#007bff",
      desktopBackground: "/assets/images/default-bg-dark.webp",
      desktopBackgroundBlurDataURL:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAAXNSR0IArs4c6QAAALBJREFUGFcBpQBa/wEBChr/AQUIAAQHDwAEChYABA02APfqvgD99eMA//76AAECDR//BAoTAA0iWAAPKWEA9AUNAPG9hQD87KYA//v4AAEDDyL/EChRABY1hwDu1vMA/PXOAPDTdAACCfoA/fn0AAEEEST/ES95APjzJQAFCPkA78lvAP8NGwACBQEAAvjZAAEFEST/CiZtAP0HMgAB+vgA+NqWAP0LFAAC9MYAAP30AJXqOdnu+IcWAAAAAElFTkSuQmCC",
    },
    light: {
      color: "#007bff",
      desktopBackground: "/assets/images/default-bg-light.webp",
      desktopBackgroundBlurDataURL:
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAFCAYAAAB4ka1VAAAAAXNSR0IArs4c6QAAALBJREFUGFcBpQBa/wGKsMr/CggHAA4KCAACBQYAyuoIABf/8QAJA/UA9vr7AAGVt9H/CwoIANz1EgC96wwA3db9AA3u5AB4VvwA9Pf5AAGgvdX/5f0RAKzmEwDfr+IA/gn/ACL1vgBtbj4A+/z7AAGnwdj/ueQTAKeh2gAKBPwA9M6fAAETIAAXHh0Ag3I3AAGrwtn/udwOAKWt3AADChgA+9KgAP4PFwBwWigALy0aAKmWRIy6pjv3AAAAAElFTkSuQmCC",
    },
  },
};
