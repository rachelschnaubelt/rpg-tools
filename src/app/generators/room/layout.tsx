'use client'

import Button from "@/components/button/button";
import Drawer from "@/components/drawer/drawer";
import { useState } from "react";

// This is a Server Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const handleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    }

    return (
        <>
            <Drawer isOpen={isDrawerOpen}/>
            <Button
                onClick={handleDrawer}>Filter</Button>
            {children}
        </>
    )
}