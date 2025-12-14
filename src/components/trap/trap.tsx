import { useEffect, useState } from "react"
import { setAttribute } from "../utils/utils";

type Props = {
    itemNumber?: number
}

export default function Trap({ itemNumber }: Props) {
    const [trapProps, setTrapProps] = useState<Trap>();

    const updateTraps = async () => {
        setAttribute('/api/traps/random-weighted', setTrapProps);
    }

    useEffect(() => {
        updateTraps();
    }, [])

    if (!trapProps) {
        return '';
    }

    return (
        <div>
            <p>Trap {itemNumber}</p>
            {trapProps.type ? <p>Type: {trapProps.type}</p> : ''}
            {trapProps.trigger ? <p>Trigger: {trapProps.trigger}</p> : ''}
            {trapProps.effect ? <p>Effect: {trapProps.effect}</p> : ''}
            {trapProps.danger ? <p>Danger: {trapProps.danger}</p> : ''}
        </div>
    )
}