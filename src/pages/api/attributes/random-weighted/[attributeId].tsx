import type { NextApiRequest, NextApiResponse } from 'next'
import { getRandomElementFromWeightedList, getValidEndpoints } from '../../utils';
import { ATTRIBUTE_LIST_ENDPOINTS, INVALID_ENDPOINT_MESSAGE } from '../../constants';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { attributeId } = req.query;
    let list;

    if(typeof attributeId === 'string') {
        if(ATTRIBUTE_LIST_ENDPOINTS.hasOwnProperty(attributeId)) {
            list = ATTRIBUTE_LIST_ENDPOINTS[attributeId];
        }
    }

    if(list) {
        const selected = getRandomElementFromWeightedList(list);
        res.status(200).json(selected);
    }
    else {
        const errorJson = {
            'message': INVALID_ENDPOINT_MESSAGE,
            'validEndpoints': getValidEndpoints(ATTRIBUTE_LIST_ENDPOINTS)
        }
        res.status(404).json(errorJson);
    }
}

