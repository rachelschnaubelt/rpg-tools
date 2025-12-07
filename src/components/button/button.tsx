type buttonProps = {
    children?: React.ReactNode,
    onClick?: React.MouseEventHandler
}

export default function Button({ children, onClick }: buttonProps) {

    return (
        <button
            onClick={onClick}
            className="border-solid bg-gray-500 p-1 px-3 rounded-md cursor-pointer">
            {children}
        </button>
    )
}