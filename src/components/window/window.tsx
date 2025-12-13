import { useEffect, useState } from "react"
import { setAttribute } from "../utils/utils";

type Props = {
    itemNumber?: number,
}

export default function Window({ itemNumber }: Props) {
    const [windowProps, setWindowProps] = useState<Window>();

    const updateWindow = async () => {
        setAttribute('/api/windows/random-weighted', setWindowProps);
    }

    useEffect(() => {
        updateWindow();
    }, [])

    if (!windowProps) {
        return '';
    }

    return (
        <div>
            <p>Window {itemNumber} - {windowProps.isLocked ? "Locked" : "Unlocked"}</p>
            {windowProps.size ? <p>Size: {windowProps.size}</p> : ''}
            {windowProps.style ? <p>Style: {windowProps.style}</p> : ''}
            {windowProps.condition ? <p>Condition: {windowProps.condition}</p> : ''}
        </div>

    )
}