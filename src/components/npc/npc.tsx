'use client'

import { useEffect, useState } from "react"
import { setAttribute } from "../utils/utils";

export default function NPC() {
    const [npcProps, setNpcProps] = useState<NPC>();

    const updateNpcProps = async () => {
        setAttribute('/api/npcs/random-weighted', setNpcProps);
    }

    useEffect(() => {
        updateNpcProps();
    }, [])

    if (!npcProps) {
        return '';
    }

    return (
        <div>
            {npcProps.name ? <p>Name: {npcProps.name}</p> : ''}
            {npcProps.level ? <p>Level: {npcProps.level}</p> : ''}
            {npcProps.class ? <p>Class: {npcProps.class}</p> : ''}
            {npcProps.race ? <p>Race: {npcProps.race}</p> : ''}
        </div>
    )
}