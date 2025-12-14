import * as content from "./content"

export const ATTRIBUTE_LIST_ENDPOINTS: {[key: string]: AttributeList} = {
   'creature-behavior': content.creatureBehavior,
    'creature-condition': content.creatureCondition,
    'creature-size': content.creatureSize,
    'creature-type': content.creatureType,
    'exit-condition': content.exitCondition,
    'exit-material': content.exitMaterial,
    'exit-size': content.exitSize,
    'exit-style': content.exitStyle,
    'item-condition': content.itemCondition,
    'item-type': content.itemType,
    'location-atmospheres': content.locationAtmospheres,
    'location-conditions': content.locationConditions,
    'location-lighting-types': content.locationLightingTypes,
    'location-room-types': content.locationRoomTypes,
    'location-scent': content.locationScent,
    'location-size': content.locationSize,
    'location-sounds': content.locationSounds,
    'location-temperature': content.locationTemperature,
    'location-unique-traits': content.locationUniqueTraits,
    'npc-classes': content.npcClasses,
    'npc-names': content.npcNames,
    'npc-races': content.npcRaces,
    'trap-danger': content.trapDanger,
    'trap-effect': content.trapEffect,
    'trap-trigger': content.trapTrigger,
    'trap-type': content.trapType,
    'window-condition': content.windowCondition,
    'window-size': content.windowSize,
    'window-style': content.windowStyle,
}

export const INVALID_ENDPOINT_MESSAGE = "This endpoint is invalid. Please use a valid endpoint."
export const UNABLE_TO_SET_ATTRIBUTE_MESSAGE = "Unable to set attribute from endpoint:";
