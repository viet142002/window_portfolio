import useClickRightMouse from "@/hooks/useClickRightMouse";
import { useRef } from "react";

interface ContextMenuProps {
    children: React.ReactNode;
    menu: React.ReactNode;
}

function ContextMenu({ children, menu }: ContextMenuProps) {
    const ref = useRef<HTMLDivElement>(null);
    const { isRightClick } = useClickRightMouse(ref);

    return (
        <div
            ref={ref}
            className="relative"
        >
            {children}
            {isRightClick && (
                <div className="absolute bottom-[calc(100%+5px)] left-1/2 translate-x-[-50%] w-full h-full bg-black/50 flex justify-center items-center z-50">
                    {menu}
                </div>
            )}
        </div>
    )
}

export default ContextMenu;