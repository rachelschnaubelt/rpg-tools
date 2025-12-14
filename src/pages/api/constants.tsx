import { creatureBehavior, creatureCondition, creatureSize, creatureType, exitCondition, exitMaterial, exitSize, exitStyle, itemCondition, itemType, lightingTypes, locationAtmospheres, locationConditions, locationScent, locationSize, locationSounds, locationTemperature, locationUniqueTraits, npcClasses, npcNames, npcRaces, roomTypes, trapDanger, trapEffect, trapTrigger, trapType, windowCondition, windowSize, windowStyle } from "./content"

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
    'location-scent': locationScent,
    'location-atmospheres': locationAtmospheres,
    'npc-names': npcNames,
    'npc-classes': npcClasses,
    'npc-races': npcRaces,
    'creature-type': creatureType,
    'creature-size': creatureSize,
    'creature-condition': creatureCondition,
    'creature-behavior': creatureBehavior,
    'item-type': itemType,
    'item-condition': itemCondition,
    'trap-type': trapType,
    'trap-trigger': trapTrigger,
    'trap-effect': trapEffect,
    'trap-danger': trapDanger,
    'location-unique-traits': locationUniqueTraits
}

export const INVALID_ENDPOINT_MESSAGE = "This endpoint is invalid. Please use a valid endpoint."
export const UNABLE_TO_SET_ATTRIBUTE_MESSAGE = "Unable to set attribute from endpoint:";
