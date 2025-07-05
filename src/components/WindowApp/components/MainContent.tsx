'use client';

import { memo } from "react";

function MainContentMemo() {
    return <div className="overflow-auto">MainContent</div>
}

export const MainContent = memo(MainContentMemo);