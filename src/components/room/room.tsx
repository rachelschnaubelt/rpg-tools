import { useEffect, useState } from "react"
import Button from "../button/button";
import { UNABLE_TO_SET_ATTRIBUTE_MESSAGE } from "@/pages/api/constants";

export default function Room() {
    const [roomType, setRoomType] = useState('');
    const [lightingType, setLightingType] = useState('');
    const [locationCondition, setLocationCondition] = useState('');
    const [locationTemperature, setLocationTemperature] = useState('');
    const [locationSize, setLocationSize] = useState('');

    const setAttribute = async (endpoint: string, setter: any) => {
        await fetch(endpoint)
            .then(res => {
                if(res.status !== 200) {
                    console.log(`${UNABLE_TO_SET_ATTRIBUTE_MESSAGE} ${endpoint}`);
                    // console.log(`Error: ${res.json()}`);
                    return '';
                }
                return res.json()
            })
            .then(json => {
                setter(json);
            })
            .catch(err => setter(''));

    }

    const updateRooms = async () => {
        await setAttribute('/api/attributes/random-weighted/room-types', setRoomType);
        await setAttribute('/api/attributes/random-weighted/lighting-types', setLightingType);
        await setAttribute('/api/attributes/random-weighted/location-conditions', setLocationCondition);
        await setAttribute('/api/attributes/random-weighted/location-temperature', setLocationTemperature);
        await setAttribute('/api/attributes/random-weighted/location-size', setLocationSize);
    }

    useEffect(() => {
        updateRooms();
    }, [])

    return (
        <>
            {roomType ? <p>Room type: {roomType}</p> : ''}
            {lightingType ? <p>Lighting: {lightingType}</p> : ''}
            {locationCondition ? <p>Condition: {locationCondition}</p> : ''}
            {locationTemperature ? <p>Temperature: {locationTemperature}</p> : ''}
            {locationSize ? <p>Size: {locationSize}</p> : ''}
            <Button onClick={updateRooms}>Regenerate Room</Button>
        </>
    )
}