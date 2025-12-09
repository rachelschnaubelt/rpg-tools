import { useEffect, useState } from "react"
import { setAttribute } from "../utils/utils";

type Props = {
    exitNumber?: number
}

export default function Exit({ exitNumber }: Props) {
    const [exitProps, setExitProps] = useState<Exit>();

    const updateExit = async () => {
        setAttribute('/api/exits/random-weighted', setExitProps);
    }

    useEffect(() => {
        updateExit();
    }, [])

    if (!exitProps) {
        return '';
    }

    return (
        <div>
            <p>Exit {exitNumber} - {exitProps.isLocked ? "Locked" : "Unlocked"}</p>
            {exitProps.size ? <p>Size: {exitProps.size}</p> : ''}
            {exitProps.style ? <p>Style: {exitProps.style}</p> : ''}
            {exitProps.material ? <p>Material: {exitProps.material}</p> : ''}
            {exitProps.condition ? <p>Condition: {exitProps.condition}</p> : ''}
        </div>
    )
}