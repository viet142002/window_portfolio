import { ReactNode } from "react"

interface TooltipProps {
    content: ReactNode,
    children: ReactNode
}

export const Tooltip = ({ children, content }: TooltipProps) => {
    return (
        <div className="group relative">
            {children}
            <div className="absolute backdrop-blur-3xl bottom-[calc(100%+5px)] left-1/2 translate-x-[-50%] opacity-0 group-hover:opacity-100 duration-200">
                {content}
            </div>
        </div>
    )
}