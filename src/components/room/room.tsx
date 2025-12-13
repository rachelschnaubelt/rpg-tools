import { useEffect, useRef, useState } from "react"
import Button from "../button/button";
import { setAttribute, timeout } from "../utils/utils";
import Window from "../window/window";
import Exit from "../exit/exit";
import styles from './room.module.scss';
import { locationScent } from "@/pages/api/content";

export default function Room() {
    const [roomType, setRoomType] = useState('');
    const [lightingType, setLightingType] = useState('');
    const [locationCondition, setLocationCondition] = useState('');
    const [locationTemperature, setLocationTemperature] = useState('');
    const [locationSize, setLocationSize] = useState('');
    const [locationScent, setLocationScent] = useState('');
    const [soundsCount, setSoundsCount] = useState(0);
    const [locationSounds, setLocationSounds] = useState<Set<string>>(new Set<string>);
    const [windowCount, setWindowCount] = useState(0);
    const [exitCount, setExitcount] = useState(0);
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
        setWindowCount(Math.floor(Math.random() * 4));
        setExitcount(Math.ceil(Math.random() * 3));
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

        // await timeout(0);
        roomContainerRef.current?.classList.remove('opacity-0');
    }

    const getWindows = () => {
        const windowArray = [];
        for (let i = 0; i < windowCount; i++) {
            windowArray.push(<Window windowNumber={i + 1} key={i} />);
        }
        return windowArray;
    }

    const getExits = () => {
        const exitArray = [];
        for (let i = 0; i < exitCount; i++) {
            exitArray.push(<Exit exitNumber={i + 1} key={i} />);
        }
        return exitArray
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
                    {getAttributeContainer(locationScent, 'Scent')}
                    {getAttributeContainer(Array.from(locationSounds).join(', '), 'Sounds')}
                </div>
                <p className="font-bold">{getCountLabel(windowCount, 'window')}</p>
                <div className="flex gap-4">
                    {getWindows()}
                </div>
                <p className="font-bold">{getCountLabel(exitCount, 'exit')}</p>
                <div className="flex gap-4">
                    {getExits()}
                </div>
            </div>
            <div className="m-auto">
                <Button onClick={updateRoom}>Regenerate Room</Button>
            </div>
        </div>
    )
}