"use client";

import useApplication, { IAppInfo } from "@/stores/useApplication";

export function HeaderApp({ appInfo }: { appInfo: IAppInfo }) {
    // const updateApp = useApplication((state) => state.updateApp);
    const closeApp = useApplication(state => state.closeApp);
    return (
        <div className='flex justify-between p-2 bg-gray-900'>
            <div>{appInfo.nameApp}</div>

            <div>
                <button onClick={() => closeApp(appInfo.appId)}>X</button>
            </div>
        </div>
    );
}
