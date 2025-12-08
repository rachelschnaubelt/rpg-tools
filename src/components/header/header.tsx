import styles from "./header.module.scss";

type Props = {
    className?: string
}

export default function Header({className}: Props) {

    return (
        <header 
            className={`header py-3 border-b-1 fixed top-0 left-0 right-0 bg-white ${className} ${styles.header}`}>
            <h1 
                className={`text-2xl hover:scale-105 origin-left duration-300 ${styles.heading}`}>
                RPG Tools
            </h1>
        </header>
    )
}