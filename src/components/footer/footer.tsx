type Props = {
    className?: string
}

export default function Footer({className}: Props) {

    return (
        <footer className={`text-center ${className}`}>
            <h1>Footer</h1>
        </footer>
    )
}