import { useEffect, useRef, useState } from "react"
import Button from "../button/button";
import { setAttribute, timeout } from "../utils/utils";
import Window from "../window/window";
import Exit from "../exit/exit";

export default function Room() {
    const [roomType, setRoomType] = useState('');
    const [lightingType, setLightingType] = useState('');
    const [locationCondition, setLocationCondition] = useState('');
    const [locationTemperature, setLocationTemperature] = useState('');
    const [locationSize, setLocationSize] = useState('');
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

    useEffect(() => {
        updateRoom();
    }, [])

    return (
        <div className="flex flex-col min-h-full">
            <div className={`transition duration-${transitionDuration} overflow-hidden opacity-0 flex-1`} ref={roomContainerRef}>
                {roomType ? <p>Room type: {roomType}</p> : ''}
                {lightingType ? <p>Lighting: {lightingType}</p> : ''}
                {locationCondition ? <p>Condition: {locationCondition}</p> : ''}
                {locationTemperature ? <p>Temperature: {locationTemperature}</p> : ''}
                {locationSize ? <p>Size: {locationSize}</p> : ''}
                {locationSounds.size > 0 ? <p>Sounds: {Array.from(locationSounds).join(', ')}</p> : ''}
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