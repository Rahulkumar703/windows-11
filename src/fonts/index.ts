import localFont from "next/font/local";

export const segoeui = localFont({
  src: [
    {
      path: "./segoeui-light.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./segoeui-lightitalic.ttf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./segoeui-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./segoeui-regularitalic.ttf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./segoeui-semibold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "./segoeui-semibolditalic.ttf",
      weight: "600",
      style: "italic",
    },
    {
      path: "./segoeui-bold.ttf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./segoeui-bolditalic.ttf",
      weight: "700",
      style: "italic",
    },
    {
      path: "./segoeui-black.ttf",
      weight: "900",
      style: "normal",
    },
    {
      path: "./segoeui-blackitalic.ttf",
      weight: "900",
      style: "italic",
    },
  ],
  variable: "--font-segoeui",
});
