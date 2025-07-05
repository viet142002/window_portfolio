"use client";

import { useResizeAbleWinApp } from "@/hooks";
import useApplication from "@/stores/useApplication";
import { memo, useRef } from "react";

interface FinishCallback {
    size: [number, number];
    position: [number, number];
}

const OPTIONS = { minWidth: 400, minHeight: 400 };

function ResizeAble({
    children,
    appId,
}: {
    children: React.ReactNode;
    appId: string;
}) {
    const rightRef = useRef<HTMLDivElement>(null);
    const topRightRef = useRef<HTMLDivElement>(null);
    const topLeftRef = useRef<HTMLDivElement>(null);
    const leftRef = useRef<HTMLDivElement>(null);
    const topRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);
    const bottomRightRef = useRef<HTMLDivElement>(null);
    const bottomLeftRef = useRef<HTMLDivElement>(null);

    const updateApp = useApplication(state => state.updateApp);

    const handleUpdateResize = ({ size, position }: FinishCallback) => {
        updateApp(appId, { size, position });
    };

    useResizeAbleWinApp(rightRef, appId, "right", handleUpdateResize, OPTIONS);
    useResizeAbleWinApp(bottomRef, appId, "bottom", handleUpdateResize, OPTIONS);
    useResizeAbleWinApp(leftRef, appId, "left", handleUpdateResize, OPTIONS);
    useResizeAbleWinApp(topRef, appId, "top", handleUpdateResize, OPTIONS);

    useResizeAbleWinApp(topRightRef, appId, "topRight", handleUpdateResize, OPTIONS);
    useResizeAbleWinApp(topLeftRef, appId, "topLeft", handleUpdateResize, OPTIONS);
    useResizeAbleWinApp(bottomRightRef, appId, "bottomRight", handleUpdateResize, OPTIONS);
    useResizeAbleWinApp(bottomLeftRef, appId, "bottomLeft", handleUpdateResize, OPTIONS);

    return (
        <div className='relative w-full h-full'>
            <div
                className='absolute top-0 left-0 w-2 h-2 cursor-nw-resize'
                ref={topLeftRef}
            ></div>
            <div
                className='absolute top-0 right-0 w-2 h-2 cursor-ne-resize'
                ref={topRightRef}
            ></div>
            <div
                className='absolute bottom-0 left-0 w-2 h-2 cursor-sw-resize'
                ref={bottomLeftRef}
            ></div>
            <div
                className='absolute bottom-0 right-0 w-2 h-2 cursor-se-resize'
                ref={bottomRightRef}
            ></div>
            <div
                className='absolute top-0 left-1 right-1 h-1 cursor-n-resize'
                ref={topRef}
            ></div>
            <div
                className='absolute bottom-0 left-1 right-1 h-1 cursor-s-resize'
                ref={bottomRef}
            ></div>
            <div
                className='absolute left-0 w-1 top-1 bottom-1 cursor-w-resize'
                ref={leftRef}
            ></div>
            <div
                className='absolute right-0 w-1 top-1 bottom-1 cursor-e-resize'
                ref={rightRef}
            ></div>
            {children}
        </div>
    );
}

export default memo(ResizeAble, (prev, next) => prev.appId === next.appId);
