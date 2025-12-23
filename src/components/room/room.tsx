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
import { UNABLE_TO_SET_ATTRIBUTE_MESSAGE } from "@/pages/api/constants";

type Props = {
    generatorConfigs: { [key: string]: string | boolean | number }
}

export default function Room({ generatorConfigs }: Props) {
    const [room, setRoom] = useState<Room>();
    const [lockedAttributes, setLockedAttributes] = useState<{ [key: string]: string | [] }>({});
    const [soundsCount, setSoundsCount] = useState(0);
    const [locationSounds, setLocationSounds] = useState<Set<string>>(new Set<string>);
    const [windowCount, setWindowCount] = useState(0);
    const [exitCount, setExitCount] = useState(0);
    const [npcCount, setNpcCount] = useState(0);
    const [itemCount, setItemCount] = useState(0);
    const [trapCount, setTrapCount] = useState(0);
    const [creatureCount, setCreatureCount] = useState(0);
    const roomContainerRef = useRef<HTMLDivElement>(null);
    const transitionDuration = 100;

    const setRandomCount = (maxKey: string, minKey: string, setter: React.Dispatch<React.SetStateAction<number>>) => {
        const maxCount = generatorConfigs[maxKey] as number;
        const minCount = generatorConfigs[minKey] as number;
        setter(Math.floor(Math.random() * (maxCount - minCount + 1)) + minCount);
    }

    const updateRoom = async () => {
        console.log(lockedAttributes);
        roomContainerRef.current?.classList.add('opacity-0');

        await timeout(transitionDuration);

        generatorConfigs.locationWindows && setRandomCount('locationWindowCountMax', 'locationWindowCountMin', setWindowCount);
        generatorConfigs.locationExits && setRandomCount('locationExitCountMax', 'locationExitCountMin', setExitCount);
        generatorConfigs.locationNPCs && setRandomCount('locationNpcCountMax', 'locationNpcCountMin', setNpcCount);
        generatorConfigs.locationCreatures && setRandomCount('locationCreatureCountMax', 'locationCreatureCountMin', setCreatureCount);
        generatorConfigs.locationItems && setRandomCount('locationItemCountMax', 'locationItemCountMin', setItemCount);
        generatorConfigs.locationTraps && setRandomCount('locationTrapCountMax', 'locationTrapCountMin', setTrapCount);

        if (generatorConfigs.locationSound && !lockedAttributes.hasOwnProperty('sounds')) {
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

         // fetch room
        const newRoom = await fetch('/api/rooms/random-weighted')
            .then(res => {
                if (res.status !== 200) {
                    console.log(`${UNABLE_TO_SET_ATTRIBUTE_MESSAGE} '/api/rooms/random-weighted'`);
                    return '';
                }
                return res.json()
            });
        
        // manipulate object
        Object.assign(newRoom, lockedAttributes);

        // set room
        setRoom(newRoom);

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

    const getAttributeContainer = (attribute: string, attributeLabel: string, attributeKey: string) => {
        if (!attribute) {
            return '';
        }
        return (
            <div className={'relative'}>
                <p className={`absolute text-xs top-[-.5rem] opacity-70`}>{attributeLabel}</p>
                <p>{attribute}</p>
                {getLockButton(attributeKey)}
            </div>
        )
    }

    // 1. clone lockedAttributes
    // 2. manipulate object
    // 3. set lockedAttributes
    const handleAttributeLock = (property: string) => {
        if (room) {
            const clonedLockedAttributes = structuredClone(lockedAttributes);

            if(lockedAttributes?.hasOwnProperty(property)) {
                delete clonedLockedAttributes?.[property];
                setLockedAttributes(clonedLockedAttributes);
            } else {
                clonedLockedAttributes[property] = room[property as keyof Room];
                setLockedAttributes(clonedLockedAttributes);
            }
        }
    }

    const getLockButton = (property: string) => {
        return (
            <Button onClick={() => handleAttributeLock(property)}>{lockedAttributes?.hasOwnProperty(property) ? 'unlock' : 'lock'}</Button>
        )
    }

    useEffect(() => {
        updateRoom();
    }, [])

    return (
        <div className="flex flex-col min-h-full">
            <div className={`transition duration-${transitionDuration} overflow-hidden opacity-0 flex-1`} ref={roomContainerRef}>
                {room && room.type ? <h3 className='text-xl text-center'>{room.type}</h3> : ''}
                <div className='flex gap-4 justify-between mt-4 flex-wrap'>
                    {room && generatorConfigs.locationLighting && getAttributeContainer(room.lighting, 'Lighting', 'lighting')}
                    {room && generatorConfigs.locationCondition && getAttributeContainer(room.condition, 'Condition', 'condition')}
                    {room && generatorConfigs.locationTemperature && getAttributeContainer(room.temperature, 'Temperature', 'temperature')}
                    {room && generatorConfigs.locationSize && getAttributeContainer(room.size, 'Size', 'size')}
                    {room && generatorConfigs.locationAtmosphere && getAttributeContainer(room.atmosphere, 'Atmosphere', 'atmosphere')}
                    {room && generatorConfigs.locationScent && getAttributeContainer(room.scent, 'Scent', 'scent')}
                    {room && generatorConfigs.locationSound && getAttributeContainer(Array.from(locationSounds).join(', '), 'Sounds', 'sounds')}
                    {room && generatorConfigs.locationUniqueTrait && getAttributeContainer(room.uniqueTrait, 'Unique trait', 'uniqueTrait')}
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