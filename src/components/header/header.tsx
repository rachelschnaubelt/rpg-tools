import { RefObject } from "react"

type Props = {
    className?: string
}

export default function Header({className}: Props) {

    return (
        <header 
            className={`py-3 border-b-1 fixed top-0 left-0 right-0 bg-white ${className}`}>
            <h1 
                className="text-2xl">
                RPG Tools
            </h1>
        </header>
    )
}