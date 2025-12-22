'use client'

import Room from "@/components/room/room";
import Button from "@/components/button/button";
import Checkbox from "@/components/checkbox/checkbox";
import Drawer from "@/components/drawer/drawer";
import { useState } from "react";
import RangeSlider from "@/components/range-slider/range-slider";

export default function Page() {
  const [exitCountMin, setExitCountMin] = useState<number>(1);
  const [exitCountMax, setExitCountMax] = useState<number>(3);
  const [npcCountMin, setNpcCountMin] = useState<number>(0);
  const [npcCountMax, setNpcCountMax] = useState<number>(3);
  const [windowCountMin, setWindowCountMin] = useState<number>(0);
  const [windowCountMax, setWindowCountMax] = useState<number>(2);
  const [creatureCountMin, setCreatureCountMin] = useState<number>(0);
  const [creatureCountMax, setCreatureCountMax] = useState<number>(2);
  const [trapCountMin, setTrapCountMin] = useState<number>(0);
  const [trapCountMax, setTrapCountMax] = useState<number>(2);
  const [itemCountMin, setItemCountMin] = useState<number>(1);
  const [itemCountMax, setItemCountMax] = useState<number>(4);
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
    "locationExitCountMax": exitCountMax,
    "locationNpcCountMin": npcCountMin,
    "locationNpcCountMax": npcCountMax,
    "locationWindowCountMin": windowCountMin,
    "locationWindowCountMax": windowCountMax,
    "locationCreatureCountMin": creatureCountMin,
    "locationCreatureCountMax": creatureCountMax,
    "locationTrapCountMin": trapCountMin,
    "locationTrapCountMax": trapCountMax,
    "locationItemCountMin": itemCountMin,
    "locationItemCountMax": itemCountMax
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

  const handleSliderChange = (configKey: string, value: number, setter: any) => {
    setter(value);
    setRoomConfigs({
      ...roomConfigs,
      [configKey]: value
    })
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
          {roomConfigs['locationWindows'] && <RangeSlider max={6} min={0} selectedMax={windowCountMax} selectedMin={windowCountMin} setMax={(value) => {handleSliderChange('locationWindowCountMax', value, setWindowCountMax)}} setMin={(value) => {handleSliderChange('locationWindowCountMin', value, setWindowCountMin)}} includeMinMaxLabels={false} />}
          {getCheckboxContainer('locationExits', "Exits")}
          {roomConfigs['locationExits'] && <RangeSlider max={6} min={0} selectedMax={exitCountMax} selectedMin={exitCountMin} setMax={(value) => {handleSliderChange('locationExitCountMax', value, setExitCountMax)}} setMin={(value) => {handleSliderChange('locationExitCountMin', value, setExitCountMin)}} includeMinMaxLabels={false} />}
          {getCheckboxContainer('locationNPCs', "NPCs")}
          {roomConfigs['locationNPCs'] && <RangeSlider max={6} min={0} selectedMax={npcCountMax} selectedMin={npcCountMin} setMax={(value) => {handleSliderChange('locationNpcCountMax', value, setNpcCountMax)}} setMin={(value) => {handleSliderChange('locationNpcCountMin', value, setNpcCountMin)}} includeMinMaxLabels={false} />}
          {getCheckboxContainer('locationCreatures', "Creatures")}
          {roomConfigs['locationCreatures'] && <RangeSlider max={6} min={0} selectedMax={creatureCountMax} selectedMin={creatureCountMin} setMax={(value) => {handleSliderChange('locationCreatureCountMax', value, setCreatureCountMax)}} setMin={(value) => {handleSliderChange('locationCreatureCountMin', value, setCreatureCountMin)}} includeMinMaxLabels={false} />}
          {getCheckboxContainer('locationItems', "Items")}
          {roomConfigs['locationItems'] && <RangeSlider max={6} min={6} selectedMax={itemCountMax} selectedMin={itemCountMin} setMax={(value) => {handleSliderChange('locationItemCountMax', value, setItemCountMax)}} setMin={(value) => {handleSliderChange('locationItemCountMin', value, setItemCountMin)}} includeMinMaxLabels={false} />}
          {getCheckboxContainer('locationTraps', "Traps")}
          {roomConfigs['locationTraps'] && <RangeSlider max={6} min={0} selectedMax={trapCountMax} selectedMin={trapCountMin} setMax={(value) => {handleSliderChange('locationTrapCountMax', value, setTrapCountMax)}} setMin={(value) => {handleSliderChange('locationTrapCountMin', value, setTrapCountMin)}} includeMinMaxLabels={false} />}
        </div>
      </Drawer>
      <Button
        onClick={handleDrawer}
        className={`block ml-auto`}>Filter</Button>
      <Room generatorConfigs={roomConfigs}/>
    </>
  )
}