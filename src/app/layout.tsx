import {ReactNode} from "react";
import type {Metadata} from "next";
import {segoeui} from "@/fonts";
import Desktop from "@/components/desktop";
import Index from "@/components/providers";
import "./globals.css";

export const metadata: Metadata = {
    title: "Rahul Kumar - Portfolio",
    description:
        "Hey there! I'm Rahul Kumar, a web developer, and this is my portfolio at rahusweb.in. Dive into my world of coding and design, where I create websites that not only look but work like a windows 11 web version. Explore my projects and let's bring your need and ideas to make it real together. Click now for a web-tastic journey!",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
        <body className={`${segoeui.variable}`}>
        <Index>
            <Desktop>
                {children}
            </Desktop>
        </Index>
        </body>
        </html>
    );
}
