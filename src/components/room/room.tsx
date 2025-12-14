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

export default function Room() {
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

        await setAttribute('/api/attributes/random-weighted/room-types', setRoomType);
        await setAttribute('/api/attributes/random-weighted/lighting-types', setLightingType);
        await setAttribute('/api/attributes/random-weighted/location-conditions', setLocationCondition);
        await setAttribute('/api/attributes/random-weighted/location-temperature', setLocationTemperature);
        await setAttribute('/api/attributes/random-weighted/location-size', setLocationSize);
        await setAttribute('/api/attributes/random-weighted/location-scent', setLocationScent);
        await setAttribute('/api/attributes/random-weighted/location-atmospheres', setLocationAtmosphere);
        await setAttribute('/api/attributes/random-weighted/location-unique-traits', setLocationUniqueTrait);
        setWindowCount(Math.floor(Math.random() * 4));
        setExitcount(Math.ceil(Math.random() * 3));
        setSoundsCount(Math.floor(Math.random() * 3));
        setNpcCount(Math.floor(Math.random() * 4));
        setCreatureCount(Math.floor(Math.random() * 3));
        setItemCount(Math.floor(Math.random() * 3));
        setTrapCount(Math.floor(Math.random() * 2));
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

        // await timeout(0);
        roomContainerRef.current?.classList.remove('opacity-0');
    }

    const getComponentList = (count: number, Component: any) => {
        if(count <= 0) {
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
                <div className='flex gap-4 justify-between mt-4'>
                    {getAttributeContainer(lightingType, 'Lighting')}
                    {getAttributeContainer(locationCondition, 'Condition')}
                    {getAttributeContainer(locationTemperature, 'Temperature')}
                    {getAttributeContainer(locationSize, 'Size')}
                    {getAttributeContainer(locationAtmosphere, 'Atmosphere')}
                    {getAttributeContainer(locationScent, 'Scent')}
                    {getAttributeContainer(Array.from(locationSounds).join(', '), 'Sounds')}
                    {getAttributeContainer(locationUniqueTrait, 'Unique trait')}
                </div>
                <Accordion title={getCountLabel(windowCount, 'window')}>
                    {getComponentList(windowCount, Window)}
                </Accordion>
                <Accordion title={getCountLabel(exitCount, 'exit')}>
                    {getComponentList(exitCount, Exit)}
                </Accordion>
                <Accordion title={getCountLabel(npcCount, 'NPC')}>
                    {getComponentList(npcCount, NPC)}
                </Accordion>
                <Accordion title={getCountLabel(creatureCount, 'creature')}>
                    {getComponentList(creatureCount, Creature)}
                </Accordion>
                <Accordion title={getCountLabel(itemCount, 'item')}>
                    {getComponentList(itemCount, Item)}
                </Accordion>
                <Accordion title={getCountLabel(trapCount, 'trap')}>
                    {getComponentList(trapCount, Trap)}
                </Accordion>
            </div>
            <div className="m-auto">
                <Button onClick={updateRoom}>Regenerate Room</Button>
            </div>
        </div>
    )
}