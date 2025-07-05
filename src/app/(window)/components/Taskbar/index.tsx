"use client";

import Application from "@/components/Application";

import { FaChrome } from "react-icons/fa";

function Taskbar() {
    return (
        <footer className='backdrop-blur-sm flex justify-center items-center'>
            <Application appId='chrome' label='Chrome' icon={<FaChrome size={30} />} />
            <Application appId='vscode' label='VS Code' icon={<FaChrome size={30} />} />
            <Application appId='file' label='File' icon={<FaChrome size={30} />} />
            {/* <Application appId='vscode' label='VS Code' icon={<FaChrome size={30} />} /> */}
        </footer>
    );
}

export default Taskbar;
