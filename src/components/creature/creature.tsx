'use client'

import { useEffect, useState } from "react"
import { setAttribute } from "../utils/utils";

export default function Creature() {
    const [creatureProps, setCreatureProps] = useState<Creature>();

    const updateCreatureProps = async () => {
        setAttribute('/api/creatures/random-weighted', setCreatureProps);
    }

    useEffect(() => {
        updateCreatureProps();
    }, [])

    if (!creatureProps) {
        return '';
    }

    return (
        <div>
            {creatureProps.type ? <p>Type: {creatureProps.type}</p> : ''}
            {creatureProps.size ? <p>Size: {creatureProps.size}</p> : ''}
            {creatureProps.condition ? <p>Condition: {creatureProps.condition}</p> : ''}
            {creatureProps.behavior ? <p>Behavior: {creatureProps.behavior}</p> : ''}
            {creatureProps.healthPercentage ? <p>Health: {creatureProps.healthPercentage}%</p> : ''}
        </div>
    )
}