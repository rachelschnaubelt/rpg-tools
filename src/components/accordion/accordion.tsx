'use client'

import { useEffect, useState } from "react"

type buttonProps = {
    children?: React.ReactNode,
    title: string
}

export default function Accordion({ title, children }: buttonProps) {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const accordionHandler = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        setIsOpen(true);
    }, [children]);

    return (
        <div>
            <div
                onClick={accordionHandler}
                className="cursor-pointer font-bold">
                <p className="flex justify-between">
                    <span>{title}</span>
                    <span>{children ? (isOpen ? '-' : '+') : ''}</span>
                </p>
            </div>
            {children && <div className={isOpen ? '' : 'hidden'}>
                {children}
            </div>}
        </div>
    )
}