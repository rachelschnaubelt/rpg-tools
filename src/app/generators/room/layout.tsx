'use client'

import Button from "@/components/button/button";
import Checkbox from "@/components/checkbox/checkbox";
import Drawer from "@/components/drawer/drawer";
import { useState } from "react";

// This is a Server Component
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {  
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const [roomConfigs, setRoomConfigs] = useState<{[key: string]: string | boolean}>({
        "locationLighting": true,
        "locationCondition": true,
        "locationTemperature": true,
        "locationSize": true,
        "locationAtmosphere": true,
        "locationScent": true,
        "locationSound": true,
        "locationUniqueTrait": true,
    });
    
    const handleDrawer = () => {
        setIsDrawerOpen(!isDrawerOpen);
    }

    const handleDrawerClose = () => {
        setIsDrawerOpen(false);
    }

    const handleCheckboxChange = (configKey: string, value: string | boolean) => {
        setRoomConfigs({
            ...roomConfigs,
            [configKey]: value
        })
    }

    const getCheckboxContainer = (id: string, label: string) => {
        return (
            <Checkbox 
                onChange={() => {handleCheckboxChange(id, !roomConfigs[id])}}
                value={id} 
                isChecked={roomConfigs[id] as boolean}
                >{label}</Checkbox>
        )
    }

    return (
        <>
            <Drawer isOpen={isDrawerOpen} drawerClose={handleDrawerClose}>
                <p>Filters</p>
                <div className={`flex flex-col`}>
                    {getCheckboxContainer('locationLighting', "Lighting")}
                    {getCheckboxContainer('locationCondition', "Condition")}
                    {getCheckboxContainer('locationTemperature', "Temperature")}
                    {getCheckboxContainer('locationSize', "Size")}
                    {getCheckboxContainer('locationAtmosphere', "Atmosphere")}
                    {getCheckboxContainer('locationScent', "Scent")}
                    {getCheckboxContainer('locationSound', "Sound")}
                    {getCheckboxContainer('locationUniqueTrait', "UniqueTrait")}
                </div>
            </Drawer>
            <Button
                onClick={handleDrawer}>Filter</Button>
            {children}
        </>
    )
}