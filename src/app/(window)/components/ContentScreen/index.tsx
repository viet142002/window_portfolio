"use client";

import WindowApp from "@/components/WindowApp";
import useApplication from "@/stores/useApplication";

function ContentScreen() {
    const apps = useApplication(state => state.apps);
    const appsArray = Object.entries(apps);

    return <main className='relative'>
        {appsArray.map(([name, app]) => <WindowApp key={name} appInfo={app} />)}
    </main>;
}

export default ContentScreen;
