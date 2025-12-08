import { useEffect, useState } from "react"
import Button from "../button/button";
import { setAttribute } from "../utils/utils";
import Window from "../window/window";

export default function Room() {
    const [roomType, setRoomType] = useState('');
    const [lightingType, setLightingType] = useState('');
    const [locationCondition, setLocationCondition] = useState('');
    const [locationTemperature, setLocationTemperature] = useState('');
    const [locationSize, setLocationSize] = useState('');
    const [windowCount, setWindowCount] = useState(0);

    const updateRoom = async () => {
        await setAttribute('/api/attributes/random-weighted/room-types', setRoomType);
        await setAttribute('/api/attributes/random-weighted/lighting-types', setLightingType);
        await setAttribute('/api/attributes/random-weighted/location-conditions', setLocationCondition);
        await setAttribute('/api/attributes/random-weighted/location-temperature', setLocationTemperature);
        await setAttribute('/api/attributes/random-weighted/location-size', setLocationSize);
        setWindowCount(Math.floor(Math.random()*4));
    }

    const getWindows = () => {
        const windowArray = [];
        for (let i=0; i < windowCount; i++) {
            windowArray.push(<Window windowNumber={i+1}/>)
        }
        return windowArray;
    }

    const getWindowLabel = () => {
        if(windowCount === 0) {
            return "No windows";
        }
        else if (windowCount === 1) {
            return `${windowCount} window`;
        }
        return `${windowCount} windows`;
    }

    useEffect(() => {
        updateRoom();
    }, [])

    return (
        <>
            {roomType ? <p>Room type: {roomType}</p> : ''}
            {lightingType ? <p>Lighting: {lightingType}</p> : ''}
            {locationCondition ? <p>Condition: {locationCondition}</p> : ''}
            {locationTemperature ? <p>Temperature: {locationTemperature}</p> : ''}
            {locationSize ? <p>Size: {locationSize}</p> : ''}
            <p>{getWindowLabel()}</p>
            <div className="flex gap-4">
                {getWindows()}
            </div>
            <Button onClick={updateRoom}>Regenerate Room</Button>
        </>
    )
}