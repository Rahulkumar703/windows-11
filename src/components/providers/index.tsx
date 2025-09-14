"use client";

import {ThemeProvider as NextThemesProvider} from "next-themes";
import {AppStore, makeStore} from "@/store";
import {ComponentProps, ReactNode, useRef} from "react";
import {Provider} from "react-redux";

function ThemeProvider({
                           children,
                           ...props
                       }: ComponentProps<typeof NextThemesProvider>) {
    return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

function StoreProvider({children}: { children: ReactNode }) {
    const storeRef = useRef<AppStore | null>(null);
    if (!storeRef.current) {
        storeRef.current = makeStore();
    }

    return <Provider store={storeRef.current}>{children}</Provider>;
}

const Index = ({children}: { children: React.ReactNode }) => {
    return (
        <StoreProvider>
            <ThemeProvider defaultTheme="dark" attribute="class" enableSystem>
                {children}
            </ThemeProvider>
        </StoreProvider>
    );
};

export default Index;
