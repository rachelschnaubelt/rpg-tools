import { lightingTypes, locationConditions, locationSize, locationTemperature, roomTypes } from "./content"

export const ATTRIBUTE_LIST_ENDPOINTS: {[key: string]: AttributeList} = {
    'room-types': roomTypes,
    'lighting-types': lightingTypes,
    'location-conditions': locationConditions,
    'location-temperature': locationTemperature,
    'location-size': locationSize
}

export const INVALID_ENDPOINT_MESSAGE = "This endpoint is invalid. Please use a valid endpoint."
export const UNABLE_TO_SET_ATTRIBUTE_MESSAGE = "Unable to set attribute from endpoint:";
