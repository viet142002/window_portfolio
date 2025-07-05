export const Center = ({ children, className }: { children: React.ReactNode, className?: string }) => {
    return <div className={`flex justify-center items-center ${className}`}>{children}</div>
};