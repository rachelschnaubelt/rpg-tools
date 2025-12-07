interface Room {
    type: string, // examples: Living room, Kitchen, Gallery, Study
    lighting: string, // examples: Overhead florescents, Candlelit, Dim, Pitch-black
    state: string, // examples: Overgrown, Abandoned, Desolate, Pristine
    size: string, // examples: Small, Average, Large, Huge
}

interface AttributeList {
    [key: string]: number
}

interface EndpointList {
    [key: string]: AttributeList
}