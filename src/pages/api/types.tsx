interface Room {
    type: string, // examples: Living room, Kitchen, Gallery, Study
    lighting: string, // examples: Overhead florescents, Candlelit, Dim, Pitch-black
    condition: string, // examples: Overgrown, Abandoned, Desolate, Pristine
    size: string, // examples: Small, Average, Large, Huge
}

interface Window {
    size: string,
    style: string,
    condition: string,
    isLocked: boolean
}

interface Exit {
    size: string,
    style: string,
    condition: string,
    material: string,
    isLocked: boolean
}

interface NPC {
    name: string,
    class: string,
    level: number,
    race: string
}

interface Creature {
    size: string,
    type: string,
    condition: number,
    behavior: string
    healthPercentage: number
}

interface Item {
    type: string,
    value: number,
    condition: string
}

interface Trap {
    type: string,
    trigger: string,
    effect: string, 
    danger: string
}

interface AttributeList {
    [key: string]: number
}

interface EndpointList {
    [key: string]: AttributeList
}