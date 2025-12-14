import { useEffect, useState } from "react"
import { setAttribute } from "../utils/utils";

type Props = {
    itemNumber?: number
}

export default function Item({ itemNumber }: Props) {
    const [itemProps, setItemProps] = useState<Item>();

    const updateItem = async () => {
        setAttribute('/api/items/random-weighted', setItemProps);
    }

    useEffect(() => {
        updateItem();
    }, [])

    if (!itemProps) {
        return '';
    }

    return (
        <div>
            <p>Item {itemNumber}</p>
            {itemProps.type ? <p>Type: {itemProps.type}</p> : ''}
            {itemProps.condition ? <p>Condition: {itemProps.condition}</p> : ''}
            {itemProps.value ? <p>Value: {itemProps.value}</p> : ''}
        </div>
    )
}