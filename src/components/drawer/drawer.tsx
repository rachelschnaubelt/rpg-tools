import { useEffect, useState } from "react";

type Props = {
    isOpen?: boolean
}

export default function Drawer({ isOpen = false }: Props) {

    return (
        <>
            <aside className={`fixed left-0 top-0 bottom-0 z-3 bg-white p-8 ${isOpen ? '' : 'hidden'}`}>
                <p>Filters</p>
            </aside>
        </>
    )
}