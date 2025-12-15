'use client'

import { useEffect, useRef, useState } from "react"
import Button from "../button/button";
import { setAttribute, timeout } from "../utils/utils";
import Window from "../window/window";
import Exit from "../exit/exit";
import NPC from "../npc/npc";
import Creature from "../creature/creature";
import Item from "../item/item";
import Trap from "../trap/trap";
import Accordion from "../accordion/accordion";

type Props = {
    generatorConfigs: { [key: string]: string | boolean }
}

export default function Room({ generatorConfigs }: Props) {
    const [roomType, setRoomType] = useState('');
    const [lightingType, setLightingType] = useState('');
    const [locationCondition, setLocationCondition] = useState('');
    const [locationTemperature, setLocationTemperature] = useState('');
    const [locationSize, setLocationSize] = useState('');
    const [locationScent, setLocationScent] = useState('');
    const [locationAtmosphere, setLocationAtmosphere] = useState('');
    const [locationUniqueTrait, setLocationUniqueTrait] = useState('');
    const [soundsCount, setSoundsCount] = useState(0);
    const [locationSounds, setLocationSounds] = useState<Set<string>>(new Set<string>);
    const [windowCount, setWindowCount] = useState(0);
    const [exitCount, setExitcount] = useState(0);
    const [npcCount, setNpcCount] = useState(0);
    const [itemCount, setItemCount] = useState(0);
    const [trapCount, setTrapCount] = useState(0);
    const [creatureCount, setCreatureCount] = useState(0);
    const roomContainerRef = useRef<HTMLDivElement>(null);
    const transitionDuration = 100;

    const updateRoom = async () => {
        roomContainerRef.current?.classList.add('opacity-0');

        await timeout(transitionDuration);

        await setAttribute('/api/attributes/random-weighted/location-room-types', setRoomType);
        generatorConfigs.locationLighting && await setAttribute('/api/attributes/random-weighted/location-lighting-types', setLightingType);
        generatorConfigs.locationCondition && await setAttribute('/api/attributes/random-weighted/location-conditions', setLocationCondition);
        generatorConfigs.locationTemperature && await setAttribute('/api/attributes/random-weighted/location-temperature', setLocationTemperature);
        generatorConfigs.locationSize && await setAttribute('/api/attributes/random-weighted/location-size', setLocationSize);
        generatorConfigs.locationScent && await setAttribute('/api/attributes/random-weighted/location-scent', setLocationScent);
        generatorConfigs.locationAtmosphere && await setAttribute('/api/attributes/random-weighted/location-atmospheres', setLocationAtmosphere);
        generatorConfigs.locationUniqueTrait && await setAttribute('/api/attributes/random-weighted/location-unique-traits', setLocationUniqueTrait);
        generatorConfigs.locationWindows && setWindowCount(Math.floor(Math.random() * 4));
        generatorConfigs.locationExits && setExitcount(Math.ceil(Math.random() * 3));
        generatorConfigs.locationNPCs && setNpcCount(Math.floor(Math.random() * 4));
        generatorConfigs.locationCreatures && setCreatureCount(Math.floor(Math.random() * 3));
        generatorConfigs.locationItems && setItemCount(Math.floor(Math.random() * 3));
        generatorConfigs.locationTraps && setTrapCount(Math.floor(Math.random() * 2));
        
        if (generatorConfigs.locationSound) {
            setSoundsCount(Math.floor(Math.random() * 3));
            const tempSounds: Set<string> = new Set<string>;
            const soundsEndpoint = '/api/attributes/random-weighted/location-sounds';
            for (let i = 0; i < soundsCount; i++) {
                const sound = await fetch(soundsEndpoint)
                    .then(res => {
                        if (res.status !== 200) {
                            return '';
                        }
                        return res.json()
                    });
                tempSounds.add(sound);
            }
            setLocationSounds(tempSounds);
        }

        // await timeout(0);
        roomContainerRef.current?.classList.remove('opacity-0');
    }

    const getComponentList = (count: number, Component: any) => {
        if (count <= 0) {
            return '';
        }
        const arr = [];
        for (let i = 0; i < count; i++) {
            let props = {
                itemNumber: i + 1
            }
            arr.push(<Component key={i} {...props} />)
        }

        return <div className="flex gap-4">{arr}</div>;
    }

    const getCountLabel = (count: number, noun: string) => {
        if (count === 0) {
            return `No ${noun}s`;
        }
        else if (count === 1) {
            return `${count} ${noun}`;
        }
        return `${count} ${noun}s`;
    }

    const getAttributeContainer = (attribute: string, attributeLabel: string) => {
        if (!attribute) {
            return '';
        }
        return (
            <div className={'relative'}>
                <p className={`absolute text-xs top-[-.5rem] opacity-70`}>{attributeLabel}</p>
                <p>{attribute}</p>
            </div>
        )
    }

    useEffect(() => {
        updateRoom();
    }, [])

    return (
        <div className="flex flex-col min-h-full">
            <div className={`transition duration-${transitionDuration} overflow-hidden opacity-0 flex-1`} ref={roomContainerRef}>
                {roomType ? <h3 className='text-xl text-center'>{roomType}</h3> : ''}
                <div className='flex gap-4 justify-between mt-4 flex-wrap'>
                    {generatorConfigs.locationLighting && getAttributeContainer(lightingType, 'Lighting')}
                    {generatorConfigs.locationCondition && getAttributeContainer(locationCondition, 'Condition')}
                    {generatorConfigs.locationTemperature && getAttributeContainer(locationTemperature, 'Temperature')}
                    {generatorConfigs.locationSize && getAttributeContainer(locationSize, 'Size')}
                    {generatorConfigs.locationAtmosphere && getAttributeContainer(locationAtmosphere, 'Atmosphere')}
                    {generatorConfigs.locationScent && getAttributeContainer(locationScent, 'Scent')}
                    {generatorConfigs.locationSound && getAttributeContainer(Array.from(locationSounds).join(', '), 'Sounds')}
                    {generatorConfigs.locationUniqueTrait && getAttributeContainer(locationUniqueTrait, 'Unique trait')}
                </div>
                {generatorConfigs.locationWindows &&
                    <Accordion title={getCountLabel(windowCount, 'window')}>
                        {getComponentList(windowCount, Window)}
                    </Accordion>
                }
                {generatorConfigs.locationExits &&
                    <Accordion title={getCountLabel(exitCount, 'exit')}>
                        {getComponentList(exitCount, Exit)}
                    </Accordion>
                }
                {generatorConfigs.locationNPCs &&
                    <Accordion title={getCountLabel(npcCount, 'NPC')}>
                        {getComponentList(npcCount, NPC)}
                    </Accordion>
                }
                {generatorConfigs.locationCreatures &&
                    <Accordion title={getCountLabel(creatureCount, 'creature')}>
                        {getComponentList(creatureCount, Creature)}
                    </Accordion>
                }
                {generatorConfigs.locationItems &&
                    <Accordion title={getCountLabel(itemCount, 'item')}>
                        {getComponentList(itemCount, Item)}
                    </Accordion>
                }
                {generatorConfigs.locationTraps &&
                    <Accordion title={getCountLabel(trapCount, 'trap')}>
                        {getComponentList(trapCount, Trap)}
                    </Accordion>
                }
            </div>
            <div className="m-auto">
                <Button onClick={updateRoom}>Regenerate Room</Button>
            </div>
        </div>
    )
}