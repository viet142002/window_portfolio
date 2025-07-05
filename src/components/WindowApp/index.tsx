"use client";

import { memo, useCallback } from "react";

import { HeaderApp, MainContent } from "@/components/WindowApp/components";
import { IAppInfo } from "@/stores";
import ResizeAble from "@/components/ResizeAble";
import useApplication from "@/stores/useApplication";
import { shallow } from "zustand/shallow";

function WindowApp({ appInfo }: { appInfo: IAppInfo }) {
    const activeApp = useApplication(state => state.activeApp);

    const Content = useCallback(() => {
        return (
            <>
                <HeaderApp appId={appInfo.appId} nameApp={appInfo.nameApp} />
                <MainContent />
            </>
        );
    }, [appInfo.appId, appInfo.nameApp]);

    return (
        <section
            className='absolute bg-blue-300 rounded-2xl shadow-lg overflow-hidden'
            id={appInfo.appId}
            onClick={() => activeApp(appInfo.appId)}
            onMouseDown={() => activeApp(appInfo.appId)}
            style={{
                zIndex: appInfo.zIndex,
                left: appInfo.position[0],
                top: appInfo.position[1],
                width: appInfo.size[0],
                height: appInfo.size[1],
            }}
        >
            <ResizeAble appId={appInfo.appId}>
                <Content />
            </ResizeAble>
        </section>
    );
}

const areEqual = (
    prevProps: { appInfo: IAppInfo },
    nextProps: { appInfo: IAppInfo }
) => {
    return shallow(prevProps.appInfo, nextProps.appInfo);
};

export default memo(WindowApp, areEqual);
