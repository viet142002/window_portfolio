import { create } from "zustand";

export interface IAppInfo {
    zIndex: number // z-index
    size: [number, number] // size [width, height]
    position: [number, number]  // position [x, y] left-top
    isActive: boolean,
    // isHidden: boolean
    nameApp: string
    appId: string
}

interface ApplicationState {
    apps: Record<string, IAppInfo>
    maxIndex: number
    updateApp: (appId: string, info: Partial<IAppInfo>) => void
    closeApp: (appId: string) => void
    initApp: (appId: string, info: IAppInfo) => void
    activeApp: (appId: string) => void
}

const useApplication = create<ApplicationState>((set) => ({
    maxIndex: 0,
    apps: {},
    updateApp: (appId, info) => set((state) => {
        return { apps: { ...state.apps, [appId]: { ...state.apps[appId], ...info } } }
    }),
    closeApp: (appId: string) => set((state) => {
        const apps = { ...state.apps }
        delete apps[appId]
        return { apps }
    }),
    initApp: (appId: string, info: IAppInfo) => set((state) => {
        const maxIndex = state.maxIndex + 1
        const apps = { ...state.apps }
        Object.keys(apps).forEach((key) => {
            apps[key] = { ...apps[key], isActive: false }
        })
        return { apps: { ...apps, [appId]: { ...info, zIndex: maxIndex } }, maxIndex }
    }),
    activeApp: (appId: string) => set((state) => {
        const apps = { ...state.apps }
        const maxIndex = state.maxIndex + 1;
        const appActiveCurrent = Object.keys(apps).find(key => apps[key].isActive);
        if (appActiveCurrent === appId) {
            return state;
        }
        Object.keys(apps).forEach((key) => {
            if (key === appId) {
                apps[key] = { ...apps[key], isActive: true, zIndex: maxIndex }
            } else {
                apps[key] = { ...apps[key], isActive: false }
            }
        })
        return { apps, maxIndex: maxIndex }
    })
}));


export default useApplication