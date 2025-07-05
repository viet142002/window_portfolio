"use client";

import { useDragAndDrop } from "@/hooks";
import useApplication, { IAppInfo } from "@/stores/useApplication";
import { memo, useRef } from "react";

function HeaderAppMemo({ appId, nameApp }: Pick<IAppInfo, "appId" | "nameApp">) {
    const headerRef = useRef<HTMLDivElement>(null);
    const updateApp = useApplication(state => state.updateApp);
    const closeApp = useApplication(state => state.closeApp);
    useDragAndDrop(
        headerRef,
        appId,
        (offset) => {
            updateApp(appId, {
                position: [
                    offset.x,
                    offset.y,
                ],
            });
        }
    );

    return (
        <div
            className='flex justify-between p-2 bg-gray-900 select-none cursor-grab'
            ref={headerRef}
        >
            <div>{nameApp}</div>

            <div>
                <button onClick={() => closeApp(appId)}>X</button>
            </div>
        </div>
    );
}

export const HeaderApp = memo(HeaderAppMemo);
