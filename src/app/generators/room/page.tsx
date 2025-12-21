'use client'

import Room from "@/components/room/room";
import Button from "@/components/button/button";
import Checkbox from "@/components/checkbox/checkbox";
import Drawer from "@/components/drawer/drawer";
import { useState } from "react";
import RangeSlider from "@/components/range-slider/range-slider";

export default function Page() {
  const [exitCountMin, setExitCountMin] = useState<number>(2);
  const [exitCountMax, setExitCountMax] = useState<number>(7);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [roomConfigs, setRoomConfigs] = useState<{ [key: string]: string | boolean | number }>({
    "locationLighting": true,
    "locationCondition": true,
    "locationTemperature": true,
    "locationSize": true,
    "locationAtmosphere": true,
    "locationScent": true,
    "locationSound": true,
    "locationUniqueTrait": true,
    "locationWindows": true,
    "locationExits": true,
    "locationNPCs": true,
    "locationCreatures": true,
    "locationItems": true,
    "locationTraps": true,
    "locationExitCountMin": exitCountMin,
    "locationExitCountMax": exitCountMax
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
        onChange={() => { handleCheckboxChange(id, !roomConfigs[id]) }}
        value={id}
        isChecked={roomConfigs[id] as boolean}
      >{label}</Checkbox>
    )
  }

  

  return (
    <>
      <Drawer isOpen={isDrawerOpen} drawerClose={handleDrawerClose} drawerPosition="right">
        <p>Filters</p>
        <div className={`flex flex-col`}>
          {getCheckboxContainer('locationLighting', "Lighting")}
          {getCheckboxContainer('locationCondition', "Condition")}
          {getCheckboxContainer('locationTemperature', "Temperature")}
          {getCheckboxContainer('locationSize', "Size")}
          {getCheckboxContainer('locationAtmosphere', "Atmosphere")}
          {getCheckboxContainer('locationScent', "Scent")}
          {getCheckboxContainer('locationSound', "Sound")}
          {getCheckboxContainer('locationUniqueTrait', "Unique Trait")}
          {getCheckboxContainer('locationWindows', "Windows")}
          {getCheckboxContainer('locationExits', "Exits")}
          {getCheckboxContainer('locationNPCs', "NPCs")}
          {getCheckboxContainer('locationCreatures', "Creatures")}
          {getCheckboxContainer('locationItems', "Items")}
          {getCheckboxContainer('locationTraps', "Traps")}
          <RangeSlider max={10} min={0} selectedMax={exitCountMax} selectedMin={exitCountMin} label="range" setMax={setExitCountMax} setMin={setExitCountMin} />
        </div>
      </Drawer>
      <Button
        onClick={handleDrawer}
        className={`block ml-auto`}>Filter</Button>
      <Room generatorConfigs={roomConfigs}/>
    </>
  )
}