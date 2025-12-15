type buttonProps = {
    children?: React.ReactNode,
    onClick?: React.MouseEventHandler,
    className?: string
}

export default function Button({ children, onClick, className }: buttonProps) {

    return (
        <button
            onClick={onClick}
            className={`border-solid bg-gray-500 p-1 px-3 rounded-md cursor-pointer ${className}`}>
            {children}
        </button>
    )
}