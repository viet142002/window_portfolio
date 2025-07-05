'use client'

import { useState } from "react";

const useClickRightMouse = (containerRef: React.RefObject<HTMLElement | null>) => {
    const [isRightClick, setIsRightClick] = useState(false);

    const handleClick = (event: MouseEvent) => {
        if (containerRef?.current && !containerRef?.current.contains(event.target as Node)) {
            setIsRightClick(false);
        }
    };

    document.addEventListener('click', handleClick);

    document.addEventListener('contextmenu', (event) => {
        event.preventDefault();
        setIsRightClick(true);
    });
    return { isRightClick, setIsRightClick };
};

export default useClickRightMouse;