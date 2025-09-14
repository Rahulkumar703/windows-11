'use client';

import {useAppSelector} from "@/hooks/redux-toolkit";
import Image from "next/image";

function DesktopBackground() {
    const {desktopBackground, desktopBackgroundBlurDataURL} = useAppSelector(
        (state) => state.theme
    );
    return (
        <Image
            src={desktopBackground}
            alt="Desktop Wallpaper"
            fill
            className="object-cover object-top"
            placeholder="blur"
            blurDataURL={desktopBackgroundBlurDataURL}
            quality={100}
        />
    );
}

export default DesktopBackground;