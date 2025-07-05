'use client'

import { memo } from "react";

import { HeaderApp, MainContent } from "@/components/WindowApp/components";
import { IAppInfo } from "@/stores";

function WindowApp({ appInfo }: {  appInfo: IAppInfo }) {
    return (
        <section className="absolute bg-blue-300 rounded-2xl shadow-lg overflow-hidden"
            style={{
                zIndex: appInfo.zIndex,
                top: appInfo.position[0],
                left: appInfo.position[1],
                width: appInfo.size[0],
                height: appInfo.size[1],
            }}
        >
            <HeaderApp appInfo={appInfo} />
            <MainContent />
        </section>
    );
}

export default memo(WindowApp);