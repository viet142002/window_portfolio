"use client";

import { Center, Tooltip } from "@/components/common";
import useApplication from "@/stores/useApplication";
import { memo, ReactNode } from "react";

interface ApplicationProps {
    icon: ReactNode;
    label: string;
    appId: string;
}

function Application({ icon, label, appId }: ApplicationProps) {
    const appInfo = useApplication(state => state.apps[appId]);
    const initApp = useApplication(state => state.initApp);
    const activeApp = useApplication(state => state.activeApp);

    const isOpened = !!appInfo;

    const handleClickApp = () => {
        if (!isOpened) {
            initApp(appId, { zIndex: 0, size: [200, 200], position: [0, 0], isActive: true, nameApp: label, appId });
        } else {
            activeApp(appId);
        }
    };
 
    return (
        <Center className='size-[70px]'>
            <button
                className="cursor-pointer"
                onClick={handleClickApp}
            >
                <InnerApplication
                    icon={icon}
                    label={label}
                    isActive={appInfo?.isActive}
                    isOpened={isOpened}
                />
            </button>
        </Center>
    );
}

function InnerApplicationMemo({
    icon,
    label,
    isActive,
    isOpened,
}: Omit<ApplicationProps, 'name' | 'appId'> & { isActive: boolean; isOpened: boolean }) {
    return (
        <Tooltip content={label}>
            {icon}
            <div
                className={`flex justify-center mt-1 opacity-0 h-1 ${
                    (isActive || isOpened) && "opacity-100"
                }`}
            >
                {isActive && (
                    <span className='block h-full w-4 bg-gray-400 rounded-2xl' />
                )}
                {(isOpened && !isActive) && (
                    <span className='block h-full w-2 bg-gray-400 rounded-2xl' />
                )}
            </div>
        </Tooltip>
    );
}

const InnerApplication = memo(InnerApplicationMemo);

export default Application;
