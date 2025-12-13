import { exitCondition, exitMaterial, exitSize, exitStyle, lightingTypes, locationConditions, locationScent, locationSize, locationSounds, locationTemperature, roomTypes, windowCondition, windowSize, windowStyle } from "./content"

export const ATTRIBUTE_LIST_ENDPOINTS: {[key: string]: AttributeList} = {
    'room-types': roomTypes,
    'lighting-types': lightingTypes,
    'location-conditions': locationConditions,
    'location-temperature': locationTemperature,
    'location-size': locationSize,
    'location-sounds': locationSounds,
    'window-size': windowSize,
    'window-style': windowStyle,
    'window-condition': windowCondition,
    'exit-size': exitSize,
    'exit-style': exitStyle,
    'exit-condition': exitCondition,
    'exit-material': exitMaterial,
    'location-scent': locationScent
}

export const INVALID_ENDPOINT_MESSAGE = "This endpoint is invalid. Please use a valid endpoint."
export const UNABLE_TO_SET_ATTRIBUTE_MESSAGE = "Unable to set attribute from endpoint:";
