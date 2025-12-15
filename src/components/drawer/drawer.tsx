import { useEffect, useState } from "react";

type Props = {
    isOpen?: boolean,
    children: React.ReactNode,
    drawerClose: () => void
}

export default function Drawer({ children, drawerClose, isOpen = false }: Props) {

    return (
        <>
            <aside className={`fixed left-0 top-0 bottom-0 z-3 bg-white p-8 ${isOpen ? '' : 'hidden'}`}>
                {children}
            </aside>
            <div 
                onClick={drawerClose}
                className={`fixed top-0 left-0 right-0 bottom-0 bg-black opacity-50 z-2 ${isOpen ? '' : 'hidden'}`}></div>
        </>
    )
}